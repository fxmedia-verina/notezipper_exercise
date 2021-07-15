import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_PASS_FAIL, USER_REGISTER_PASS_REQUEST, USER_REGISTER_PASS_SUCCESS, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS} from "../constants/userConstants";

export const userLoginReducer = (state={}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading:true };
		case USER_LOGIN_SUCCESS:
			return { loading:false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading:false, error: action.payload };
		case USER_LOGOUT:
			return { };
		default:
			return state;
	}
}

export const userRegisterReducer = (state={}, action) => {
	switch (action.type) {
		case USER_REGISTER_SUCCESS:
			return { loading:false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading:false, error: action.payload };
		case USER_REGISTER_PASS_REQUEST:
			return { loading:true, error:false, message:null };
		case USER_REGISTER_PASS_SUCCESS:
			return { dataImage: action.payload };
		case USER_REGISTER_PASS_FAIL:
			return { loading:false, message:"Password do not match !" };
		default:
			return state;
	}
}

export const userUpdateReducer = (state={}, action) => {
	switch (action.type) {
		case USER_PROFILE_REQUEST:
			return { success:false };
		case USER_UPDATE_REQUEST:
			return { loading:true };
		case USER_UPDATE_SUCCESS:
			return { loading:false, userInfo: action.payload, success:true };
		case USER_UPDATE_FAIL:
			return { loading:false, error: action.payload, success:false };
		default:
			return state;
	}
}