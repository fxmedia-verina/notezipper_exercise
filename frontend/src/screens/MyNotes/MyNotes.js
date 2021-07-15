// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
// import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from '../../actions/noteActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = ({ search }) => {
	let history = useHistory();
	const dispatch = useDispatch();
	const noteList = useSelector(state => state.noteList);
	const { loading, notes, error } = noteList;
	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;
	const noteCreate = useSelector((state) => state.noteCreate);
	// eslint-disable-next-line
	const { success: successCreate } = noteCreate;
	const noteDelete = useSelector((state) => state.noteDelete);
  	const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

	// const [notes, setNotes] = useState([]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteNoteAction(id));
		}
	};

	// const fetchNotes = async() => {
	// 	const {data} = await axios.get('/api/notes');
	// 	setNotes(data);
	// };
	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		}
		dispatch(listNotes());
		// fetchNotes();
	}, [dispatch, userInfo, history, successCreate, successDelete])
	
	return (
		<MainScreen title={`Welcome Back ${userInfo?.name}...`}>
			<Link to="/createnote">
				<Button style={{marginLeft:10, marginBottom:6}} size="lg">Create New Note</Button>
			</Link>
			{loadingDelete && <Loading />}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
			{ loading && <Loading/> }
			{ error && <ErrorMessage variant="danger">{error}</ErrorMessage> }
			{
				notes?.reverse().filter((filteredNote) => filteredNote.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
					<Accordion key={note._id}>
						<Card style={{margin:10}}>
							<Card.Header style={{display:"flex"}}>
								<span style={{color:"black", textDecoration:'none', flex:1, cursor:"pointer", alignSelf:"center", fontSize:18}}>
									<Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
									{note.title}
									</Accordion.Toggle>
								</span>
								<div>
									<Link to={'/note/'+note._id}><Button>Edit</Button></Link>
									<Button variant="danger" className='mx-2' onClick={()=>deleteHandler(note._id)}>Delete</Button>
								</div>
							</Card.Header>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									<h4><Badge variant="success">Category - {note.category}</Badge></h4>
									<blockquote className="blockquote mb-0">
										<p>
											{note.content}
										</p>
										<footer className="blockquote-footer">
											Created On - <cite title="Source Title">{note.createdAt.substring(0, 10)}</cite>
										</footer>
									</blockquote>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				))
			}
		</MainScreen>
	)
}

export default MyNotes