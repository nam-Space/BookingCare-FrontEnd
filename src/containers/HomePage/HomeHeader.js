import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";

import background from "../../assets/images/header/background.jpg";
import hospital from "../../assets/images/header/hospital.png";
import phone from "../../assets/images/header/phone.png";
import check from "../../assets/images/header/check.png";
import chemistry from "../../assets/images/header/chemistry.png";
import health from "../../assets/images/header/health.png";
import teeth from "../../assets/images/header/teeth.png";
import googleDownload from "../../assets/images/header/google-play-badge.svg";
import appStoreDownload from "../../assets/images/header/app-store-badge.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        const language = this.props.language;
        console.log(this.props.userInfo);

        return (
            <>
                <div className="home-header-container fixed top-0 left-0 right-0 bg-white z-[50]">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.specialty" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.health-facility" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.fee" />
                                    </b>
                                </div>
                                <div className="sub-title">
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support me-4">
                                <i className="fas fa-question-circle me-2"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div
                                className={`${
                                    language === LANGUAGES.VI
                                        ? "language-vi active"
                                        : "language-vi"
                                } me-3`}
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.VI)
                                }
                            >
                                VN
                            </div>
                            <div
                                className={`${
                                    language === LANGUAGES.EN
                                        ? "language-en active"
                                        : "language-en"
                                } flag`}
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.EN)
                                }
                            >
                                EN
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <img src={background} className="w-100 bg-header" />
                    <div className="overlay-dark"></div>
                    <div className="overlay-light"></div>
                    <div className="text-bg-container">
                        <div className="title-1">
                            <FormattedMessage id="banner.title-1" />
                        </div>
                        <div className="title-2">
                            <FormattedMessage id="banner.title-2" />
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <FormattedMessage
                                id="banner.search-placeholder"
                                defaultMessage="search"
                            >
                                {(placeholder) => (
                                    <input placeholder={placeholder} />
                                )}
                            </FormattedMessage>
                        </div>
                        <div className="download-container">
                            <img src={googleDownload} className="download" />
                            <img src={appStoreDownload} className="download" />
                        </div>
                        <div className="options">
                            <div className="option-child">
                                <img src={hospital} className="img-child" />
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-1" />
                                </div>
                            </div>
                            <div className="option-child">
                                <img src={phone} className="img-child" />
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-2" />
                                </div>
                            </div>
                            <div className="option-child">
                                <img src={check} className="img-child" />
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-3" />
                                </div>
                            </div>
                            <div className="option-child">
                                <img src={chemistry} className="img-child" />
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-4" />
                                </div>
                            </div>
                            <div className="option-child">
                                <img src={health} className="img-child" />
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-5" />
                                </div>
                            </div>
                            <div className="option-child">
                                <img src={teeth} className="img-child" />
                                <div className="text-child">
                                    <FormattedMessage id="banner.child-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
