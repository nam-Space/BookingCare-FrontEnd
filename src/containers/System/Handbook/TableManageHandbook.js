import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class TableManageHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allHandbook: [],
        };
    }

    async componentDidMount() {
        await this.props.fetchAllHandbook();
        this.props?.parent.setState({
            isLoading: false,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allHandbook !== this.props.allHandbook) {
            this.setState({
                allHandbook: this.props.allHandbook,
            });
        }
    }

    handleEditHandbook = (item) => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        this.props.handleEditFromParent(item);
    };

    handleDeleteHandbook = async (item) => {
        this.props?.parent.setState({
            isLoading: true,
        });

        await this.props.deleteHandbook(item.id);
        await this.props.fetchAllHandbook();

        this.props?.parent.setState({
            isLoading: false,
        });
    };

    render() {
        let { allHandbook } = this.state;
        return (
            <table className="mb-3">
                <thead>
                    <tr className="bg-[#04aa6d] text-white">
                        <th>
                            <FormattedMessage id="admin.manage-handbook.name" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-handbook.image" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-handbook.caption" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-handbook.action" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allHandbook
                        .sort(
                            (a, b) =>
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                        )
                        .map((item, index) => {
                            let imageBase64 = "";
                            if (item.image) {
                                imageBase64 = new Buffer(
                                    item.image,
                                    "base64"
                                ).toString("binary");
                            }

                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <img
                                            src={imageBase64}
                                            alt={item.name}
                                            className="w-[514px] h-[290px] object-cover"
                                        />
                                    </td>
                                    <td>{item.caption}</td>
                                    <td>
                                        <div className="flex">
                                            <button
                                                className="h-[30px] w-[30px] border-none outline-none bg-transparent text-orange-400 hover:text-orange-400"
                                                onClick={() =>
                                                    this.handleEditHandbook(
                                                        item
                                                    )
                                                }
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="w-[50px] border-none outline-none bg-transparent text-[rgb(235,15,15)] hover:text-[rgb(235,15,15)]"
                                                onClick={() =>
                                                    this.handleDeleteHandbook(
                                                        item
                                                    )
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
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
        deleteHandbook: (id) => dispatch(actions.deleteHandbookStart(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableManageHandbook);
