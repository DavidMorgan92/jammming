const clientId = '75c552e1b9104a95a609e654a1828962';
const redirectUri = 'http://localhost:3000/';

let userAccessToken = '';

const Spotify = {
	getAccessToken() {
		if (userAccessToken)
			return userAccessToken;

		userAccessToken = window.location.href.match(/access_token([^&]*)/);
		
		if (userAccessToken) {
			const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
			window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
		}

		return userAccessToken;
	}
};

export default Spotify;
