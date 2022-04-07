import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authenticate, removeCookie } from './helper/auth';
import { AuthContext } from './context/auth-context';

function Header(props) {
	const history = useHistory();
	const auth = useContext(AuthContext);

	const logoutUser = () => {
		auth.logout();
		history.push('/login');
	};
	return (
		<header>
			<Link to="/" className="main-page-link">
				Keeper App
			</Link>
			<span>
				{!props.isLoggedIn && (
					<Link to="/login" style={{ textDecoration: 'none' }} className="header-link">
						Login
					</Link>
				)}
				{props.isLoggedIn && (
					<button className="btn btn-outline-dark" onClick={logoutUser}>
						Logout
					</button>
				)}
			</span>
		</header>
	);
}

export default Header;
