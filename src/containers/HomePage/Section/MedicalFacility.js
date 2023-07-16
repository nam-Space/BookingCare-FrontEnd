import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

class MedicalFacility extends Component {
    render() {
        SwiperCore.use([Navigation]);

        return (
            <div className="section-container py-[30px] bg-[#F5F5F5]">
                <div className="section-content max-w-[1200px] mx-auto overflow-hidden">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            Cơ sở y tế nổi bật
                        </h1>
                        <button className="uppercase px-[15px] py-[10px] bg-[#ebebeb] hover:bg-[#f7d800] transition-all duration-150">
                            TÌM KIẾM
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="h-[160px] flex justify-center items-center bg-white">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w500/2018/05/11/181208mediteclogo.jpeg"
                                    className=""
                                />
                            </div>
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Phòng khám Đa khoa Meditec
                            </p>
                        </SwiperSlide>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
