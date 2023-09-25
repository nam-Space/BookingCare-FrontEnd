import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

class TableManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSpecialty: [],
        };
    }

    async componentDidMount() {
        await this.props.fetchAllSpecialty();

        this.props?.parent.setState({
            isLoading: false,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({
                allSpecialty: this.props.allSpecialty,
            });
        }
    }

    handleEditSpecialty = (item) => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        this.props.handleEditFromParent(item);
    };

    handleDeleteSpecialty = async (item) => {
        this.props?.parent.setState({
            isLoading: true,
        });

        await this.props.deleteSpecialty(item.id);
        await this.props.fetchAllSpecialty();

        this.props?.parent.setState({
            isLoading: false,
        });
    };

    render() {
        let { allSpecialty } = this.state;
        return (
            <table className="mb-3">
                <thead>
                    <tr className="bg-[#04aa6d] text-white">
                        <th>
                            <FormattedMessage id="admin.manage-specialty.name" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-specialty.image" />
                        </th>
                        <th>
                            <FormattedMessage id="admin.manage-specialty.action" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allSpecialty
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
                                    <td>
                                        <button
                                            className="h-[30px] w-[30px] border-none outline-none bg-transparent text-orange-400 hover:text-orange-400"
                                            onClick={() =>
                                                this.handleEditSpecialty(item)
                                            }
                                        >
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className="w-[50px] border-none outline-none bg-transparent text-[rgb(235,15,15)] hover:text-[rgb(235,15,15)]"
                                            onClick={() =>
                                                this.handleDeleteSpecialty(item)
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
        deleteSpecialty: (id) => dispatch(actions.deleteSpecialtyStart(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableManageSpecialty);
