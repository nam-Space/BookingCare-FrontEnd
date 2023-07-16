import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

class Specialty extends Component {
    render() {
        SwiperCore.use([Navigation]);

        return (
            <div className="section-container py-[30px] bg-[#F5F5F5]">
                <div className="section-content">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            Chuyên khoa phổ biến
                        </h1>
                        <button className="uppercase px-[15px] py-[10px] bg-[#ebebeb] hover:bg-[#f7d800] transition-all duration-150">
                            Xem thêm
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={4}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
                            </p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://cdn.bookingcare.vn/fr/w300/2023/06/20/112457-co-xuong-khop.jpg"
                                className="w-full"
                            />
                            <p className="leading-[18px] text-[14px] mt-[8px]">
                                Cơ Xương Khớp
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
