import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                size="lg"
                centered={true}
                toggle={this.props.closeBookingSchedule}
            >
                <div>
                    <div className="flex justify-between px-[10px] py-[10px] font-bold border-b-[1px] border-[#ccc]">
                        <p>Thông tin đặt lịch khám bệnh</p>
                        <span className="px-[6px] cursor-pointer">
                            <i
                                onClick={this.props.closeBookingSchedule}
                                className="fas fa-times"
                            ></i>
                        </span>
                    </div>
                    <div className="px-[10px] pb-[30px]">
                        <ProfileDoctor
                            doctorId={this.props.doctorId}
                            isShowDescDoctor={false}
                            dataTime={this.props.dataTime}
                        />
                        <div className="grid grid-cols-2 gap-[16px]">
                            <div>
                                <label>Họ tên</label>
                                <input className="form-control" />
                            </div>
                            <div>
                                <label>Số điện thoại</label>
                                <input className="form-control" />
                            </div>
                            <div>
                                <label>Địa chỉ Email</label>
                                <input className="form-control" />
                            </div>
                            <div>
                                <label>Địa chỉ liên hệ</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-start-1 col-end-3">
                                <label>Lý do khám</label>
                                <input className="form-control" />
                            </div>
                            <div>
                                <label>Đặt cho ai</label>
                                <input className="form-control" />
                            </div>
                            <div>
                                <label>Giới tính</label>
                                <input className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="px-[10px] py-[10px] flex justify-end border-t-[1px] border-[#ccc]">
                        <button
                            onClick={this.props.closeBookingSchedule}
                            className="btn btn-primary px-3 mr-[10px]"
                        >
                            Xác nhận
                        </button>
                        <button
                            onClick={this.props.closeBookingSchedule}
                            className="btn btn-secondary px-3"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
