import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from "../../components/MainScreen";
import "./LoginPage.css";
// import axios from "axios";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../actions/userActions';

const LoginPage = () => {
	let history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const userLogin = useSelector(state => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push("/mynotes");
		}
	}, [history, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		// try {
		// 	setError(false);
		// 	const config = {
		// 		headers: {
		// 			"Content-type":"application/json"
		// 		}
		// 	}
		// 	setLoading(true);
		// 	const { data } = await axios.post('/api/users/login', {
		// 		email, password
		// 	}, config);
		// 	console.log(data);
		// 	localStorage.setItem('userInfo', JSON.stringify(data));
		// 	setLoading(false);
		// } catch (error) {
		// 	setError(error.response.data.message);
		// 	setLoading(false);
		// }
	};

	return (
		<MainScreen title="LOGIN">
			<div className="loginContainer">
				{ loading && <Loading/> }
				{ error && <ErrorMessage variant="danger">{error}</ErrorMessage> }
				<Form onSubmit={submitHandler}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" value={email || ""} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
						<Form.Text className="text-muted">
						We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" value={password || ""} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
				<br/>
				<Row>
					<Col>
						New Customer? <Link to="/register" className="text-primary">Click here to register</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	)
}

export default LoginPage
