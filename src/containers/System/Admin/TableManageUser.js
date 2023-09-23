import React, { Component } from "react";
import { connect } from "react-redux";
import "../UserManage.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import defaultImg from "../../../assets/images/imgDefault.png";

const mdParser = new MarkdownIt();

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        };
    }

    async componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    };

    handleEditUser = (user) => {
        const mainContainer = document.querySelector(".main-container");
        mainContainer.scrollIntoView({ behavior: "smooth" });
        this.props.handleEditFromParentKey(user);
    };

    handleEditorChange({ html, text }) {
        // console.log(text);
        // console.log(html);
    }

    render() {
        let { userRedux } = this.state;

        return (
            <>
                {/* <MdEditor
                    style={{ height: "500px", marginBottom: "30px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                /> */}
                <table className="mb-5">
                    <thead>
                        <tr className="bg-[#04aa6d] text-white">
                            <th>
                                <FormattedMessage id="manage-user.image" />
                            </th>
                            <th>
                                <FormattedMessage id="manage-user.email" />
                            </th>
                            <th>
                                <FormattedMessage id="manage-user.first-name" />
                            </th>
                            <th>
                                <FormattedMessage id="manage-user.last-name" />
                            </th>
                            <th>
                                <FormattedMessage id="manage-user.address" />
                            </th>
                            <th>
                                <FormattedMessage id="manage-user.action" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRedux
                            .sort(
                                (a, b) =>
                                    Date.parse(b.createdAt) -
                                    Date.parse(a.createdAt)
                            )
                            .map((item, index) => {
                                let avatarBase64 = "";
                                if (item.image) {
                                    avatarBase64 = new Buffer(
                                        item.image,
                                        "base64"
                                    ).toString("binary");
                                }

                                return (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={avatarBase64 || defaultImg}
                                                alt={`${item.firstName} ${item.lastName}`}
                                                className="w-[80px] h-[80px] rounded-[50%] object-cover"
                                            />
                                        </td>
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
                                );
                            })}
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
