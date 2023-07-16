import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

class Handbook extends Component {
    render() {
        SwiperCore.use([Navigation]);

        return (
            <div className="section-container py-[30px] bg-[#F5F5F5]">
                <div className="section-content max-w-[1200px] mx-auto overflow-hidden">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            Bác sĩ nổi bật tuần qua
                        </h1>
                        <button className="uppercase px-[15px] py-[10px] bg-[#ebebeb] hover:bg-[#f7d800] transition-all duration-150">
                            TÌM KIẾM
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={2}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex justify-center items-start py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w300/2023/07/11/171442-kham-da-lieu-quan-binh-thanh.jpg"
                                    className="mr-[10px]"
                                />
                                <p className="font-bold text-[16px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
