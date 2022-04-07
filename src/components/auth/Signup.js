import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Loading from '../Loading/Loading';

import styles from './Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
	const { handleSubmit, register, errors, watch } = useForm();
	const [spinner, setSpinner] = useState(false);
	const [message, setMessage] = useState(false);
	const [resperror, setResperror] = useState(false);
	const history = useHistory();
	const onSubmit = async (values, e) => {
		e.preventDefault();
		// console.log(values.email);
		setSpinner(true);
		let response;

		const options = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		};
		try {
			response = await axios.post(
				'https://my-keeper-backend-clone.herokuapp.com/api/signup',
				{
					email: values.email,
					password: values.password,
				},
				options
			);
		} catch (err) {
			setSpinner(false);
			setMessage(false);
			setResperror(`${err.response.data.message}`);
			console.log(err.response.data.message);
			return false;
		}
		if ((response.status = 200)) {
			setSpinner(false);
			setResperror(false);
			setMessage(`${response.data.message}. Will be redirected to login page shortly`);
			setTimeout(() => {
				history.push('/login');
			}, 2000);
		} else {
			setSpinner(false);
			setResperror(`${response.data.message}`);
		}
	};
	const showForm = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						placeholder="example@mysite.com"
						ref={register({
							required: 'Required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'invalid email address',
							},
						})}
						className={`form-control`}
						style={errors.email && { border: '1px solid red' }}
						autoComplete="off"
					/>
					<p className="text-danger" style={{ fontSize: '0.8rem' }}>
						{errors.email && errors.email.message}
					</p>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						ref={register({
							required: true,
							minLength: 5,
						})}
						placeholder="Must be at least 5 charcters long"
						className={`form-control`}
						style={errors.password && { border: '1px solid red' }}
					/>
					<p className="text-danger" style={{ fontSize: '0.8rem' }}>
						{errors.password && `Atleast 5 characters long`}
					</p>
				</div>
				<div className="form-group">
					<label htmlFor="cpassword">Confirm Password</label>
					<input
						type="password"
						name="cpassword"
						className={`form-control`}
						id="cpassword"
						placeholder="******"
						ref={register({ validate: (value) => value === watch('password') })}
						style={errors.cpassword && { border: '1px solid red' }}
					/>
					<p className={`text-danger`} style={{ fontSize: '0.8rem' }}>
						{errors.cpassword && 'Passwords do not match'}
					</p>
				</div>
				<div className="form-group mx-auto text-center">
					<div>
						<button className={`btn btn-outline-secondary ${styles.customformbutton}`}>Sign Up</button>
					</div>
				</div>
			</form>
		);
	};

	return (
		<>
			<div className="row pt-3">
				<div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
					{resperror && (
						<div className="alert alert-danger">
							<p className="text-danger">{resperror}</p>
						</div>
					)}
					{message && (
						<div className="alert alert-success">
							<p className="text-success">{message}</p>
						</div>
					)}
				</div>
			</div>
			<div className="row">
				{spinner && <Loading />}
				<div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
					<div className={`${styles.loginform} form-group pt-5`}>{showForm()}</div>
					<div className="text-center">
						Already Registered
						<br />
						<Link to="/login" className={`${styles.formswitchlinks}`}>
							Login{' '}
						</Link>
						Instead
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
