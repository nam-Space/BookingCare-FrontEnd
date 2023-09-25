import { toast } from "react-toastify";
import {
    createNewClinic,
    createNewHandbook,
    createNewSpecialty,
    createNewUserService,
    deleteClinic,
    deleteHandbook,
    deleteSpecialty,
    deleteUserService,
    editHandbook,
    editUserService,
    getAllClinic,
    getAllCodeService,
    getAllDoctors,
    getAllHandbook,
    getAllSpecialty,
    getAllUsers,
    getTopDoctorHomeService,
    saveDetailDoctorService,
    updateClinic,
    updateSpecialty,
} from "../../services/userService";
import actionTypes from "./actionTypes";

// gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else dispatch(fetchGenderFailed());
        } catch (error) {
            dispatch(fetchGenderFailed());
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

// position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else dispatch(fetchPositionFailed());
        } catch (error) {
            dispatch(fetchPositionFailed());
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

// role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else dispatch(fetchRoleFailed());
        } catch (error) {
            dispatch(fetchRoleFailed());
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

// CRUD user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                toast.success("Tạo mới người dùng thành công!");
            } else {
                dispatch(saveUserFailed());
                toast.error("Tài khoản này đã tồn tại!");
            }
        } catch (error) {
            dispatch(saveUserFailed());
            toast.error("Có lỗi xảy ra, xin vui lòng thử lại!");
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success("Xóa người dùng thành công!");
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            toast.error("Có lỗi xảy ra, xin vui lòng thử lại!");
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                toast.success("Sửa người dùng thành công!");
            } else {
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
            toast.error("Có lỗi xảy ra, xin vui lòng thử lại!");
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchAllUsersStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(10);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                });
                toast.success("Save info detail doctor successfully");
            } else {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
                });
                toast.error("Save info detail doctor error");
            }
        } catch (error) {
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
            });
            toast.error("Save info detail doctor error");
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const fetchRequiredDoctorInfoStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                dispatch(
                    fetchRequiredDoctorInfoSuccess({
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data,
                        resClinic: resClinic.data,
                    })
                );
            } else dispatch(fetchRequiredDoctorInfoFailed());
        } catch (error) {
            dispatch(fetchRequiredDoctorInfoFailed());
        }
    };
};

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredData,
});

export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});

// Specialty
export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialty();
            if (res && res.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(res.data));
            } else {
                dispatch(fetchAllSpecialtyFailed());
            }
        } catch (error) {
            dispatch(fetchAllSpecialtyFailed());
        }
    };
};

export const fetchAllSpecialtySuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data: data,
});

export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
});

export const createSpecialtyStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewSpecialty(data);
            if (res && res.errCode === 0) {
                dispatch(createSpecialtySuccess());
                toast.success("Tạo chuyên khoa thành công!");
            } else {
                dispatch(createSpecialtyFailed());
                toast.error("Tạo chuyên khoa thất bại!");
            }
        } catch (error) {
            dispatch(createSpecialtyFailed());
            toast.error("Tạo chuyên khoa thất bại!");
        }
    };
};

export const createSpecialtySuccess = () => ({
    type: actionTypes.CREATE_SPECIALTY_SUCCESS,
});

export const createSpecialtyFailed = () => ({
    type: actionTypes.CREATE_SPECIALTY_FAILED,
});

export const updateSpecialtyStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await updateSpecialty(data);
            if (res && res.errCode === 0) {
                dispatch(updateSpecialtySuccess());
                toast.success("Sửa chuyên khoa thành công!");
            } else {
                dispatch(updateSpecialtyFailed());
                toast.error("Sửa chuyên khoa thất bại!");
            }
        } catch (error) {
            dispatch(updateSpecialtyFailed());
            toast.error("Sửa chuyên khoa thất bại!");
        }
    };
};

export const updateSpecialtySuccess = () => ({
    type: actionTypes.UPDATE_SPECIALTY_SUCCESS,
});

export const updateSpecialtyFailed = () => ({
    type: actionTypes.UPDATE_SPECIALTY_FAILED,
});

export const deleteSpecialtyStart = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteSpecialty(specialtyId);
            if (res && res.errCode === 0) {
                dispatch(deleteSpecialtySuccess());
                toast.success("Xóa chuyên khoa thành công!");
            } else {
                dispatch(deleteSpecialtyFailed());
                toast.error("Xóa chuyên khoa thất bại!");
            }
        } catch (error) {
            dispatch(deleteSpecialtyFailed());
            toast.error("Xóa chuyên khoa thất bại!");
        }
    };
};

export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS,
});

export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED,
});

