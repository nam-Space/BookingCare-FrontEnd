import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import localization from "moment/locale/vi";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthDay: "",
            doctorId: "",
            selectedGender: { label: "", value: "" },
            genders: [],
            timeType: "",
            isShowLoading: false,
        };
    }

    buildDataInputSelect = (inputData, type) => {
        let res = [];
        if (inputData && inputData.length > 0) {
            if (type === "USERS") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    obj.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    obj.value = item.id;
                    res.push(obj);
                });
            } else if (type === "PRICE") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    obj.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    obj.value = item.keyMap;
                    res.push(obj);
                });
            } else {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    obj.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    obj.value = item.keyMap;
                    res.push(obj);
                });
            }
        }
        return res;
    };

    async componentDidMount() {
        this.props.getGenderStart();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.language !== this.props.language ||
            prevProps.gender !== this.props.gender ||
            prevProps.doctorId !== this.props.doctorId ||
            prevProps.dataTime !== this.props.dataTime
        ) {
            this.setState({
                genders: this.buildDataInputSelect(this.props.gender, "GENDER"),
                doctorId: this.props.doctorId,
                timeType: this.props.dataTime.timeType,
            });
        }
    }

    handleOnChangeInput = (e, id) => {
        let newState = { ...this.state };
        newState[id] = e.target.value;
        this.setState({
            ...newState,
        });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0],
        });
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption,
        });
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeBooking = (dataTime) => {
        let time =
            this.props.language === LANGUAGES.VI
                ? dataTime.timeTypeData.valueVi
                : dataTime.timeTypeData.valueEn;

        let date =
            this.props.language === LANGUAGES.VI
                ? this.capitalizeFirstLetter(
                      moment
                          .unix(+dataTime.date / 1000)
                          .format("dddd - DD/MM/YYYY")
                  )
                : this.capitalizeFirstLetter(
                      moment
                          .unix(+dataTime.date / 1000)
                          .locale("en")
                          .format("ddd - MM/DD/YYYY")
                  );

        return `${time} - ${date}`;
    };

    buildDoctorName = (doctorData) => {
        let name =
            this.props.language === LANGUAGES.VI
                ? `${doctorData.lastName} - ${doctorData.firstName}`
                : `${doctorData.firstName} - ${doctorData.lastName}`;
        return name;
    };

    handleConfirmBooking = async () => {
        const birthday = new Date(this.state.birthDay).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        this.setState({
            isShowLoading: true,
        });

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: birthday,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: this.buildDoctorName(this.props.dataTime.doctorData),
        });
        if (res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success("Booking a new appointment successfully");
            this.props.closeBookingSchedule();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error(res.errMessage);
        }
    };

    render() {
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text="Loading..."
            >
                <Modal
                    isOpen={this.props.isOpenModal}
                    size="lg"
                    centered={true}
                    toggle={this.props.closeBookingSchedule}
                >
                    <div>
                        <div className="flex justify-between px-[10px] py-[10px] font-bold border-b-[1px] border-[#ccc]">
                            <p>
                                <FormattedMessage id="patient.booking-modal.title" />
                            </p>
                            <span className="px-[6px] cursor-pointer">
                                <i
                                    onClick={this.props.closeBookingSchedule}
                                    className="fas fa-times"
                                ></i>
                            </span>
                        </div>
                        <div className="px-[10px] pb-[30px]">
                            <ProfileDoctor
                                doctorId={this.props.doctorId}
                                isShowDescDoctor={false}
                                dataTime={this.props.dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                                titleActive={false}
                            />
                            <div className="mt-[14px] grid grid-cols-2 gap-[16px]">
                                <div>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.full-name" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "fullName"
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phone-number" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "phoneNumber"
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(e, "email")
                                        }
                                    />
                                </div>
                                <div>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "address"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col-start-1 col-end-3">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "reason"
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.birthday" />
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthDay}
                                    />
                                </div>
                                <div>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                        className=""
                                        placeholder={
                                            <FormattedMessage id="patient.booking-modal.gender" />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-[10px] py-[10px] flex justify-end border-t-[1px] border-[#ccc]">
                            <button
                                onClick={this.handleConfirmBooking}
                                className="btn btn-primary px-3 mr-[10px]"
                            >
                                <FormattedMessage id="patient.booking-modal.btn-confirm" />
                            </button>
                            <button
                                onClick={this.props.closeBookingSchedule}
                                className="btn btn-secondary px-3"
                            >
                                <FormattedMessage id="patient.booking-modal.btn-cancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        gender: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
