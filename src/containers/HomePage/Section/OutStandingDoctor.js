import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

class OutStandingDoctor extends Component {
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
                        slidesPerView={4}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center bg-white py-[10px]">
                                <img
                                    src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                                    className="rounded-full h-[120px]"
                                />
                                <p className="leading-[18px] text-[14px] mt-[12px]">
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </p>
                                <p className="leading-[18px] text-[12px] mt-[4px]">
                                    Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
