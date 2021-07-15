import React from 'react'
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { logout } from '../../actions/userActions';

const Header = ({ setSearch }) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		history.push('/');
	};
	
	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container>
				<Navbar.Brand>
					<Link to="/">Note Zipper</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				{ userInfo ? <Navbar.Collapse id="basic-navbar-nav">
					<Nav className="m-auto">
						<Form inline>
							<FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setSearch(e.target.value)}/>
						</Form>
					</Nav>
					<Nav>
						<Nav.Link>
							<Link to="/mynotes">My Notes</Link>
						</Nav.Link>
						<NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
							<NavDropdown.Item><Link to="/profile">My Profile</Link></NavDropdown.Item>
							<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse> : <Nav><Link to="/login" className="text-light">Login</Link></Nav>}
			</Container>
		</Navbar>
	)
}

export default Header