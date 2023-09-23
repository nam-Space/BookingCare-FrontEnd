import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
    getAllCodeService,
    getTopDoctorHomeService,
} from "../../../services/userService";
import {
    CRUD_ACTIONS,
    CommonUtils,
    LANGUAGES,
    USER_ROLE,
} from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: "",
            isOpen: false,

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",
            userEditId: "",

            action: CRUD_ACTIONS.CREATE,
        };
    }
    genderArr;
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux[0]?.keyMap,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
                position: this.props.positionRedux[0]?.keyMap,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
                role: this.props.roleRedux[0]?.keyMap,
            });
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                avatar: "",
                gender:
                    this.props.genderRedux && this.props.genderRedux.length > 0
                        ? this.props.genderRedux[0].keyMap
                        : "",
                role:
                    this.props.roleRedux && this.props.roleRedux.length > 0
                        ? this.props.roleRedux[0].keyMap
                        : "",
                position:
                    this.props.positionRedux &&
                    this.props.positionRedux.length > 0
                        ? this.props.positionRedux[0].keyMap
                        : "",
                action: CRUD_ACTIONS.CREATE,
                previewImg: "",
            });
        }
    }

    handleOnChangeImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImg: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (this.state.previewImg) {
            this.setState({
                isOpen: true,
            });
        }
    };

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let arrCheck = [
            "email",
            "password",
            "firstName",
            "lastName",
            "phoneNumber",
            "address",
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                alert(`The input is required: ${arrCheck[i]}`);
                return false;
            }
        }
        return true;
    };

    handleSaveUser = () => {
        if (this.checkValidateInput()) {
            if (this.state.action === CRUD_ACTIONS.CREATE) {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar,
                });
            } else {
                this.props.editUserRedux({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar,
                });
            }
        }
    };

    handleEditFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = new Buffer(user.image, "base64").toString("binary");
        }

        this.setState({
            email: user.email,
            password: "hashcode",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: "",
            previewImg: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };

    render() {
        let language = this.props.language;
        let {
            genderArr,
            positionArr,
            roleArr,
            previewImg,
            isOpen,
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            position,
            role,
            avatar,
            action,
        } = this.state;

        return (
            <div id="user-container">
                <div className="title">
                    {" "}
                    <FormattedMessage id="manage-user.title" />
                </div>
                <div className="max-w-[1440px] mx-auto">
                    <form>
                        <h1 className="text-[26px] font-semibold">
                            {action === CRUD_ACTIONS.CREATE ? (
                                <FormattedMessage id="manage-user.add-user" />
                            ) : (
                                <FormattedMessage id="manage-user.edit-user" />
                            )}
                        </h1>
                        <div className="row g-3 mt-3">
                            <div className="form-group col-md-3">
                                <label htmlFor="email">
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "email")
                                    }
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                    }
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="password">
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "password")
                                    }
                                    disabled={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                    }
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="firstName">
                                    <FormattedMessage id="manage-user.first-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "firstName")
                                    }
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="lastName">
                                    <FormattedMessage id="manage-user.last-name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "lastName")
                                    }
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="phoneNumber">
                                    <FormattedMessage id="manage-user.phone-number" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(
                                            e,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="form-group col-md-9">
                                <label htmlFor="address">
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "address")
                                    }
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="gender">
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    value={gender}
                                    id="gender"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "gender")
                                    }
                                >
                                    {genderArr.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="position">
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    value={position}
                                    id="position"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "position")
                                    }
                                >
                                    {positionArr.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="roleId">
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    value={role}
                                    id="roleId"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "role")
                                    }
                                >
                                    {roleArr.map((item, index) => (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI
                                                ? item.valueVi
                                                : item.valueEn}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="image">
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div>
                                    <label
                                        className="h-[33px] bg-slate-400 px-[8px] rounded-[4px]"
                                        htmlFor="previewImg"
                                    >
                                        <div className="h-full flex items-center">
                                            <span className="mr-2">
                                                <FormattedMessage id="manage-user.download" />
                                            </span>
                                            <i className="fas fa-upload"></i>
                                        </div>
                                    </label>
                                    <input
                                        onChange={this.handleOnChangeImage}
                                        id="previewImg"
                                        type="file"
                                        hidden
                                    />
                                </div>
                                <div
                                    className={`${
                                        previewImg ? "cursor-pointer" : ""
                                    } mt-[4px] border-dashed border-gray-400 border-[3px] h-[80px] bg-[url(${previewImg})] bg-contain bg-no-repeat bg-center`}
                                    onClick={this.openPreviewImage}
                                ></div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={`btn ${
                                action === CRUD_ACTIONS.EDIT
                                    ? "btn-warning"
                                    : "btn-primary"
                            } px-3 mt-3`}
                            onClick={this.handleSaveUser}
                        >
                            {action === CRUD_ACTIONS.EDIT ? (
                                <FormattedMessage id="manage-user.edit" />
                            ) : (
                                <FormattedMessage id="manage-user.save" />
                            )}
                        </button>
                    </form>
                </div>
                <div className="max-w-[1440px] mx-auto mt-5">
                    <TableManageUser
                        handleEditFromParentKey={this.handleEditFromParent}
                        action={this.state.action}
                    />
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
