import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    potitions: [],
    roles: [],
    users: [],
    topDoctors: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true,
            };

        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.data,
                isLoadingGender: false,
            };

        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                isLoadingGender: false,
            };

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
            };

        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.data,
            };

        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
            };

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
            };

        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.data,
            };

        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            return {
                ...state,
                users: action.users,
            };

        case actionTypes.FETCH_ALL_USER_FAILED:
            return {
                ...state,
            };

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            return {
                ...state,
                topDoctors: action.dataDoctors,
            };

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            return {
                ...state,
            };

        default:
            return {
                ...state,
            };
    }
};

export default adminReducer;
