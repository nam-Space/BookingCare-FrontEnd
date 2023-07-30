import React, { Component } from "react";
import { connect } from "react-redux";
import "../UserManage.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";

const mdParser = new MarkdownIt();

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        console.log(this.state);
    };

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value,
        });
    };

    render() {
        return (
            <div className="max-w-[1440px] mx-auto">
                <div className="py-[16px] text-center text-[20px] font-semibold">
                    Tạo thêm thông tin bác sỹ
                </div>
                <div className="mb-3 flex gap-[20px]">
                    <div className="basis-1/3">
                        <label>Chọn bác sỹ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                            className=""
                        />
                    </div>
                    <div className="basis-2/3">
                        <label htmlFor="doctor-input">
                            Thông tin giới thiệu
                        </label>
                        <textarea
                            id="doctor-input"
                            className="form-control"
                            rows={4}
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <MdEditor
                    style={{ height: "500px", marginBottom: "16px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                />
                <button
                    className="btn btn-primary px-3 mb-3"
                    onClick={this.handleSaveContentMarkdown}
                >
                    Lưu thông tin
                </button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
