import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import { postVerifyBookAppointment } from "../../services/userService";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errCode: 0,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get("token");
            let doctorId = urlParams.get("doctorId");
            let res = await postVerifyBookAppointment({
                doctorId,
                token,
            });
            if (res.errCode === 0) {
                this.setState({
                    loading: false,
                    errCode: 0,
                });
            } else {
                this.setState({
                    loading: false,
                    errCode: 1,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <>
                <HomeHeader />
                {this.state.loading ? (
                    <h1 className="mt-[100px] text-center">Loading...</h1>
                ) : this.state.errCode === 0 ? (
                    <h1 className="mt-[100px] text-center text-green-500">
                        Xác nhận lịch hẹn thành công!
                    </h1>
                ) : (
                    <h1 className="mt-[100px] text-center text-red-500">
                        Lịch hẹn không tồn tại hoặc đã được xác nhận!
                    </h1>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
