import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";

import { withRouter } from "react-router";
import Skeleton from "react-loading-skeleton";

SwiperCore.use([Navigation]);
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSpecialty !== this.props.allSpecialty) {
            this.setState({
                dataSpecialty: this.props.allSpecialty,
            });
        }
    }

    handleViewDetailSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`);
    };

    render() {
        return (
            <div className="section-container py-[30px] bg-[#F5F5F5]">
                <div className="section-content">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            <FormattedMessage id="homepage.specialty-popular" />
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
                        {this.state.dataSpecialty &&
                        this.state.dataSpecialty.length > 0
                            ? this.state.dataSpecialty.map((item, index) => {
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
                                              this.handleViewDetailSpecialty(
                                                  item
                                              )
                                          }
                                      >
                                          <img
                                              src={imageBase64}
                                              alt={item.name}
                                              className="w-full h-[192px] object-cover"
                                          />
                                          <p className="leading-[18px] text-[14px] mt-[8px]">
                                              {item.name}
                                          </p>
                                      </SwiperSlide>
                                  );
                              })
                            : [1, 2, 3, 4].map((_, index) => (
                                  <SwiperSlide key={index}>
                                      <Skeleton
                                          height={192}
                                          borderRadius={10}
                                          baseColor="#e8e8e8"
                                      />
                                  </SwiperSlide>
                              ))}
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
        allSpecialty: state.admin.allSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
