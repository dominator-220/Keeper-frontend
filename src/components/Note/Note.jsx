import React, { useState } from 'react';
import styles from './Note.module.css';
import Modal from '../modal/Modal';

const Note = (props) => {
	const [showModal, setShowModal] = useState({
		add: false,
		edit: false,
		delete: false,
	});

	const openDeleteModal = () => {
		setShowModal({ add: false, edit: false, delete: true });
	};
	const openEditModal = () => {
		setShowModal({ add: false, edit: true, delete: false });
	};

	const closeModal = () => {
		setShowModal({ add: false, edit: false, delete: false });
	};

	return (
		<div className={`card ${styles.notefont}`}>
			{showModal.delete && <Modal delete closeModal={closeModal} id={props.id} />}
			{showModal.add && <Modal add id={props.id} />}
			{showModal.edit && (
				<Modal
					edit
					id={props.id}
					title={props.heading}
					description={props.description}
					closeModal={closeModal}
				/>
			)}
			<div className={`card-header ${styles.noteheading}`}>{props.heading || 'Default heading'}</div>
			<div className="card-body">{props.description || 'Default description'}</div>
			<p className="d-flex justify-content-between">
				<div
					className="text-warning btn"
					onClick={() => {
						openEditModal();
					}}
				>
					Edit
				</div>
				<div
					className="text-danger btn"
					onClick={() => {
						openDeleteModal();
					}}
				>
					Delete
				</div>
			</p>
		</div>
	);
};

export default Note;
