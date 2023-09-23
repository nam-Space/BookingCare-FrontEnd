import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imageBase64: "",
            isOpenLightBox: false,
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                imageBase64: "",
            });
        }
    }

    handleOnChangeInput = (e, id) => {
        const newState = { ...this.state };
        newState[id] = e.target.value;
        this.setState({
            ...newState,
        });
    };

    handleOnChangeImage = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (this.state.imageBase64) {
            this.setState({
                isOpenLightBox: true,
            });
        }
    };

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };

    render() {
        const { isOpenModal, closeRemedyModal } = this.props;
        const { email, imageBase64, isOpenLightBox } = this.state;

        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    size="lg"
                    centered={true}
                    toggle={closeRemedyModal}
                >
                    <div>
                        <div className="flex justify-between px-[10px] py-[10px] font-bold border-b-[1px] border-[#ccc]">
                            <p>Gửi hóa đơn khám bệnh thành công</p>
                            <span className="px-[6px] cursor-pointer">
                                <i
                                    onClick={closeRemedyModal}
                                    className="fas fa-times"
                                ></i>
                            </span>
                        </div>
                        <div className="px-[10px] pb-[30px]">
                            <div className="mt-[14px] grid grid-cols-2 gap-[16px]">
                                <div>
                                    <label>Email bệnh nhân</label>
                                    <input
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(e, "email")
                                        }
                                    />
                                </div>
                                <div>
                                    <label>Chọn file đơn thuốc</label>
                                    <div>
                                        <label
                                            className="h-[33px] bg-slate-400 px-[8px] rounded-[4px]"
                                            htmlFor="preview-img-remedy"
                                        >
                                            <div className="h-full flex items-center">
                                                <span className="mr-2">
                                                    Tải lên
                                                </span>
                                                <i className="fas fa-upload"></i>
                                            </div>
                                        </label>
                                        <input
                                            onChange={this.handleOnChangeImage}
                                            id="preview-img-remedy"
                                            type="file"
                                            hidden
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            imageBase64 ? "cursor-pointer" : ""
                                        } mt-[4px] border-dashed border-gray-400 border-[3px] h-[80px] bg-[url(${imageBase64})] bg-contain bg-no-repeat bg-center`}
                                        onClick={this.openPreviewImage}
                                    ></div>
                                    {isOpenLightBox && (
                                        <Lightbox
                                            mainSrc={imageBase64}
                                            onCloseRequest={() =>
                                                this.setState({
                                                    isOpenLightBox: false,
                                                })
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="px-[10px] py-[10px] flex justify-end border-t-[1px] border-[#ccc]">
                            <button
                                onClick={this.handleSendRemedy}
                                className="btn btn-primary px-3 mr-[10px]"
                            >
                                Gửi
                            </button>
                            <button
                                onClick={closeRemedyModal}
                                className="btn btn-secondary px-3"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
