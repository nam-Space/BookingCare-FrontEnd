import axios from "../axios";

export const handleLogin = async (userEmail, userPassword) => {
    return await axios.post("/api/login", {
        email: userEmail,
        password: userPassword,
    });
};

export const getAllUsers = async (inputId) => {
    return await axios.get(`/api/get-all-users?id=${inputId}`);
};

export const createNewUserService = async (data) => {
    return axios.post("/api/create-new-user", data);
};

export const deleteUserService = async (userId) => {
    return axios.delete("/api/delete-user", {
        data: {
            id: userId,
        },
    });
};

export const editUserService = (inputData) => {
    return axios.put("/api/edit-user", inputData);
};

export const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`);
};

export const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};

export const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctor`, data);
};

export const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

export const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

export const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

export const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

export const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
