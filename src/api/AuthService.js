import Axios from 'axios';
class mockAuthServiceApi {

	static logout() {
		return new Promise((resolve, reject) => {
			try {
				localStorage.removeItem('auth_user');
				resolve('Logged Out Successfully');
			} catch (err) {
				reject(err);
			}
		});
	}

	static authenticated() {
		if (localStorage['auth_user']) {
			return true;
		}
		else {
			return false;
		}
	}

	static authenticate(userId, password) {
		return new Promise((resolve, reject) => {
			try {
				Axios.post('http://localhost:3000/checkCredential', {
					userid: userId,
					password: password
				}).then(function (response) {
					if(!response.success)
						resolve(response);
					else
						resolve('Invalid Credential');
				}).catch(function (error) {
					reject(error);
				});
			} catch(err) {
				reject(err);
			}
		});
	}

}

export default mockAuthServiceApi;
