import React, { Component } from "react";
import { connect } from "react-redux";
import "../UserManage.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

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
                <table className="mb-5">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userRedux
                            .sort(
                                (a, b) =>
                                    Date.parse(b.createdAt) -
                                    Date.parse(a.createdAt)
                            )
                            .map((item, index) => (
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
                <MdEditor
                    style={{ height: "500px", marginBottom: "30px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                />
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
