import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import { getAllDetailClinicById } from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import HomeFooter from "../../HomePage/HomeFooter";
import Skeleton from "react-loading-skeleton";

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            isLoading: true,
        };
    }

    async componentDidMount() {
        window.scroll({
            top: 0,
            left: 0,
        });
        this.setState({
            isLoading: true,
        });
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;

                let arrDoctorId = data.doctorClinic;
                if (arrDoctorId && arrDoctorId.length > 0) {
                    arrDoctorId = arrDoctorId.map((item) => {
                        return item.doctorId;
                    });
                }

                this.setState({
                    dataDetailClinic: data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
        this.setState({
            isLoading: false,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        const { arrDoctorId, dataDetailClinic, isLoading } = this.state;

        let avatarBase64 = "";
        if (dataDetailClinic.avatar) {
            avatarBase64 = new Buffer(
                dataDetailClinic.avatar,
                "base64"
            ).toString("binary");
        }

        let backgroundImageBase64 = "";
        if (dataDetailClinic.backgroundImage) {
            backgroundImageBase64 = new Buffer(
                dataDetailClinic.backgroundImage,
                "base64"
            ).toString("binary");
        }

        return (
            <>
                <HomeHeader />
                <div className="mt-[78px]">
                    {isLoading ? (
                        <Skeleton height={300} baseColor="#ccc" />
                    ) : (
                        <div className={`relative h-[300px] overflow-hidden`}>
                            <div
                                className={`absolute top-0 left-0 right-0 bottom-0 bg-[url(${backgroundImageBase64})] bg-center bg-no-repeat bg-cover`}
                            ></div>
                            <div className="max-w-[1200px] absolute left-[50%] translate-x-[-50%] bottom-[20px] w-full">
                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-70"></div>

                                <div className="relative flex items-center p-[20px]">
                                    <img
                                        className="h-[112px] w-[112px] object-cover object-left mr-[30px]"
                                        src={avatarBase64}
                                    />
                                    <div>
                                        <h1 className="text-[28px] font-semibold">
                                            {dataDetailClinic.name}
                                        </h1>
                                        <p>{dataDetailClinic.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="max-w-[1200px] mt-[20px] mx-auto">
                        {arrDoctorId && arrDoctorId.length > 0
                            ? arrDoctorId.map((item, index) => (
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
                                              <DoctorSchedule doctorId={item} />
                                          </div>
                                          <DoctorExtraInfo doctorId={item} />
                                      </div>
                                  </div>
                              ))
                            : [1, 2, 3, 4, 5].map((_, index) => (
                                  <div>
                                      <Skeleton
                                          className="mt-[20px]"
                                          height={220}
                                          baseColor="#ccc"
                                      />
                                  </div>
                              ))}
                    </div>
                    <div
                        className="max-w-[1200px] mx-auto pt-[24px] relative mb-[30px] z-[1]"
                        dangerouslySetInnerHTML={{
                            __html: dataDetailClinic?.contentHTML,
                        }}
                    ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
