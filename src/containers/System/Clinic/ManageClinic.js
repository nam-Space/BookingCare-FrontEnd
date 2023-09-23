import React, { Component } from "react";
import { connect } from "react-redux";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import TableManageClinic from "./TableManageClinic";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            address: "",
            avatar: "",
            backgroundImage: "",
            isOpenAvatar: false,
            isOpenBackground: false,
            contentMarkdown: "",
            contentHTML: "",
            action: CRUD_ACTIONS.CREATE,
            allClinic: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllClinic();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinic !== this.props.allClinic) {
            this.setState({
                allClinic: this.props.allClinic,
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

    handleOnChangeImage = async (e, name) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            if (name === "avatar") {
                this.setState({
                    avatar: base64,
                });
            } else if (name === "background") {
                this.setState({
                    backgroundImage: base64,
                });
            }
        }
    };

    openPreviewImage = (name) => {
        if (name === "avatar") {
            if (this.state.avatar) {
                this.setState({
                    isOpenAvatar: true,
                });
            }
        } else if (name === "background") {
            if (this.state.backgroundImage) {
                this.setState({
                    isOpenBackground: true,
                });
            }
        }
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveClinic = async () => {
        const {
            id,
            name,
            address,
            avatar,
            backgroundImage,
            contentMarkdown,
            contentHTML,
            action,
        } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            await this.props.createNewClinic({
                name,
                address,
                avatar,
                backgroundImage,
                contentMarkdown,
                contentHTML,
            });
            await this.props.fetchAllClinic();
            this.setState({
                name: "",
                address: "",
                avatar: "",
                backgroundImage: "",
                contentMarkdown: "",
                contentHTML: "",
                isOpenAvatar: false,
            });
        } else {
            await this.props.updateClinic({
                id,
                name,
                address,
                avatar,
                backgroundImage,
                contentMarkdown,
                contentHTML,
            });
            await this.props.fetchAllClinic();
            this.setState({
                id: "",
                name: "",
                address: "",
                avatar: "",
                backgroundImage: "",
                contentMarkdown: "",
                contentHTML: "",
                isOpenAvatar: false,
                action: CRUD_ACTIONS.CREATE,
            });
        }
    };

    handleEditFromParent = (item) => {
        let avatar = "";
        let backgroundImage = "";
        if (item.avatar) {
            avatar = new Buffer(item.avatar, "base64").toString("binary");
        }
        if (item.backgroundImage) {
            backgroundImage = new Buffer(
                item.backgroundImage,
                "base64"
            ).toString("binary");
        }
        this.setState({
            id: item.id,
            name: item.name,
            address: item.address,
            avatar: avatar,
            backgroundImage: backgroundImage,
            contentMarkdown: item.contentMarkdown,
            contentHTML: item.contentHTML,
            action: CRUD_ACTIONS.EDIT,
        });
    };

    render() {
        const {
            isOpenAvatar,
            isOpenBackground,
            avatar,
            backgroundImage,
            action,
        } = this.state;

        return (
            <div>
                <div className="font-semibold title text-center mb-[20px]">
                    <FormattedMessage id="admin.manage-clinic.title" />
                </div>
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-2 gap-[20px]">
                        <div>
                            <label>
                                <FormattedMessage id="admin.manage-clinic.name" />
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
                                <FormattedMessage id="admin.manage-clinic.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                    this.handleOnChangeText(e, "address")
                                }
                                value={this.state.address}
                            />
                        </div>
                        <div>
                            <label>
                                <FormattedMessage id="admin.manage-clinic.image-avatar" />
                            </label>
                            <div>
                                <label
                                    className="h-[33px] bg-slate-400 px-[8px] rounded-[4px]"
                                    htmlFor="preview-avatar-clinic"
                                >
                                    <div className="h-full flex items-center">
                                        <span className="mr-2">
                                            <FormattedMessage id="admin.manage-clinic.upload" />
                                        </span>
                                        <i className="fas fa-upload"></i>
                                    </div>
                                </label>
                                <input
                                    onChange={(e) =>
                                        this.handleOnChangeImage(e, "avatar")
                                    }
                                    id="preview-avatar-clinic"
                                    type="file"
                                    hidden
                                />
                            </div>
                            <div
                                className={`${
                                    avatar ? "cursor-pointer" : ""
                                } mt-[4px] border-dashed border-gray-400 border-[3px] h-[80px] bg-[url(${avatar})] bg-contain bg-no-repeat bg-center`}
                                onClick={() => this.openPreviewImage("avatar")}
                            ></div>
                        </div>
                        <div>
                            <label>
                                <FormattedMessage id="admin.manage-clinic.image-clinic" />
                            </label>
                            <div>
                                <label
                                    className="h-[33px] bg-slate-400 px-[8px] rounded-[4px]"
                                    htmlFor="preview-background-clinic"
                                >
                                    <div className="h-full flex items-center">
                                        <span className="mr-2">
                                            <FormattedMessage id="admin.manage-clinic.upload" />
                                        </span>
                                        <i className="fas fa-upload"></i>
                                    </div>
                                </label>
                                <input
                                    onChange={(e) =>
                                        this.handleOnChangeImage(
                                            e,
                                            "background"
                                        )
                                    }
                                    id="preview-background-clinic"
                                    type="file"
                                    hidden
                                />
                            </div>
                            <div
                                className={`${
                                    backgroundImage ? "cursor-pointer" : ""
                                } mt-[4px] border-dashed border-gray-400 border-[3px] h-[80px] bg-[url(${backgroundImage})] bg-contain bg-no-repeat bg-center`}
                                onClick={() =>
                                    this.openPreviewImage("background")
                                }
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
                            {isOpenAvatar && (
                                <Lightbox
                                    mainSrc={avatar}
                                    onCloseRequest={() =>
                                        this.setState({ isOpenAvatar: false })
                                    }
                                />
                            )}
                            {isOpenBackground && (
                                <Lightbox
                                    mainSrc={backgroundImage}
                                    onCloseRequest={() =>
                                        this.setState({
                                            isOpenBackground: false,
                                        })
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
                        onClick={this.handleSaveClinic}
                    >
                        {action === CRUD_ACTIONS.CREATE ? (
                            <FormattedMessage id="admin.manage-clinic.button-create" />
                        ) : (
                            <FormattedMessage id="admin.manage-clinic.button-update" />
                        )}
                    </button>
                    <TableManageClinic
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
        fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
        createNewClinic: (data) => dispatch(actions.createClinicStart(data)),
        updateClinic: (data) => dispatch(actions.updateClinicStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
