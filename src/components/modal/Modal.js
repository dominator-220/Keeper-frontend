import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Modal.module.css';
import { getCookie } from '../helper/auth';
import axios from 'axios';
import Loading from '../Loading/Loading';

const Modal = (props) => {
	const { handleSubmit, register, errors } = useForm();
	const [spinner, setSpinner] = useState(false);
	const onSubmit = async (values, e) => {
		setSpinner(true);
		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${getCookie()}`,
			},
		};
		let response;
		e.preventDefault();
		if (props.edit) {
			console.log('yes');
			try {
				response = await axios.post(
					'https://my-keeper-backend-clone.herokuapp.com/api/note/edit',
					{
						id:props.id,
						title: values.title,
						description: values.description,
					},
					options
				);
			} catch (err) {
				setSpinner(false);
				console.log(err.response.data.message);
				return false;
			}
			if ((response.status = 200)) {
				setSpinner(false);
				props.closeModal();
				window.location.reload();
			} else {
				setSpinner(false);
			}
			return false;
		} 
		
		try {
			response = await axios.post(
				'https://my-keeper-backend-clone.herokuapp.com/api/note/create',
				{
					title: values.title,
					description: values.description,
				},
				options
			);
		} catch (err) {
			setSpinner(false);
			console.log(err.response.data.message);
			return false;
		}
		if ((response.status = 200)) {
			setSpinner(false);
			props.closeModal();
			window.location.reload();
		} else {
			setSpinner(false);
		}
	};

	const [editValues, setEditValues] = useState({
		title: props.title,
		description: props.description,
	});

	const handleChangeTitle = (e) => {
		// console.log(e);
		setEditValues({ ...editValues, title: e.target.value });
	};

	const handleChangeDescription = (e) => {
		setEditValues({ ...editValues, description: e.target.value });
	};

	const showAddForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						ref={register({
							required: 'Required',
						})}
						className={`form-control`}
						style={errors.title && { border: '1px solid red' }}
					/>
					<p className="text-danger" style={{ fontSize: '0.8rem' }}>
						{errors.title && errors.title.message}
					</p>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						name="description"
						ref={register({
							required: true,
							minLength: 5,
						})}
						className={`form-control`}
						style={errors.description && { border: '1px solid red' }}
					/>
					<p className="text-danger" style={{ fontSize: '0.8rem' }}>
						{errors.description && `Atleast 5 characters long`}
					</p>
				</div>
				<div className="form-group mx-auto text-center">
					<div>
						{props.add && <button className={`btn btn-outline-primary `}>Add</button>}
						{props.edit && <button className={`btn btn-outline-warning `}>Edit</button>}
						{props.delete && <button className={`btn btn-outline-danger `}>Delete</button>}
						<button
							className={`btn btn-outline-secondary ml-3`}
							onClick={() => {
								props.closeModal();
							}}
						>
							Cancel
						</button>
					</div>
					<div></div>
				</div>
			</form>
		);
	};

	const showEditForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						value={editValues.title}
						type="text"
						name="title"
						ref={register({
							required: 'Required',
						})}
						className={`form-control`}
						style={errors.title && { border: '1px solid red' }}
						onChange={handleChangeTitle}
					/>
					<p className="text-danger" style={{ fontSize: '0.8rem' }}>
						{errors.title && errors.title.message}
					</p>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<input
						value={editValues.description}
						type="text"
						name="description"
						ref={register({
							required: true,
							minLength: 5,
						})}
						className={`form-control`}
						onChange={handleChangeDescription}
						style={errors.description && { border: '1px solid red' }}
					/>
					<p className="text-danger" style={{ fontSize: '0.8rem' }}>
						{errors.description && `Atleast 5 characters long`}
					</p>
				</div>
				<div className="form-group mx-auto text-center">
					<div>
						{props.add && <button className={`btn btn-outline-primary `}>Add</button>}
						{props.edit && <button className={`btn btn-outline-warning `}>Edit</button>}
						{props.delete && <button className={`btn btn-outline-danger `}>Delete</button>}
						<button
							className={`btn btn-outline-secondary ml-3`}
							onClick={() => {
								props.closeModal();
							}}
						>
							Cancel
						</button>
					</div>
					<div></div>
				</div>
			</form>
		);
	};

	const confirmDelete = async (id) => {
		setSpinner(true);
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
			response = await axios.post(
				'https://my-keeper-backend-clone.herokuapp.com/api/note/delete',
				{
					id: props.id,
				},
				options
			);
		} catch (err) {
			setSpinner(false);
			console.log(err.response.data.message);
			return false;
		}
		if ((response.status = 200)) {
			setSpinner(false);
			props.closeModal();
			window.location.reload();
		} else {
			setSpinner(false);
		}
	};

	const showDeleteModal = () => {
		return (
			<div className="text-center">
				<p>Are you sure you want to delete the note</p>
				{props.delete && (
					<button className={`btn btn-outline-danger`} onClick={() => confirmDelete(props.id)}>
						Delete
					</button>
				)}
				<button
					className={`btn btn-outline-secondary ml-3`}
					onClick={() => {
						props.closeModal();
					}}
				>
					Cancel
				</button>
			</div>
		);
	};

	return (
		<div className={`${styles.backdrop}`}>
			{spinner && <Loading />}
			<div className={`card`}>
				<div className={`card-header`} style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
					{props.add && 'Add'}
					{props.edit && 'Edit'}
					{props.delete && 'Delete'}
				</div>
				<div className="card-body">
					{props.add && showAddForm()}
					{props.edit && showEditForm()}
					{props.delete && showDeleteModal()}
				</div>
			</div>
		</div>
	);
};

export default Modal;
