import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import TableManageHandbook from "./TableManageHandbook";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt();

class ManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            imageBase64: "",
            caption: "",
            isOpen: false,
            contentMarkdown: "",
            contentHTML: "",
            action: CRUD_ACTIONS.CREATE,
            allHandbook: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllHandbook();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allHandbook !== this.props.allHandbook) {
            this.setState({
                allHandbook: this.props.allHandbook,
            });
        }
    }

    handleOnChangeText = (e, id) => {
        let newState = { ...this.state };
        newState[id] = e.target.value;
        this.setState({
            ...newState,
        });
    };

    handleOnChangeImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (this.state.imageBase64) {
            this.setState({
                isOpen: true,
            });
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveHandbook = async () => {
        const {
            id,
            name,
            imageBase64,
            caption,
            contentMarkdown,
            contentHTML,
            action,
        } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            await this.props.createNewHandbook({
                name,
                image: imageBase64,
                caption,
                contentMarkdown,
                contentHTML,
            });
            await this.props.fetchAllHandbook();
            this.setState({
                name: "",
                imageBase64: "",
                caption: "",
                contentMarkdown: "",
                contentHTML: "",
                isOpen: false,
            });
        } else {
            await this.props.updateHandbook({
                id,
                name,
                image: imageBase64,
                caption,
                contentMarkdown,
                contentHTML,
            });
            await this.props.fetchAllHandbook();
            this.setState({
                id: "",
                name: "",
                imageBase64: "",
                caption: "",
                contentMarkdown: "",
                contentHTML: "",
                isOpen: false,
                action: CRUD_ACTIONS.CREATE,
            });
        }
    };

    handleEditFromParent = (item) => {
        let imageBase64 = "";
        if (item.image) {
            imageBase64 = new Buffer(item.image, "base64").toString("binary");
        }
        this.setState({
            id: item.id,
            name: item.name,
            imageBase64: imageBase64,
            caption: item.caption,
            contentMarkdown: item.contentMarkdown,
            contentHTML: item.contentHTML,
            action: CRUD_ACTIONS.EDIT,
        });
    };

    render() {
        const { imageBase64, caption, isOpen, action } = this.state;

        return (
            <div>
                <div className="font-semibold title text-center mb-[20px]">
                    <FormattedMessage id="admin.manage-handbook.title" />
                </div>
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-2 gap-[20px]">
                        <div>
                            <label>
                                <FormattedMessage id="admin.manage-handbook.name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    this.handleOnChangeText(e, "name")
                                }
                                value={this.state.name}
                            />
                        </div>
                        <div>
                            <label>
                                <FormattedMessage id="admin.manage-handbook.caption" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    this.handleOnChangeText(e, "caption")
                                }
                                value={this.state.caption}
                            />
                        </div>
                        <div>
                            <label>
                                <FormattedMessage id="admin.manage-handbook.image" />
                            </label>
                            <div>
                                <label
                                    className="h-[33px] bg-slate-400 px-[8px] rounded-[4px]"
                                    htmlFor="preview-img-handbook"
                                >
                                    <div className="h-full flex items-center">
                                        <span className="mr-2">
                                            <FormattedMessage id="admin.manage-handbook.upload" />
                                        </span>
                                        <i className="fas fa-upload"></i>
                                    </div>
                                </label>
                                <input
                                    onChange={this.handleOnChangeImage}
                                    id="preview-img-handbook"
                                    type="file"
                                    hidden
                                    value={this.state.getBase64}
                                />
                            </div>
                            <div
                                className={`${
                                    imageBase64 ? "cursor-pointer" : ""
                                } mt-[4px] border-dashed border-gray-400 border-[3px] h-[80px] bg-[url(${imageBase64})] bg-contain bg-no-repeat bg-center`}
                                onClick={this.openPreviewImage}
                            ></div>
                        </div>
                        <div className="col-start-1 col-end-3">
                            <MdEditor
                                id="markdown-container"
                                className="markdown-container"
                                style={{
                                    height: "500px",
                                    marginBottom: "16px",
                                }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                            {isOpen && (
                                <Lightbox
                                    mainSrc={imageBase64}
                                    onCloseRequest={() =>
                                        this.setState({ isOpen: false })
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <button
                        className={`btn ${
                            action === CRUD_ACTIONS.CREATE
                                ? "btn-primary"
                                : "btn-warning"
                        } px-3 mb-5`}
                        onClick={this.handleSaveHandbook}
                    >
                        {action === CRUD_ACTIONS.CREATE ? (
                            <FormattedMessage id="admin.manage-handbook.button-create" />
                        ) : (
                            <FormattedMessage id="admin.manage-handbook.button-update" />
                        )}
                    </button>
                    <TableManageHandbook
                        handleEditFromParent={this.handleEditFromParent}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allHandbook: state.admin.allHandbook,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllHandbook: () => dispatch(actions.fetchAllHandbookStart()),
        createNewHandbook: (data) =>
            dispatch(actions.createHandbookStart(data)),
        updateHandbook: (data) => dispatch(actions.updateHandbookStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
