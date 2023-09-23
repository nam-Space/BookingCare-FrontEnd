import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import Header from "../containers/Header/Header";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import { USER_ROLE } from "../utils";

class Doctor extends Component {
    componentDidMount() {}

    render() {
        const { isLoggedIn } = this.props;

        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route
                                path="/doctor/manage-schedule"
                                component={ManageSchedule}
                            />
                            <Route
                                path="/doctor/manage-patient"
                                component={ManagePatient}
                            />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
