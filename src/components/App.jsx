import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './auth/Login';
import Signup from './auth/Signup';
import NoteList from './Note/NoteList';
import { AuthContext } from './context/auth-context';
import { setCookie, removeCookie, authenticate } from './helper/auth';

function App() {
	const [token, setToken] = useState(authenticate());
	const login = (token) => {
		setCookie(token);
		setToken(authenticate());
	};
	const logout = () => {
		removeCookie();

		setToken(authenticate());
	};

	return (
		<AuthContext.Provider
			value={{
				token: token,
				login: login,
				logout: logout,
			}}
		>
			<BrowserRouter>
				<Header isLoggedIn={token}></Header>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
				<NoteList isLoggedIn={token} />
				<Footer></Footer>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
