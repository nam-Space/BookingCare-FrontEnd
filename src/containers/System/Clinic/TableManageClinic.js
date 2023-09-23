import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class TableManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allClinic: [],
        };
    }

    async componentDidMount() {
        this.props.fetchAllClinic();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinic !== this.props.allClinic) {
            this.setState({
                allClinic: this.props.allClinic,
            });
        }
    }

    handleEditClinic = (item) => {
        const mainContainer = document.querySelector(".main-container");
        mainContainer.scrollIntoView({ behavior: "smooth" });
        this.props.handleEditFromParent(item);
    };

    handleDeleteClinic = async (item) => {
        await this.props.deleteClinic(item.id);
        await this.props.fetchAllClinic();
    };

    render() {
        let { allClinic } = this.state;
        return (
            <table className="mb-3">
                <thead className="bg-[#04aa6d] text-white">
                    <tr>
                        <th>
                            <FormattedMessage id="admin.manage-clinic.name" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-clinic.address" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-clinic.image-avatar" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-clinic.image-clinic" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-clinic.action" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allClinic
                        .sort(
                            (a, b) =>
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                        )
                        .map((item, index) => {
                            let avatarBase64 = "";
                            let backgroundImageBase64 = "";
                            if (item.avatar) {
                                avatarBase64 = new Buffer(
                                    item.avatar,
                                    "base64"
                                ).toString("binary");
                            }
                            if (item.backgroundImage) {
                                backgroundImageBase64 = new Buffer(
                                    item.backgroundImage,
                                    "base64"
                                ).toString("binary");
                            }

                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <img
                                            src={avatarBase64}
                                            alt={item.name}
                                            className="w-[300px] object-contain"
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src={backgroundImageBase64}
                                            alt={item.name}
                                            className="w-[514px] h-[290px] object-cover"
                                        />
                                    </td>
                                    <td>
                                        <div className="flex">
                                            <button
                                                className="h-[30px] w-[30px] border-none outline-none bg-transparent text-orange-400 hover:text-orange-400"
                                                onClick={() =>
                                                    this.handleEditClinic(item)
                                                }
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="w-[50px] border-none outline-none bg-transparent text-[rgb(235,15,15)] hover:text-[rgb(235,15,15)]"
                                                onClick={() =>
                                                    this.handleDeleteClinic(
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
        allClinic: state.admin.allClinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
        deleteClinic: (id) => dispatch(actions.deleteClinicStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