// Clinic
export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinic();
            if (res && res.errCode === 0) {
                dispatch(fetchAllClinicSuccess(res.data));
            } else {
                dispatch(fetchAllClinicFailed());
            }
        } catch (error) {
            dispatch(fetchAllClinicFailed());
        }
    };
};

export const fetchAllClinicSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: data,
});

export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED,
});

export const createClinicStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewClinic(data);
            if (res && res.errCode === 0) {
                dispatch(createClinicSuccess());
                toast.success("Tạo phòng khám thành công!");
            } else {
                dispatch(createClinicFailed());
                toast.error("Tạo phòng khám thất bại!");
            }
        } catch (error) {
            dispatch(createClinicFailed());
            toast.error("Tạo phòng khám thất bại!");
        }
    };
};

export const createClinicSuccess = () => ({
    type: actionTypes.CREATE_CLINIC_SUCCESS,
});

export const createClinicFailed = () => ({
    type: actionTypes.CREATE_CLINIC_FAILED,
});

export const updateClinicStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await updateClinic(data);
            if (res && res.errCode === 0) {
                dispatch(updateClinicSuccess());
                toast.success("Sửa phòng khám thành công!");
            } else {
                dispatch(updateClinicFailed());
                toast.error("Sửa phòng khám thất bại!");
            }
        } catch (error) {
            dispatch(updateClinicFailed());
            toast.error("Sửa phòng khám thất bại!");
        }
    };
};

export const updateClinicSuccess = () => ({
    type: actionTypes.UPDATE_CLINIC_SUCCESS,
});

export const updateClinicFailed = () => ({
    type: actionTypes.UPDATE_CLINIC_FAILED,
});

export const deleteClinicStart = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteClinic(clinicId);
            if (res && res.errCode === 0) {
                dispatch(deleteClinicSuccess());
                toast.success("Xóa phòng khám thành công!");
            } else {
                dispatch(deleteClinicFailed());
                toast.error("Xóa phòng khám thất bại!");
            }
        } catch (error) {
            dispatch(deleteClinicFailed());
            toast.error("Xóa phòng khám thất bại!");
        }
    };
};

export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS,
});

export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED,
});

export const fetchAllHandbookStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllHandbook();
            if (res && res.errCode === 0) {
                dispatch(fetchAllHandbookSuccess(res.data));
            } else {
                dispatch(fetchAllHandbookFailed());
            }
        } catch (error) {
            dispatch(fetchAllHandbookFailed());
        }
    };
};

export const fetchAllHandbookSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
    data: data,
});

export const fetchAllHandbookFailed = () => ({
    type: actionTypes.FETCH_ALL_HANDBOOK_FAILED,
});

export const createHandbookStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewHandbook(data);
            if (res && res.errCode === 0) {
                dispatch(createHandbookSuccess());
                toast.success("Tạo cẩm nang thành công!");
            } else {
                dispatch(createHandbookFailed());
                toast.error("Tạo cẩm nang thất bại!");
            }
        } catch (error) {
            dispatch(createHandbookFailed());
            toast.error("Tạo cẩm nang thất bại!");
        }
    };
};

export const createHandbookSuccess = () => ({
    type: actionTypes.CREATE_HANDBOOK_SUCCESS,
});

export const createHandbookFailed = () => ({
    type: actionTypes.CREATE_HANDBOOK_FAILED,
});

export const updateHandbookStart = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editHandbook(data);
            if (res && res.errCode === 0) {
                dispatch(updateHandbookSuccess());
                toast.success("Sửa cẩm nang thành công!");
            } else {
                dispatch(updateHandbookFailed());
                toast.error("Sửa cẩm nang thất bại!");
            }
        } catch (error) {
            dispatch(updateHandbookFailed());
            toast.error("Sửa cẩm nang thất bại!");
        }
    };
};

export const updateHandbookSuccess = () => ({
    type: actionTypes.UPDATE_HANDBOOK_SUCCESS,
});

export const updateHandbookFailed = () => ({
    type: actionTypes.UPDATE_HANDBOOK_FAILED,
});

export const deleteHandbookStart = (handBookId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteHandbook(handBookId);
            if (res && res.errCode === 0) {
                dispatch(deleteHandbookSuccess());
                toast.success("Xóa cẩm nang thành công!");
            } else {
                dispatch(deleteHandbookFailed());
                toast.error("Xóa cẩm nang thất bại!");
            }
        } catch (error) {
            dispatch(deleteHandbookFailed());
            toast.error("Xóa cẩm nang thất bại!");
        }
    };
};

export const deleteHandbookSuccess = () => ({
    type: actionTypes.DELETE_HANDBOOK_SUCCESS,
});

export const deleteHandbookFailed = () => ({
    type: actionTypes.DELETE_HANDBOOK_FAILED,
});
