import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
    render() {
        return (
            <div className="h-[50px] bg-[rgba(0,0,0,0.2)] flex items-center justify-center">
                <p className="text-center">
                    &copy; 2023 BookingCare mode by Nguyễn Viết Nam. Buy me a
                    coffee!
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
