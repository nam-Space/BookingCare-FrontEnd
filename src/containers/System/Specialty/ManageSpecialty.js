import React, { Component } from "react";
import { connect } from "react-redux";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import TableManageSpecialty from "./TableManageSpecialty";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            imageBase64: "",
            isOpen: false,
            contentMarkdown: "",
            contentHTML: "",
            action: CRUD_ACTIONS.CREATE,
            allSpecialty: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({
                allSpecialty: this.props.allSpecialty,
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

    handleSaveSpecialty = async () => {
        const { id, name, imageBase64, contentMarkdown, contentHTML, action } =
            this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            await this.props.createNewSpecialty({
                name,
                imageBase64,
                contentMarkdown,
                contentHTML,
            });
            await this.props.fetchAllSpecialty();
            this.setState({
                name: "",
                imageBase64: "",
                contentMarkdown: "",
                contentHTML: "",
                isOpen: false,
            });
        } else {
            await this.props.updateSpecialty({
                id,
                name,
                imageBase64,
                contentMarkdown,
                contentHTML,
            });
            await this.props.fetchAllSpecialty();
            this.setState({
                id: "",
                name: "",
                imageBase64: "",
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
            contentMarkdown: item.contentMarkdown,
            contentHTML: item.contentHTML,
            action: CRUD_ACTIONS.EDIT,
        });
    };

    render() {
        const { isOpen, imageBase64, action } = this.state;

        return (
            <div>
                <div className="font-semibold title text-center mb-[20px]">
                    <FormattedMessage id="admin.manage-specialty.title" />
                </div>
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-2 gap-[20px]">
                        <div>
                            <label>
                                <FormattedMessage id="admin.manage-specialty.name" />
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
                                <FormattedMessage id="admin.manage-specialty.image" />
                            </label>
                            <div>
                                <label
                                    className="h-[33px] bg-slate-400 px-[8px] rounded-[4px]"
                                    htmlFor="preview-img-specialty"
                                >
                                    <div className="h-full flex items-center">
                                        <span className="mr-2">
                                            <FormattedMessage id="admin.manage-specialty.upload" />
                                        </span>
                                        <i className="fas fa-upload"></i>
                                    </div>
                                </label>
                                <input
                                    onChange={this.handleOnChangeImage}
                                    id="preview-img-specialty"
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
                        onClick={this.handleSaveSpecialty}
                    >
                        {action === CRUD_ACTIONS.CREATE ? (
                            <FormattedMessage id="admin.manage-specialty.button-create" />
                        ) : (
                            <FormattedMessage id="admin.manage-specialty.button-update" />
                        )}
                    </button>
                    <TableManageSpecialty
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
        allSpecialty: state.admin.allSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
        createNewSpecialty: (data) =>
            dispatch(actions.createSpecialtyStart(data)),
        updateSpecialty: (data) => dispatch(actions.updateSpecialtyStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
