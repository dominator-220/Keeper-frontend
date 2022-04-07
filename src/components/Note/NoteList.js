import React, { useState, useEffect } from 'react';
import Note from './Note';
import Modal from '../modal/Modal';
import axios from 'axios';
import { getCookie } from '../helper/auth';
import Loading from '../Loading/Loading';

const NoteList = (props) => {
	const [notes, setNotes] = useState([]);
	const [spinner, setSpinner] = useState(false);
	const [message, setMessage] = useState(false);
	const [resperror, setResperror] = useState(false);
	const [addModa, setAddModa] = useState(false);

	useEffect(() => {
		if (props.isLoggedIn) {
			setSpinner(true);
			showAllNotes();
		} else {
		}
	}, [props.isLoggedIn, showAllNotes]);

	const closeModal = () => {
		setAddModa(false);
	};

	const showAllNotes = async () => {
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${getCookie()}`,
			},
		};
		let response;
		try {
			response = await axios.get('https://my-keeper-backend-clone.herokuapp.com/api/note/all', options);
		} catch (err) {
			setSpinner(false);
			console.log(message)
			setMessage(false);
			setResperror(`${err.response.data.message}`);
			console.log(err.response.data.message);
			console.log(err);
			return false;
		}
		if ((response.status = 200)) {
			// console.log(response);
			setSpinner(false);
			setResperror(false);
			// cookie.set('token', response.data.token, { expiresIn: '4h' });
			setNotes(response.data.notes);
		} else {
			console.log(response);
			setSpinner(false);
			setResperror(`${response.data.message}`);
			console.log(resperror)
		}
	};

	return (
		<div className="row pt-3">
			{addModa && <Modal add closeModal={closeModal} />}
			{spinner && <Loading />}
			<div className="pt-3 text-center">{!props.isLoggedIn && <div>Not Logged in</div>}</div>

			{props.isLoggedIn && (
				<>
					<div className="col-12 text-center pb-3" onClick={() => setAddModa(true)}>
						<button className="btn btn-outline-secondary">Add a note</button>
					</div>
					{notes.map((note) => {
						return (
							<div key={note._id} className="col-lg-3 col-md-4 col-sm-12">
								<Note heading={note.title} description={note.description} id={note._id} />
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default NoteList;
