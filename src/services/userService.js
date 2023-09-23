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

export const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};

export const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};

// Specialty
export const getAllSpecialty = () => {
    return axios.get("/api/get-all-specialty");
};

export const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};

export const updateSpecialty = (data) => {
    return axios.put("/api/update-specialty", data);
};

export const deleteSpecialty = (specialtyId) => {
    return axios.delete(`/api/delete-specialty?id=${specialtyId}`);
};

export const getAllDetailSpecialtyById = (data) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
};

// Clinic
export const getAllClinic = () => {
    return axios.get("/api/get-all-clinic");
};

export const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};

export const updateClinic = (data) => {
    return axios.put("/api/update-clinic", data);
};

export const deleteClinic = (clinicId) => {
    return axios.delete(`/api/delete-clinic?id=${clinicId}`);
};

export const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

export const getAllPatientForDoctor = (data) => {
    return axios.get(
        `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
    );
};

export const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export const getAllHandbook = () => {
    return axios.get(`/api/get-all-handbook`);
};

export const createNewHandbook = (data) => {
    return axios.post(`/api/create-new-handbook`, data);
};

export const editHandbook = (data) => {
    return axios.put(`/api/edit-handbook`, data);
};

export const deleteHandbook = (handBookId) => {
    return axios.delete(`/api/delete-handbook?id=${handBookId}`);
};

export const getDetailHandbookById = (handBookId) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${handBookId}`);
};
