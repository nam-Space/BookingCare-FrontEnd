import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import Select from "react-select";
import DatePicker from "./../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: "",
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    buildDataInputSelect = (inputData) => {
        let res = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label =
                    this.props.language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                res.push(obj);
            });
        }
        return res;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.allDoctors !== this.props.allDoctors ||
            prevProps.language !== this.props.language
        ) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let rangeTime = this.props.allScheduleTime.map((item) => {
                return {
                    ...item,
                    isSelected: false,
                };
            });

            this.setState({
                rangeTime: rangeTime,
            });
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnChangeDatePicker = (date) => {
        if (date.length === 0) {
            alert(
                "Today is not be choosen! Please select other date to make the schedule"
            );
            this.setState({ currentDate: "" });
            return;
        }
        this.setState({ currentDate: date?.[0] });
    };

    handleClickBtnTime = (item) => {
        let rangeTime = this.state.rangeTime.map((time) => {
            if (time.id === item.id) {
                time.isSelected = !item.isSelected;
            }

            return {
                ...time,
                isSelected: time.isSelected,
            };
        });
        this.setState({ rangeTime: rangeTime });
    };

    handleSaveSchedule = async () => {
        let result = [];
        let { selectedDoctor, currentDate, rangeTime } = this.state;

        if (!currentDate) {
            toast.error("Please select the date to make the schedule");
            return;
        }

        if (currentDate && !currentDate.getTime()) {
            toast.error(
                "Today is not be choosen! Please select other date to make the schedule"
            );
            return;
        }

        if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
            toast.error("Please select the doctor to make the schedule");
            return;
        }

        let formattedDate = new Date(currentDate).getTime();
        if (rangeTime.length > 0) {
            let selectTime = rangeTime.filter(
                (time) => time.isSelected === true
            );

            if (selectTime.length > 0) {
                selectTime.map((item) => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formattedDate;
                    obj.timeType = item.keyMap;
                    result.push(obj);
                });
            } else {
                toast.error("Please select the time to make the schedule");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formattedDate,
        });

        if (res.errCode === 0) {
            toast.success("Successful medical appointment!");
        } else {
            toast.error("Failed medical appointment!");
        }
    };

    render() {
        const { rangeTime } = this.state;

        return (
            <div>
                <h1 className="mt-[20px] title">
                    <FormattedMessage id="manage-schedule.title" />
                </h1>
                <div className="max-w-[1200px] mx-auto mt-[20px]">
                    <div className="grid grid-cols-2 gap-[30px]">
                        <div>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate?.[0]}
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                    <div className="mt-[20px] grid grid-cols-6 gap-[20px]">
                        {rangeTime.map((item, index) => (
                            <button
                                className={`${
                                    item.isSelected ? "bg-[#FFF04b]" : ""
                                } py-[6px] px-[16px] border-[1px] border-gray-400 rounded-[6px]`}
                                key={index}
                                onClick={() => this.handleClickBtnTime(item)}
                            >
                                {this.props.language === LANGUAGES.VI
                                    ? item?.valueVi
                                    : item?.valueEn}
                            </button>
                        ))}
                    </div>
                    <button
                        className="btn btn-primary px-2 mt-[20px]"
                        onClick={this.handleSaveSchedule}
                    >
                        <FormattedMessage id="manage-schedule.save" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
