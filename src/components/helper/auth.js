import cookie from 'js-cookie';

export const setCookie = (token) => {
	cookie.set('token', token, { expiresIn: '4h' });
};

export const getCookie = () => {
	return cookie.get('token');
};

export const removeCookie = () => {
	cookie.remove('token');
};

export const authenticate = () => {
	if (getCookie()) {
		return true;
	} else {
		return false;
	}
};
