import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import defaultAvatar from "../../../assets/images/imgDefault.png";
import NumberFormat from "react-number-format";
import moment from "moment";
import localization from "moment/locale/vi";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        const res = await getProfileDoctorById(this.props.doctorId);
        if (res.errCode === 0 && res.data) {
            this.setState({
                dataProfile: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.language !== this.props.language ||
            prevProps.doctorId !== this.props.doctorId
        ) {
            const res = await getProfileDoctorById(this.props.doctorId);
            if (res.errCode === 0 && res.data) {
                this.setState({
                    dataProfile: res.data,
                });
            }
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTimeBooking = (dataTime) => {
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

        return (
            <>
                <div>
                    {time} - {date}
                </div>
                <div>Miễn phí đặt lịch</div>
            </>
        );
    };

    render() {
        let { language, isShowDescDoctor, dataTime } = this.props;
        let { dataProfile } = this.state;
        let nameVi = "",
            nameEn = "";
        if (dataProfile?.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        return (
            <div>
                <div className="max-w-[1200px] mx-auto py-[14px] flex items-center">
                    <img
                        className="w-[120px] h-[120px] rounded-full object-cover"
                        src={dataProfile?.image || defaultAvatar}
                    />
                    <div className="ml-[16px]">
                        <h1 className="text-[28px] font-bold">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </h1>
                        {isShowDescDoctor ? (
                            <p>{dataProfile?.Markdown?.description}</p>
                        ) : (
                            this.renderTimeBooking(dataTime)
                        )}
                    </div>
                </div>
                <div>
                    Giá khám:{" "}
                    <NumberFormat
                        displayType={"text"}
                        value={
                            language === LANGUAGES.VI
                                ? dataProfile?.Doctor_Info?.priceTypeData
                                      ?.valueVi
                                : dataProfile?.Doctor_Info?.priceTypeData
                                      ?.valueEn
                        }
                        thousandSeparator={true}
                        suffix={language === LANGUAGES.VI ? "VND" : ""}
                        prefix={language === LANGUAGES.EN ? "$" : ""}
                    />
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
