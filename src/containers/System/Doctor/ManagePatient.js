import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import {
    getAllPatientForDoctor,
    postSendRemedy,
} from "../../../services/userService";
import emptyImg from "../../../assets/images/empty.jpg";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: "",
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},

            isShowLoading: false,
        };
    }

    async componentDidMount() {}

    getDataPatient = async () => {
        let { currentDate } = this.state;
        let { user } = this.props;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeDatePicker = async (date) => {
        this.setState({ currentDate: date?.[0] }, async () => {
            await this.getDataPatient();
        });
    };

    handleBtnConfirm = (item) => {
        let dataModal = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            date: item.date,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: dataModal,
        });
    };

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
        });
    };

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendRemedy({
            email: dataChild.email,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            imageBase64: dataChild.imageBase64,
            timeType: dataModal.timeType,
            date: dataModal.date,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            toast.success("Send remedy successfully!");
            await this.getDataPatient();
            this.closeRemedyModal();
            this.setState({
                isShowLoading: false,
            });
        } else {
            toast.error("Send remedy failed!");
            this.setState({
                isShowLoading: false,
            });
        }
    };

    render() {
        const { dataPatient, isOpenRemedyModal, dataModal, isShowLoading } =
            this.state;
        const { language } = this.props;

        return (
            <>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text="Loading..."
                >
                    <div>
                        <h1 className="mt-[20px] title uppercase">
                            QUẢN LÝ BỆNH NHÂN KHÁM BỆNH
                        </h1>
                        <div className="max-w-[1200px] mx-auto mt-[20px]">
                            <div className="grid grid-cols-2 gap-[30px]">
                                <div>
                                    <label>Chọn ngày khám</label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.currentDate?.[0]}
                                    />
                                </div>
                                <div className="col-start-1 col-end-3">
                                    <table className="mb-3">
                                        <thead>
                                            <tr className="bg-[#F1F1F1]">
                                                <th>STT</th>
                                                <th>Thời gian</th>
                                                <th>Tên</th>
                                                <th>Địa chỉ</th>
                                                <th>Giới tính</th>
                                                <th>SĐT</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataPatient.length > 0 ? (
                                                dataPatient.map(
                                                    (item, index) => {
                                                        let gender =
                                                            language ===
                                                            LANGUAGES.VI
                                                                ? item
                                                                      .patientData
                                                                      .genderData
                                                                      .valueVi
                                                                : item
                                                                      .patientData
                                                                      .genderData
                                                                      .valueEn;

                                                        let timeType =
                                                            language ===
                                                            LANGUAGES.VI
                                                                ? item
                                                                      .timeTypeDataPatient
                                                                      .valueVi
                                                                : item
                                                                      .timeTypeDataPatient
                                                                      .valueEn;

                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    {timeType}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            .patientData
                                                                            .firstName
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            .patientData
                                                                            .address
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {gender}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            .patientData
                                                                            .phoneNumber
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        onClick={() =>
                                                                            this.handleBtnConfirm(
                                                                                item
                                                                            )
                                                                        }
                                                                        className="bg-green-400 px-[6px] py-[4px] rounded-[4px] ml-[10px]"
                                                                    >
                                                                        Xác nhận
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <tr className="border-[1px] hover:bg-transparent">
                                                    <td colSpan={7}>
                                                        <img
                                                            src={emptyImg}
                                                            className="h-[120px] mx-auto"
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
