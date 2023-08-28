import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
            selectedIndex: 0,
        };
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    obj.label = `Hôm nay - ${this.capitalizeFirstLetter(
                        moment(new Date()).format("DD/MM")
                    )}`;
                } else {
                    obj.label = this.capitalizeFirstLetter(
                        moment(new Date()).add(i, "days").format("dddd - DD/MM")
                    );
                }
            } else {
                if (i === 0) {
                    obj.label = `Today -
                    ${moment(new Date()).locale("en").format("DD/MM")}`;
                } else {
                    obj.label = moment(new Date())
                        .add(i, "days")
                        .locale("en")
                        .format("ddd - DD/MM");
                }
            }

            obj.value = moment(new Date())
                .add(i, "days")
                .startOf("day")
                .valueOf();

            arrDays.push(obj);
        }
        return arrDays;
    };

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);

        if (allDays.length > 0) {
            let res = await getScheduleDoctorByDate(
                this.props.doctorId,
                allDays[0].value
            );
            if (res.errCode === 0 && res.data) {
                this.setState({ allDays: allDays, allAvailableTime: res.data });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.language !== this.props.language ||
            prevProps.doctorId !== this.props.doctorId
        ) {
            let allDays = this.getArrDays(this.props.language);
            if (allDays.length > 0) {
                let res = await getScheduleDoctorByDate(
                    this.props.doctorId,
                    allDays[this.state.selectedIndex].value
                );
                if (res.errCode === 0 && res.data) {
                    this.setState({
                        allDays: allDays,
                        allAvailableTime: res.data,
                    });
                }
            }
        }
    }

    handleOnChangeSelect = async (e) => {
        let res = await getScheduleDoctorByDate(
            this.props.doctorId,
            e.target.value
        );
        if (res.errCode === 0) {
            let selectedIndex = this.state.allDays.findIndex(
                (x) => x.value === +e.target.value
            );

            this.setState({
                allAvailableTime: res.data,
                selectedIndex: selectedIndex,
            });
        }
    };

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        });
    };

    closeBookingSchedule = () => {
        this.setState({
            isOpenModalBooking: false,
        });
    };

    render() {
        const {
            allDays,
            allAvailableTime,
            isOpenModalBooking,
            dataScheduleTimeModal,
        } = this.state;
        const { language, doctorId } = this.props;
        return (
            <>
                <div>
                    <div>
                        <select
                            className="outline-none p-[4px] border-b-[1px] border-[#999] font-bold text-[#337ab7]"
                            onChange={this.handleOnChangeSelect}
                        >
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <div className="mt-[16px]">
                            <i className="fas fa-calendar-alt mr-[4px]"></i>
                            <span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        {allAvailableTime && allAvailableTime.length > 0 && (
                            <div>
                                <div className="grid grid-cols-4 gap-[8px] mt-[10px] pr-[30px]">
                                    {allAvailableTime.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                this.handleClickScheduleTime(
                                                    item
                                                )
                                            }
                                            className="font-bold rounded-[4px] bg-[#FFF04b] h-[40px] hover:bg-[#45C3D2] hover:text-white transition-all duration-100"
                                        >
                                            {language === LANGUAGES.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn}
                                        </button>
                                    ))}
                                </div>
                                <p className="mt-[10px]">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                    </span>
                                    <i className="far fa-hand-point-up"></i>
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </p>
                            </div>
                        )}

                        {allAvailableTime && allAvailableTime.length === 0 && (
                            <div className="italic font-bold">
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
                        )}
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeBookingSchedule={this.closeBookingSchedule}
                    dataTime={dataScheduleTimeModal}
                    doctorId={doctorId}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
