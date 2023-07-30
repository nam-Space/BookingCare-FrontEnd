import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import imgDefault from "../../../assets/images/imgDefault.png";
import { FormattedMessage } from "react-intl";

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    render() {
        SwiperCore.use([Navigation]);
        let { arrDoctors } = this.state;
        let { language } = this.props;

        return (
            <div className="section-container py-[30px] bg-[#F5F5F5]">
                <div className="section-content max-w-[1200px] mx-auto overflow-hidden">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            <FormattedMessage id="homepage.out-standing-doctor" />
                        </h1>
                        <button className="uppercase px-[15px] py-[10px] bg-[#ebebeb] hover:bg-[#f7d800] transition-all duration-150">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        {arrDoctors.map((item, index) => {
                            let imageBase64 = "";
                            if (item.image) {
                                imageBase64 = new Buffer(
                                    item.image,
                                    "base64"
                                ).toString("binary");
                            }

                            let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                            let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                            return (
                                <SwiperSlide key={index}>
                                    <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                        <img
                                            src={imageBase64 || imgDefault}
                                            className="rounded-full h-[120px] w-[120px] object-cover"
                                        />
                                        <p className="leading-[18px] text-[14px] mt-[12px]">
                                            {language === LANGUAGES.VI
                                                ? nameVi
                                                : nameEn}
                                        </p>
                                        <p className="leading-[18px] text-[12px] mt-[4px]">
                                            {item.lastName}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
