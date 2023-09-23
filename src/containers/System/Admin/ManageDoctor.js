import React, { Component } from "react";
import { connect } from "react-redux";
import "../UserManage.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import { getDetailInfoDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            // save to markdown table
            selectedDoctor: { label: "", value: "" },
            contentMarkdown: "",
            contentHTML: "",
            description: "",

            // save to doctor_info table
            selectedPrice: { label: "", value: "" },
            selectedPayment: { label: "", value: "" },
            selectedProvince: { label: "", value: "" },
            selectedSpecialty: { label: "", value: "" },
            selectedClinic: { label: "", value: "" },
            nameClinic: "",
            addressClinic: "",
            note: "",

            hasOldData: false,
            action: CRUD_ACTIONS.CREATE,
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfo();
    }

    buildDataInputSelect = (inputData, type) => {
        let res = [];
        if (inputData && inputData.length > 0) {
            if (type === "USERS") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    obj.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    obj.value = item.id;
                    res.push(obj);
                });
            } else if (type === "PRICE") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    obj.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    obj.value = item.keyMap;
                    res.push(obj);
                });
            } else if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    obj.label =
                        this.props.language === LANGUAGES.VI
                            ? labelVi
                            : labelEn;
                    obj.value = item.keyMap;
                    res.push(obj);
                });
            } else {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.id;
                    res.push(obj);
                });
            }
        }
        return res;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.allDoctors !== this.props.allDoctors ||
            prevProps.language !== this.props.language ||
            prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo
        ) {
            let dataSelectDoctor = this.buildDataInputSelect(
                this.props.allDoctors,
                "USERS"
            );
            let dataSelectPrice = this.buildDataInputSelect(
                this.props.allRequiredDoctorInfo.resPrice,
                "PRICE"
            );
            let dataSelectPayment = this.buildDataInputSelect(
                this.props.allRequiredDoctorInfo.resPayment,
                "PAYMENT"
            );
            let dataSelectProvince = this.buildDataInputSelect(
                this.props.allRequiredDoctorInfo.resProvince,
                "PROVINCE"
            );

            let dataSelectSpecialty = this.buildDataInputSelect(
                this.props.allRequiredDoctorInfo.resSpecialty,
                "SPECIALTY"
            );

            let dataSelectClinic = this.buildDataInputSelect(
                this.props.allRequiredDoctorInfo.resClinic,
                "CLINIC"
            );

            let selectedPrice = dataSelectPrice.find(
                (item) => item && item.value === this.state.selectedPrice?.value
            );
            if (!selectedPrice) {
                selectedPrice = { label: "", value: "" };
            }

            let selectedPayment = dataSelectPayment.find(
                (item) =>
                    item && item.value === this.state.selectedPayment?.value
            );
            if (!selectedPayment) {
                selectedPayment = { label: "", value: "" };
            }

            let selectedProvince = dataSelectProvince.find(
                (item) =>
                    item && item.value === this.state.selectedProvince?.value
            );
            if (!selectedProvince) {
                selectedProvince = { label: "", value: "" };
            }

            let selectedSpecialty = dataSelectSpecialty.find(
                (item) =>
                    item && item.value === this.state.selectedSpecialty?.value
            );
            if (!selectedSpecialty) {
                selectedSpecialty = { label: "", value: "" };
            }

            let selectedClinic = dataSelectClinic.find(
                (item) =>
                    item && item.value === this.state.selectedClinic?.value
            );
            if (!selectedClinic) {
                selectedClinic = { label: "", value: "" };
            }

            this.setState({
                listDoctors: dataSelectDoctor,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
    };

    handleSaveContentMarkdown = () => {
        if (
            !this.state.selectedDoctor ||
            !this.state.selectedDoctor.label ||
            !this.state.selectedDoctor.value
        ) {
            toast.error("Please select the doctor!");
            return;
        }

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: this.state.hasOldData
                ? CRUD_ACTIONS.EDIT
                : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic.value,
        });
        this.setState({
            hasOldData: true,
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res = await getDetailInfoDoctor(selectedDoctor.value);
        if (res.errCode === 0) {
            let {
                listPrice,
                listPayment,
                listProvince,
                listSpecialty,
                listClinic,
            } = this.state;

            let contentHTML = "";
            let contentMarkdown = "";
            let description = "";
            let hasOldData = false;

            let selectedPrice = { label: "", value: "" };
            let selectedProvince = { label: "", value: "" };
            let selectedPayment = { label: "", value: "" };
            let selectedSpecialty = { label: "", value: "" };
            let selectedClinic = { label: "", value: "" };

            let nameClinic = "";
            let addressClinic = "";
            let note = "";

            if (res.data.Markdown) {
                let markdown = res.data.Markdown;

                contentHTML = markdown.contentHTML;
                contentMarkdown = markdown.contentMarkdown;
                description = markdown.description;
                hasOldData = true;

                this.setState({
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    hasOldData: true,
                });
            }
            if (res.data.Doctor_Info) {
                let doctorInfo = res.data.Doctor_Info;

                let priceId = doctorInfo.priceId;
                let provinceId = doctorInfo.provinceId;
                let paymentId = doctorInfo.paymentId;
                let specialtyId = doctorInfo.specialtyId;
                let clinicId = doctorInfo.clinicId;

                selectedPrice = listPrice.find(
                    (item) => item && item.value === priceId
                );
                selectedProvince = listProvince.find(
                    (item) => item && item.value === provinceId
                );
                selectedPayment = listPayment.find(
                    (item) => item && item.value === paymentId
                );

                selectedSpecialty = listSpecialty.find(
                    (item) => item && item.value === specialtyId
                );

                selectedClinic = listClinic.find(
                    (item) => item && item.value === clinicId
                );

                nameClinic = doctorInfo.nameClinic;
                addressClinic = doctorInfo.addressClinic;
                note = doctorInfo.note;
            }

            this.setState({
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                description: description,
                hasOldData: hasOldData,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedPayment: selectedPayment,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
            });
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
                nameClinic: "",
                addressClinic: "",
                note: "",
            });
        }
    };

    handleChangeSelectDoctorInfo = (selectedOption, name) => {
        let newState = { ...this.state };
        newState[name.name] = selectedOption;
        this.setState({
            ...newState,
        });
    };

    handleOnChangeText = (e, id) => {
        let newState = { ...this.state };
        newState[id] = e.target.value;
        this.setState({
            ...newState,
        });
    };

    render() {
        let { hasOldData } = this.state;

        return (
            <div className="max-w-[1440px] mx-auto">
                <div className="pb-[20px] text-center text-[20px] font-semibold title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="mb-[20px] flex gap-[20px]">
                    <div className="basis-1/3">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            className=""
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            }
                        />
                    </div>
                    <div className="basis-2/3">
                        <label htmlFor="doctor-input">
                            <FormattedMessage id="admin.manage-doctor.intro" />
                        </label>
                        <textarea
                            id="doctor-input"
                            className="form-control"
                            rows={3}
                            onChange={(e) =>
                                this.handleOnChangeText(e, "description")
                            }
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="grid grid-cols-3 mb-[20px] gap-[20px]">
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.price" />
                        </label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.price" />
                            }
                            name="selectedPrice"
                        />
                    </div>
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.payment" />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            }
                            name="selectedPayment"
                        />
                    </div>
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.province" />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.province" />
                            }
                            name="selectedProvince"
                        />
                    </div>
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.nameClinic" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                this.handleOnChangeText(e, "nameClinic")
                            }
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.addressClinic" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                this.handleOnChangeText(e, "addressClinic")
                            }
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.note" />
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => this.handleOnChangeText(e, "note")}
                            value={this.state.note}
                        />
                    </div>
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-specialty" />
                        </label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            className=""
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-specialty" />
                            }
                            name="selectedSpecialty"
                        />
                    </div>
                    <div>
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-clinic" />
                        </label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listClinic}
                            className=""
                            placeholder={
                                <FormattedMessage id="admin.manage-doctor.select-clinic" />
                            }
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <MdEditor
                    style={{ height: "500px", marginBottom: "16px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />
                <button
                    className={`btn ${
                        hasOldData ? "btn-warning" : "btn-primary"
                    }  px-3 mb-3`}
                    onClick={this.handleSaveContentMarkdown}
                >
                    {hasOldData ? (
                        <FormattedMessage id="admin.manage-doctor.save" />
                    ) : (
                        <FormattedMessage id="admin.manage-doctor.add" />
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfo: () =>
            dispatch(actions.fetchRequiredDoctorInfoStart()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
