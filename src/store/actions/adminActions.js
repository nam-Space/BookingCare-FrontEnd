import { toast } from "react-toastify";
import {
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getAllDoctors,
    getAllUsers,
    getTopDoctorHomeService,
    saveDetailDoctorService,
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
                dispatch(fetchAllUsersStart());
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
                dispatch(fetchAllUsersStart());
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
                dispatch(fetchAllUsersStart());
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                dispatch(
                    fetchRequiredDoctorInfoSuccess({
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
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
