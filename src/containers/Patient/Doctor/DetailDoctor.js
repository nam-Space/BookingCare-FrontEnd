import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailInfoDoctor } from "../../../services/userService";
import defaultAvatar from "../../../assets/images/imgDefault.png";
import { LANGUAGES } from "../../../utils";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        };
    }

    async componentDidMount() {
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
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        let { language } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = "",
            nameEn = "";
        if (detailDoctor?.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <div className="mt-[78px]">
                    <div className="max-w-[1200px] mx-auto py-[30px] flex items-center">
                        <img
                            className="w-[120px] h-[120px] rounded-full object-cover"
                            src={detailDoctor?.image || defaultAvatar}
                        />
                        <div className="ml-[16px]">
                            <h1 className="text-[28px] font-bold">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </h1>
                            <p>{detailDoctor?.Markdown?.description}</p>
                        </div>
                    </div>
                    <div className="flex max-w-[1200px] mx-auto pb-[22px]">
                        <div className="w-[50%]">
                            <DoctorSchedule
                                doctorId={this.props?.match?.params?.id}
                            />
                        </div>
                        <div className="w-[50%] border-l-[1px] border-[#eee]">
                            <DoctorExtraInfo
                                doctorId={this.props?.match?.params?.id}
                            />
                        </div>
                    </div>
                    <div className="bg-[#F9F9F9] py-[30px]">
                        <div className="max-w-[1200px] mx-auto">
                            <div
                                className="detail-doctor-container"
                                dangerouslySetInnerHTML={{
                                    __html: detailDoctor?.Markdown?.contentHTML,
                                }}
                            ></div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
