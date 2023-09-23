import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllUsers,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        };
    }

    async componentDidMount() {
        this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                });
                emitter.emit("EVENT_CLEAR_MODAL_DATA");
            } else alert(response.errMessage);
        } catch (error) {
            console.log(error);
        }
    };

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleEditUser = async (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        });
    };

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                await this.getAllUsersFromReact();
            } else {
                alert(res.errCode);
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;

        return (
            <div className="max-w-[1440px] mx-auto">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleUserEditModal}
                    currentUser={this.state.userEdit}
                    editUser={this.doEditUser}
                />
                <div className="title text-center">Manage users with Nam</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table>
                        <thead>
                            <tr className="bg-[#04aa6d] text-white">
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            className="h-[30px] w-[30px] border-none outline-none bg-transparent text-orange-400 hover:text-orange-400"
                                            onClick={() =>
                                                this.handleEditUser(item)
                                            }
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className="w-[50px] border-none outline-none bg-transparent text-[rgb(235,15,15)] hover:text-[rgb(235,15,15)]"
                                            onClick={() =>
                                                this.handleDeleteUser(item)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
