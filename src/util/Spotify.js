const clientId = '75c552e1b9104a95a609e654a1828962';
const redirectUri = 'http://localhost:3000/';

let userAccessToken = '';

const Spotify = {
	getAccessToken() {
		if (userAccessToken)
			return userAccessToken;

		const matches = window.location.href.match(/access_token=([^&]*)/);
		if (matches) {
			userAccessToken = matches[1];
		}
		
		if (userAccessToken) {
			const expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
		}

		return userAccessToken;
	},

	search(term) {
		if (!this.getAccessToken())
			return Promise.reject('Waiting for access token refresh');

		return fetch(
			`https://api.spotify.com/v1/search?type=track&q=${term}`,
			{
				headers: {
					'Authorization': `Bearer ${userAccessToken}`,
					'Content-Type': 'application/json'
				}
			}
		)
			.then(response => {
				if (response.ok)
					return response.json();

				return Promise.reject('Bad request');
			})
			.then(jsonResponse => {
				console.log(jsonResponse);
				const tracks = jsonResponse.tracks.items.map(track => {
					return {
						id: track.id,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name,
						uri: track.uri
					};
				});
				return tracks;
			});
	},

	savePlaylist(name, trackUris) {
		if (!name || !trackUris)
			return;

		const token = this.getAccessToken();
		const headers = {
			'Authorization': `Bearer ${token}`
		};
		let userId = '';

		return fetch('https://api.spotify.com/v1/me', {
			headers: headers
		})
			.then(response => response.json())
			.then(jsonResponse => {
				userId = jsonResponse.id;
			})
			.then(() => {
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					method: 'POST',
					headers: headers,
					body: JSON.stringify({
						name: name
					})
				});
			})
			.then(response => response.json())
			.then(jsonResponse => {
				return jsonResponse.id;
			})
			.then(playlistId => {
				return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
					method: 'POST',
					headers: headers,
					body: JSON.stringify({
						uris: trackUris
					})
				});
			});
	}
};

export default Spotify;
