import React, { Component } from "react";
import { connect } from "react-redux";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import Skeleton from "react-loading-skeleton";

SwiperCore.use([Navigation]);
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllClinic();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allClinic !== this.props.allClinic) {
            this.setState({
                dataClinic: this.props.allClinic,
            });
        }
    }

    handleViewDetailClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`);
    };

    render() {
        return (
            <div className="section-container py-[30px] bg-[#F5F5F5]">
                <div className="section-content max-w-[1200px] mx-auto overflow-hidden">
                    <div className="flex justify-between items-center mb-[25px]">
                        <h1 className="text-[22px] font-semibold">
                            <FormattedMessage id="homepage.clinic-popular" />
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
                        {this.state.dataClinic.length > 0
                            ? this.state.dataClinic.map((item, index) => {
                                  let avatarBase64 = "";
                                  if (item.avatar) {
                                      avatarBase64 = new Buffer(
                                          item.avatar,
                                          "base64"
                                      ).toString("binary");
                                  }

                                  return (
                                      <SwiperSlide
                                          key={index}
                                          onClick={() =>
                                              this.handleViewDetailClinic(item)
                                          }
                                      >
                                          <div className="flex justify-center items-center">
                                              <img
                                                  src={avatarBase64}
                                                  className="h-[192px] object-cover"
                                              />
                                          </div>
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
        allClinic: state.admin.allClinic,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
