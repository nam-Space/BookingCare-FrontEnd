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
