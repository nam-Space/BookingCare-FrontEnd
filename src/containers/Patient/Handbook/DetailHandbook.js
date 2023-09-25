import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailHandbookById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import HomeFooter from "../../HomePage/HomeFooter";
import Skeleton from "react-loading-skeleton";

class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
            isLoading: true,
        };
    }

    async componentDidMount() {
        window.scroll({
            top: 0,
            left: 0,
        });
        this.setState({ isLoading: true });
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
        this.setState({ isLoading: false });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        const { dataDetailHandbook, isLoading } = this.state;

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
                        {isLoading ? (
                            <Skeleton height={80} />
                        ) : (
                            <h1 className="font-bold">
                                {dataDetailHandbook.name}
                            </h1>
                        )}

                        {isLoading ? (
                            <Skeleton height={54} className="mt-[30px]" />
                        ) : (
                            <div className="flex items-center px-[12px] py-[6px] rounded-[4px] mt-[15px] bg-[#DFF0D8]">
                                <i
                                    className="fa fa-star text-[#EA8600]"
                                    aria-hidden="true"
                                ></i>
                                <p className="ml-[10px]">
                                    <FormattedMessage id="patient.handbook.hint" />
                                </p>
                            </div>
                        )}

                        <div className="mt-[15px]">
                            {isLoading ? (
                                <Skeleton height={500} className="mt-[30px]" />
                            ) : (
                                <img
                                    src={imageBase64}
                                    alt={dataDetailHandbook.name}
                                    className="w-full"
                                />
                            )}
                        </div>
                        {isLoading ? (
                            <Skeleton height={30} className="mt-[16px]" />
                        ) : (
                            <p className="text-center bg-[#f5f5f5] py-[10px] text-[#333] text-[14px] italic">
                                {dataDetailHandbook.caption}
                            </p>
                        )}
                    </div>
                    <div className="bg-[#FCFAF6] py-[20px]">
                        {isLoading ? (
                            <div className="max-w-[1200px] mx-auto">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <div key={index}>
                                        <Skeleton
                                            height={30}
                                            baseColor="#ccc"
                                            className={`${
                                                index !== 0 ? "mt-[40px]" : ""
                                            }`}
                                        />
                                        <Skeleton
                                            className="mt-[10px]"
                                            height={64}
                                            baseColor="#ccc"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="max-w-[1200px] mx-auto"
                                dangerouslySetInnerHTML={{
                                    __html: dataDetailHandbook?.contentHTML,
                                }}
                            ></div>
                        )}
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
