import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import defaultAvatar from "../../../assets/images/imgDefault.png";
import NumberFormat from "react-number-format";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            isLoading: true,
        };
    }

    async componentDidMount() {
        this.setState({
            isLoading: true,
        });
        const res = await getProfileDoctorById(this.props.doctorId);
        if (res.errCode === 0 && res.data) {
            this.setState({
                dataProfile: res.data,
            });
        }
        this.setState({
            isLoading: false,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.language !== this.props.language ||
            prevProps.doctorId !== this.props.doctorId
        ) {
            this.setState({
                isLoading: true,
            });
            const res = await getProfileDoctorById(this.props.doctorId);
            if (res.errCode === 0 && res.data) {
                this.setState({
                    dataProfile: res.data,
                });
            }
            this.setState({
                isLoading: false,
            });
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
                <div>
                    <FormattedMessage id="patient.booking-modal.free-booking" />
                </div>
            </>
        );
    };

    render() {
        let {
            language,
            isShowDescDoctor,
            dataTime,
            isShowLinkDetail,
            isShowPrice,
            isLink,
        } = this.props;
        let { dataProfile, isLoading } = this.state;
        let nameVi = "",
            nameEn = "";
        if (dataProfile?.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        return (
            <div>
                <div className="max-w-[1200px] mx-auto py-[14px] flex items-center">
                    {isLoading ? (
                        <Skeleton circle width={100} height={100} />
                    ) : (
                        <Link
                            to={`/detail-doctor/${this.props.doctorId}`}
                            className="text-[#45C3D2]"
                        >
                            <img
                                className="w-full max-w-[100px] h-[100px] rounded-full object-cover"
                                src={dataProfile?.image || defaultAvatar}
                            />
                        </Link>
                    )}

                    <div className="ml-[16px] w-fit">
                        {isLoading ? (
                            <Skeleton height={24} />
                        ) : isLink ? (
                            <Link
                                to={`/detail-doctor/${this.props.doctorId}`}
                                className={`hover:no-underline hover:text-[#45C3D2]`}
                            >
                                <h1
                                    className={`${
                                        this.props.titleActive
                                            ? "text-[#45C3D2]"
                                            : ""
                                    } text-[20px] font-bold`}
                                >
                                    {language === LANGUAGES.VI
                                        ? nameVi
                                        : nameEn}
                                </h1>
                            </Link>
                        ) : (
                            <h1
                                className={`${
                                    this.props.titleActive
                                        ? "text-[#45C3D2]"
                                        : ""
                                } text-[20px] font-bold`}
                            >
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </h1>
                        )}

                        {isLoading ? (
                            <Skeleton height={42} width={400} />
                        ) : isShowDescDoctor ? (
                            <p>{dataProfile?.Markdown?.description}</p>
                        ) : (
                            this.renderTimeBooking(dataTime)
                        )}
                    </div>
                </div>
                {!isLoading && isShowLinkDetail && (
                    <Link
                        to={`/detail-doctor/${this.props.doctorId}`}
                        className="text-[#45C3D2]"
                    >
                        Xem thêm
                    </Link>
                )}
                {isLoading ? (
                    <Skeleton height={24} width={100} />
                ) : (
                    isShowPrice && (
                        <div>
                            <FormattedMessage id="patient.booking-modal.price-booking" />{" "}
                            <NumberFormat
                                displayType={"text"}
                                value={
                                    language === LANGUAGES.VI
                                        ? dataProfile?.Doctor_Info
                                              ?.priceTypeData?.valueVi
                                        : dataProfile?.Doctor_Info
                                              ?.priceTypeData?.valueEn
                                }
                                thousandSeparator={true}
                                suffix={language === LANGUAGES.VI ? "VND" : ""}
                                prefix={language === LANGUAGES.EN ? "$" : ""}
                            />
                        </div>
                    )
                )}
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
