import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        let user = this.props.currentUser;
        if (user !== prevProps.currentUser) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "hashcode",
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidateInput = () => {
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastName",
            "address",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                alert("Missing parameter: " + arrInput[i]);
                return false;
            }
        }
        return true;
    };

    handleSaveUser = () => {
        if (this.checkValidateInput()) {
            this.props.editUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                {...this.props}
                className="modal-user-container"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Edit User
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-[15px]">
                        <div className="flex flex-col">
                            <label>Email</label>
                            <input
                                type="text"
                                className="rounded-[3px] h-[30px] border-[1px] border-gray-500 outline-none px-[10px]"
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "email")
                                }
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="rounded-[3px] h-[30px] border-[1px] border-gray-500 outline-none px-[10px]"
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "password")
                                }
                                value={this.state.password}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-[15px] mt-3">
                        <div className="flex flex-col">
                            <label>First name</label>
                            <input
                                type="text"
                                className="rounded-[3px] h-[30px] border-[1px] border-gray-500 outline-none px-[10px]"
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "firstName")
                                }
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label>Last name</label>
                            <input
                                type="text"
                                className="rounded-[3px] h-[30px] border-[1px] border-gray-500 outline-none px-[10px]"
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "lastName")
                                }
                                value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-[15px] mt-3">
                        <div className="flex flex-col">
                            <label>Address</label>
                            <input
                                type="text"
                                className="rounded-[3px] h-[30px] border-[1px] border-gray-500 outline-none px-[10px]"
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "address")
                                }
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        onClick={() => this.handleSaveUser()}
                        className="px-3 btn btn-primary"
                    >
                        Save changes
                    </button>
                    <button
                        onClick={() => this.toggle()}
                        className="px-3 btn btn-secondary"
                    >
                        Close
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
