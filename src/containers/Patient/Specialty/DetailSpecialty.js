import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import {
    getAllCodeService,
    getAllDetailSpecialtyById,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import HomeFooter from "../../HomePage/HomeFooter";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],
            isShowDetail: false,
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: "ALL",
            });

            let resProvince = await getAllCodeService("PROVINCE");

            if (
                res &&
                res.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = res.data;

                let arrDoctorId = data.doctorSpecialty;
                if (arrDoctorId && arrDoctorId.length > 0) {
                    arrDoctorId = arrDoctorId.map((item) => {
                        return item.doctorId;
                    });
                }

                let dataProvince = resProvince.data;
                dataProvince.unshift({
                    keyMap: "ALL",
                    type: "PROVINCE",
                    valueEn: "Toàn quốc",
                    valueVi: "ALL",
                    createdAt: null,
                    updatedAt: null,
                });

                this.setState({
                    dataDetailSpecialty: data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    handleOnChangeSelect = async (e) => {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let location = e.target.value;

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location,
            });

            if (res && res.errCode === 0) {
                let data = res.data;

                let arrDoctorId = data.doctorSpecialty;
                if (arrDoctorId && arrDoctorId.length > 0) {
                    arrDoctorId = arrDoctorId.map((item) => {
                        return item.doctorId;
                    });
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    };

    render() {
        const { arrDoctorId, dataDetailSpecialty, listProvince, isShowDetail } =
            this.state;

        let imageBase64 = "";
        if (dataDetailSpecialty.image) {
            imageBase64 = new Buffer(
                dataDetailSpecialty.image,
                "base64"
            ).toString("binary");
        }

        return (
            <>
                <HomeHeader />
                <div className="mt-[78px]">
                    <div
                        className={`relative ${
                            isShowDetail ? "h-auto" : "h-[300px]"
                        } overflow-hidden`}
                    >
                        <div
                            className={`absolute top-0 left-0 right-0 bottom-0 bg-[url(${imageBase64})] bg-center bg-no-repeat bg-cover opacity-30`}
                        ></div>
                        <div
                            className="max-w-[1200px] mx-auto pt-[24px] relative mb-[30px] z-[1]"
                            dangerouslySetInnerHTML={{
                                __html: dataDetailSpecialty?.contentHTML,
                            }}
                        ></div>
                        <div className="absolute left-0 right-0 bottom-0 h-[40%] bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.9),white)]"></div>
                        <div className="absolute z-[1] left-0 right-0 bottom-0 bg-white text-[#45C3D2]">
                            <div className="max-w-[1200px] mx-auto">
                                {!isShowDetail ? (
                                    <span
                                        className="py-[4px] inline-block leading-[22px] cursor-pointer"
                                        onClick={() =>
                                            this.setState({
                                                isShowDetail: true,
                                            })
                                        }
                                    >
                                        Đọc thêm
                                    </span>
                                ) : (
                                    <span
                                        className="py-[4px] inline-block leading-[22px] cursor-pointer"
                                        onClick={() =>
                                            this.setState({
                                                isShowDetail: false,
                                            })
                                        }
                                    >
                                        Ẩn bớt
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#EEEEEE]">
                        <div className="max-w-[1200px] mx-auto">
                            <select
                                onChange={this.handleOnChangeSelect}
                                className="bg-white my-[10px] px-[16px] py-[6px] outline-none rounded-[4px] border-[1px] border-[#ced4da]"
                            >
                                {listProvince.map((item, index) => (
                                    <option key={index} value={item.keyMap}>
                                        {this.props.language === LANGUAGES.VI
                                            ? item.valueVi
                                            : item.valueEn}
                                    </option>
                                ))}
                            </select>

                            {arrDoctorId &&
                                arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => (
                                    <div
                                        className="bg-white flex mb-[10px] shadow-[0_1px_6px_rgba(32,33,36,0.28)] rounded-[8px] p-[14px]"
                                        key={index}
                                    >
                                        <div className="w-[50%] border-r-[1px] border-[#eee] flex items-start">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                                titleActive={true}
                                            />
                                        </div>
                                        <div className="w-[50%]">
                                            <div className="pl-[20px]">
                                                <DoctorSchedule
                                                    doctorId={item}
                                                />
                                            </div>
                                            <DoctorExtraInfo doctorId={item} />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
