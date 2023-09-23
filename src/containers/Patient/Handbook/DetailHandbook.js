import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import {
    getAllCodeService,
    getAllDetailSpecialtyById,
    getDetailHandbookById,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import _ from "lodash";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { FormattedMessage } from "react-intl";
import HomeFooter from "../../HomePage/HomeFooter";

class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getDetailHandbookById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailHandbook: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        const { dataDetailHandbook } = this.state;

        console.log(dataDetailHandbook);

        let imageBase64 = "";
        if (dataDetailHandbook.image) {
            imageBase64 = new Buffer(
                dataDetailHandbook.image,
                "base64"
            ).toString("binary");
        }

        return (
            <>
                <HomeHeader />
                <div className="mt-[78px]">
                    <div className="max-w-[1200px] mx-auto pt-[15px]">
                        <h1 className="font-bold">{dataDetailHandbook.name}</h1>
                        <div className="flex items-center px-[12px] py-[6px] rounded-[4px] mt-[15px] bg-[#DFF0D8]">
                            <i
                                className="fa fa-star text-[#EA8600]"
                                aria-hidden="true"
                            ></i>
                            <p className="ml-[10px]">
                                <FormattedMessage id="patient.handbook.hint" />
                            </p>
                        </div>
                        <div className="mt-[15px]">
                            <img
                                src={imageBase64}
                                alt={dataDetailHandbook.name}
                                className="w-full"
                            />
                        </div>
                        <p className="text-center bg-[#f5f5f5] py-[10px] text-[#333] text-[14px] italic">
                            {dataDetailHandbook.caption}
                        </p>
                    </div>
                    <div className="bg-[#FCFAF6] py-[20px]">
                        <div
                            className="max-w-[1200px] mx-auto"
                            dangerouslySetInnerHTML={{
                                __html: dataDetailHandbook?.contentHTML,
                            }}
                        ></div>
                    </div>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
