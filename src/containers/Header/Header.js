import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        const { processLogout, language } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="flex items-center">
                    <span className="mr-[10px]">
                        <FormattedMessage id="home-header.welcome" />
                        <span className="ml-[4px]">Admin!</span>
                    </span>
                    <span
                        onClick={() => this.changeLanguage(LANGUAGES.VI)}
                        className={`cursor-pointer ${
                            language === LANGUAGES.VI ? "text-orange-500" : ""
                        }`}
                    >
                        VN
                    </span>
                    <span
                        onClick={() => this.changeLanguage(LANGUAGES.EN)}
                        className={`ml-[10px] cursor-pointer ${
                            language === LANGUAGES.EN ? "text-[#30d663]" : ""
                        }`}
                    >
                        EN
                    </span>

                    {/* nút logout */}
                    <div
                        className="btn btn-logout ml-[15px]"
                        onClick={processLogout}
                        title="Log out "
                    >
                        <i className="fas fa-sign-out-alt"></i>
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
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
