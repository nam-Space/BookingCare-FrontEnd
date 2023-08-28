import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInfoDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfo: {},
        };
    }

    async componentDidMount() {
        let res = await getExtraInfoDoctorById(this.props.doctorId);
        if (res.errCode === 0 && res.data) {
            this.setState({
                extraInfo: res.data,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.language !== this.props.language ||
            prevProps.doctorId !== this.props.doctorId
        ) {
            let res = await getExtraInfoDoctorById(this.props.doctorId);
            if (res.errCode === 0 && res.data) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    render() {
        let { extraInfo } = this.state;
        let { language } = this.props;

        return (
            <div className="pl-[20px]">
                <div className="pb-[10px] border-b-[1px] border-[#eee]">
                    <p className="uppercase font-bold text-[#222]">
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </p>
                    <p className="font-bold py-[2px]">
                        {extraInfo?.nameClinic}
                    </p>
                    <p>{extraInfo?.addressClinic}</p>
                </div>
                <div className="pt-[10px]">
                    {!this.state.isShowDetail && (
                        <p>
                            <span className="uppercase text-[#222] font-bold">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </span>
                            <span className="ml-[2px]">
                                <NumberFormat
                                    displayType={"text"}
                                    value={
                                        language === LANGUAGES.VI
                                            ? extraInfo?.priceTypeData?.valueVi
                                            : extraInfo?.priceTypeData?.valueEn
                                    }
                                    thousandSeparator={true}
                                    suffix={
                                        language === LANGUAGES.VI ? "VND" : ""
                                    }
                                    prefix={
                                        language === LANGUAGES.EN ? "$" : ""
                                    }
                                />
                            </span>
                            <span
                                className="ml-[6px] text-[#45C3D2] cursor-pointer"
                                onClick={() =>
                                    this.setState({ isShowDetail: true })
                                }
                            >
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>
                        </p>
                    )}

                    {this.state.isShowDetail && (
                        <div>
                            <p className="uppercase text-[#222] font-bold mb-[10px]">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </p>
                            <div>
                                <div className="bg-[#F8F8F8] p-[4px]">
                                    <div className="justify-between flex">
                                        <p>
                                            <FormattedMessage id="patient.extra-info-doctor.price" />
                                        </p>
                                        <p>
                                            <NumberFormat
                                                displayType={"text"}
                                                value={
                                                    language === LANGUAGES.VI
                                                        ? extraInfo
                                                              ?.priceTypeData
                                                              ?.valueVi
                                                        : extraInfo
                                                              ?.priceTypeData
                                                              ?.valueEn
                                                }
                                                thousandSeparator={true}
                                                suffix={
                                                    language === LANGUAGES.VI
                                                        ? "VND"
                                                        : ""
                                                }
                                                prefix={
                                                    language === LANGUAGES.EN
                                                        ? "$"
                                                        : ""
                                                }
                                            />
                                        </p>
                                    </div>
                                    <p>{extraInfo?.note}</p>
                                </div>
                                <div className="bg-[#EEEEEE] p-[4px] mb-[10px] ">
                                    <p>
                                        <span>
                                            <FormattedMessage id="patient.extra-info-doctor.payment" />
                                        </span>{" "}
                                        <span>
                                            {language === LANGUAGES.VI
                                                ? extraInfo?.paymentTypeData
                                                      ?.valueVi
                                                : extraInfo?.paymentTypeData
                                                      ?.valueEn}
                                        </span>
                                    </p>
                                </div>
                                <span
                                    className="text-[#45C3D2] cursor-pointer"
                                    onClick={() =>
                                        this.setState({ isShowDetail: false })
                                    }
                                >
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                                </span>
                            </div>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
