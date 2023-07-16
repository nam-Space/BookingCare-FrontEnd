import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

class About extends Component {
    render() {
        SwiperCore.use([Navigation]);

        return (
            <div className="section-container py-[30px]">
                <div className="section-content max-w-[1200px] mx-auto overflow-hidden">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            Truyền thông nói về BookingCare
                        </h1>
                    </div>
                    <div className="flex gap-[60px]">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                        <div className="grid grid-cols-3 gap-[10px] h-[60%]">
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full"
                                    src="https://bookingcare.vn/assets/truyenthong/suckhoedoisong.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full"
                                    src="https://bookingcare.vn/assets/truyenthong/vtv1.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full"
                                    src="https://bookingcare.vn/assets/truyenthong/ictnews.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full"
                                    src="https://bookingcare.vn/assets/truyenthong/vnexpress.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full bg-[#a3171e] rounded-[4px]"
                                    src="https://bookingcare.vn/assets/truyenthong/vtcnews.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full"
                                    src="https://bookingcare.vn/assets/truyenthong/cuc-cong-nghe-thong-tin-bo-y-te-2.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full"
                                    src="https://bookingcare.vn/assets/truyenthong/infonet.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full"
                                    src="https://bookingcare.vn/assets/truyenthong/vtv1.png"
                                />
                            </div>
                            <div className="flex items-center justify-center max-w-[150px]">
                                <img
                                    className="h-full bg-[#16325C] rounded-[4px] p-[14px]"
                                    src="https://bookingcare.vn/assets/truyenthong/vtcgo.png"
                                />
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
