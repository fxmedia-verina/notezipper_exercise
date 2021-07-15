import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import MainScreen from '../../components/MainScreen'
// import axios from "axios";
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { checkPassUploadPic, register } from '../../actions/userActions';
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	// const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(false);
	const resettingRef = useRef(false);
	const dispatch = useDispatch();
	const userRegister = useSelector(state => state.userRegister);
	const { loading, error, dataImage, message, userInfo } = userRegister;
	let history = useHistory();
	useEffect(() => {
		if (userInfo) {
			history.push("/mynotes");
		}
	}, [history, userInfo]);

	useEffect(() => {
		// const submitDataToServer = async(e) => {
		// 	const config = {
		// 		headers: {
		// 			"Content-type":"application/json"
		// 		}
		// 	}
		// 	const { data } = await axios.post('/api/users', {
		// 		name, pic, email, password
		// 	}, config);
		// 	localStorage.setItem('userInfo', JSON.stringify(data));
		// 	setLoading(false);
		// };

		if (resettingRef.current) {
			resettingRef.current = false;
			dispatch(register(name, email, password, pic));
			// submitDataToServer();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pic])

	useEffect(() => {
		if (dataImage !== undefined && message == null) {
			resettingRef.current = true;
			setPic(dataImage.url.toString());	
		}
	}, [dataImage, message])

	const submitHandler = async (e) => {
		e.preventDefault();
		await dispatch(checkPassUploadPic(password, confirmpassword, pic));
		// try {
		// 	if (password !== confirmpassword) {
		// 		setMessage("Password do not match !");
		// 	} else {
		// 		setMessage(null);
		// 		setError(false);
		// 		setLoading(true);
		// 		const upload = new FormData();
		// 		upload.append("file", pic);
		// 		upload.append("upload_preset", "notezipper");
		// 		upload.append("cloud_name", "peyinperjo");
		// 		let response = await fetch('https://api.cloudinary.com/v1_1/peyinperjo/image/upload', {
		// 			method: "POST",
		// 			body: upload,
		// 		});
		// 		let dataImage = await response.json();
		// 		resettingRef.current = true;
		// 		setPic(dataImage.url.toString());
		// 	}	
		// } catch (error) {
		// 	setError(error.response.data.message);
		// 	setLoading(false);
		// }
	};

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png") {
			setPic(pics);
		} else {
			return setPicMessage("Image Format Must Be in JPG / PNG");
		}
	};

	return (
		<MainScreen title="REGISTER">
			<div className="loginContainer">
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{message && <ErrorMessage variant="warning">{message}</ErrorMessage>}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
						type="name"
						value={name || ""}
						placeholder="Enter name"
						onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
						type="email"
						value={email || ""}
						placeholder="Enter email"
						onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
						type="password"
						value={password || ""}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
						type="password"
						value={confirmpassword || ""}
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					{picMessage && (
						<ErrorMessage variant="warning">{picMessage}</ErrorMessage>
					)}
					<Form.Group controlId="pic">
						<Form.Label>Profile Picture</Form.Label>
						<Form.File
						onChange={(e) => postDetails(e.target.files[0])}
						id="custom-file"
						type="image"
						label="Upload Profile Picture"
						custom
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Register
					</Button>
				</Form>
				<br/>
				<Row>
					<Col>
						Have an Account ? <Link to="/login" className="text-primary">Login</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	)
}

export default RegisterPage