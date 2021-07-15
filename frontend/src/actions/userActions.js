import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_PASS_FAIL, USER_REGISTER_PASS_REQUEST, USER_REGISTER_PASS_SUCCESS, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const config = {
			headers: {
				"Content-type":"application/json"
			}
		};
		const { data } = await axios.post('/api/users/login', {
			email, password
		}, config);
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ 
			type: USER_LOGIN_FAIL,
			payload: 
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		 });
	}
}

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
}

export const checkPassUploadPic = (password, confirmPassword, pic) => async (dispatch) => {
	if (password === confirmPassword){
		dispatch({ type: USER_REGISTER_PASS_REQUEST });
		const upload = new FormData();
		upload.append("file", pic);
		upload.append("upload_preset", "notezipper");
		upload.append("cloud_name", "peyinperjo");
		let response = await fetch('https://api.cloudinary.com/v1_1/peyinperjo/image/upload', {
			method: "POST",
			body: upload,
		});
		let dataImage = await response.json();
		dispatch({ type: USER_REGISTER_PASS_SUCCESS, payload:dataImage });
	} else {
		dispatch({ type: USER_REGISTER_PASS_FAIL });
	}
}

export const register = (name, email, password, pic) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-type":"application/json"
			}
		};
		const { data } = await axios.post('/api/users', {
			name, pic, email, password
		}, config);
		dispatch({ type: USER_REGISTER_SUCCESS, payload:data });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({ 
			type: USER_REGISTER_FAIL,
			payload: 
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		 });
	}
}

export const updateProfile = (user) => async (dispatch, getState) => {
	try {
	  dispatch({ type: USER_UPDATE_REQUEST });
  
	  const {
		userLogin: { userInfo },
	  } = getState();
  
	  const config = {
		headers: {
		  "Content-Type": "application/json",
		  Authorization: `Bearer ${userInfo.token}`,
		},
	  };
  
	  const { data } = await axios.post("/api/users/profile", user, config);
  
	  dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
	  dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
	  localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
	  dispatch({
		type: USER_UPDATE_FAIL,
		payload:
		  error.response && error.response.data.message
			? error.response.data.message
			: error.message,
	  });
	}
  };

export const showProfile = () => async (dispatch) => {
	dispatch({ type: USER_PROFILE_REQUEST });
}