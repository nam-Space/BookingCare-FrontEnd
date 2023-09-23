import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";

SwiperCore.use([Navigation]);
class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllHandbook();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allHandbook !== this.props.allHandbook) {
            this.setState({
                dataHandbook: this.props.allHandbook,
            });
        }
    }

    handleViewDetailHandbook = (item) => {
        this.props.history.push(`/detail-handbook/${item.id}`);
    };

    render() {
        return (
            <div className="section-container py-[30px] bg-[#F5F5F5]">
                <div className="section-content max-w-[1200px] mx-auto overflow-hidden">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            <FormattedMessage id="homepage.handbook" />
                        </h1>
                        <button className="uppercase px-[15px] py-[10px] bg-[#ebebeb] hover:bg-[#f7d800] transition-all duration-150">
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={2}
                        navigation={true}
                        modules={[Navigation]}
                    >
                        {this.state.dataHandbook.length > 0 &&
                            this.state.dataHandbook.map((item, index) => {
                                let imageBase64 = "";
                                if (item.image) {
                                    imageBase64 = new Buffer(
                                        item.image,
                                        "base64"
                                    ).toString("binary");
                                }

                                return (
                                    <SwiperSlide
                                        key={index}
                                        onClick={() =>
                                            this.handleViewDetailHandbook(item)
                                        }
                                    >
                                        <div className="grid grid-cols-2 gap-[10px] py-[10px]">
                                            <img
                                                src={imageBase64}
                                                className="mr-[10px] h-[192px] object-cover"
                                            />
                                            <p className="font-bold text-[16px] mt-[12px]">
                                                {item.name}
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
        allHandbook: state.admin.allHandbook,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllHandbook: () => dispatch(actions.fetchAllHandbookStart()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Handbook)
);
