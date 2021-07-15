import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
	return (
		<div className="main">
			<Container>
				<Row>
					<div className="intro-text">
						<div>
							<h1 className="title">Welcome to <br/> Note Zipper</h1>
							<p className="subtitle">One safe place for all your notes</p>
							<div className="buttonContainer">
								<Link to="/login"><Button size="lg" className="landingButton">Login</Button></Link>
								<a href="/register"><Button size="lg" className="landingButton" variant="outline-primary">Sign Up</Button></a>
							</div>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	)
}

export default LandingPage
