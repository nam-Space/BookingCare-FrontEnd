import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
import defaultAvatar from "../../../assets/images/imgDefault.png";
import { LANGUAGES } from "../../../utils";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import HomeFooter from "../../HomePage/HomeFooter";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
import Comment from "../SocialPlugin/Comment";
import Skeleton from "react-loading-skeleton";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
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
            let res = await getDetailInfoDoctor(id);
            if (res.errCode === 0) {
                this.setState({ detailDoctor: res.data });
            }
        }
        this.setState({
            isLoading: false,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { language } = this.props;
        let { detailDoctor, isLoading } = this.state;
        let nameVi = "",
            nameEn = "";
        if (detailDoctor?.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        let currentUrl =
            +process.env.REACT_APP_IS_LOCALHOST === 1
                ? window.location.href
                : "https://chatbot-ai-restaurant.onrender.com";

        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <div className="mt-[78px]">
                    <div className="max-w-[1200px] mx-auto py-[30px] flex items-center">
                        {isLoading ? (
                            <Skeleton circle width={120} height={120} />
                        ) : (
                            <img
                                className="w-[120px] h-[120px] rounded-full object-cover"
                                src={detailDoctor?.image || defaultAvatar}
                            />
                        )}

                        <div className="ml-[16px] w-fit">
                            {isLoading ? (
                                <Skeleton height={30} />
                            ) : (
                                <h1 className="text-[28px] font-bold">
                                    {language === LANGUAGES.VI
                                        ? nameVi
                                        : nameEn}
                                </h1>
                            )}

                            {isLoading ? (
                                <Skeleton height={50} width={800} />
                            ) : (
                                <>
                                    <p>{detailDoctor?.Markdown?.description}</p>
                                    <div className="mt-[10px]">
                                        <LikeAndShare dataHref={currentUrl} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex max-w-[1200px] mx-auto pb-[22px]">
                        <div className="w-[50%]">
                            {isLoading ? (
                                <Skeleton height={144} width="95%" />
                            ) : (
                                <DoctorSchedule
                                    doctorId={this.props?.match?.params?.id}
                                />
                            )}
                        </div>
                        <div className="w-[50%] border-l-[1px] border-[#eee]">
                            {isLoading ? (
                                <Skeleton height={144} width="95%" />
                            ) : (
                                <DoctorExtraInfo
                                    doctorId={this.props?.match?.params?.id}
                                />
                            )}
                        </div>
                    </div>
                    <div className="bg-[#F9F9F9] py-[30px]">
                        <div className="max-w-[1200px] mx-auto">
                            {isLoading ? (
                                <div>
                                    {[1, 2, 3, 4, 5].map((_, index) => (
                                        <div key={index}>
                                            <Skeleton
                                                height={30}
                                                baseColor="#ccc"
                                                className={`${
                                                    index !== 0
                                                        ? "mt-[40px]"
                                                        : ""
                                                }`}
                                            />
                                            <Skeleton
                                                className="mt-[10px]"
                                                height={64}
                                                baseColor="#ccc"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    id="detail-doctor-container"
                                    dangerouslySetInnerHTML={{
                                        __html: detailDoctor?.Markdown
                                            ?.contentHTML,
                                    }}
                                ></div>
                            )}
                        </div>
                        <div className="max-w-[1200px] mx-auto mt-[30px]">
                            <Comment dataHref={currentUrl} width="100%" />
                        </div>
                    </div>
                </div>

                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
