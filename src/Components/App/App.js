import './App.css';
import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { SamplePlayer } from '../SamplePlayer/SamplePlayer';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistName: 'New Playlist',
			playlistTracks: []
		};

		// Bind event handlers
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
	}

	addTrack(track) {
		// If track ID is not already in the playlist
		if (!this.state.playlistTracks.some(t => t.id === track.id)) {
			// Add track to playlist
			const newPlaylist = this.state.playlistTracks.concat([track]);
			this.setState({playlistTracks: newPlaylist});
		}
	}

	removeTrack(track) {
		// Remove track with given ID from playlist
		const newPlaylist = this.state.playlistTracks.filter(t => t.id !== track.id);
		this.setState({playlistTracks: newPlaylist});
	}

	updatePlaylistName(name) {
		this.setState({playlistName: name});
	}

	savePlaylist() {
		const trackUris = this.state.playlistTracks.map(t => t.uri);
		Spotify.savePlaylist(this.state.playlistName, trackUris)
			.then(() => {
				this.setState({
					playlistName: 'New Playlist',
					playlistTracks: []
				});
			});
	}

	search(searchTerm) {
		Spotify.search(searchTerm)
			.then(tracks => {
				this.setState({searchResults: tracks});
			})
			.catch(reason => {
				console.log(reason);
			});
	}

	render() {
		return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<SamplePlayer />
					<div className="App-playlist">
						<SearchResults
							searchResults={this.state.searchResults}
							onAdd={this.addTrack}
							onSearch={this.search}
						/>
						<Playlist
							name={this.state.playlistName}
							tracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onNameChange={this.updatePlaylistName}
							onSave={this.savePlaylist}
						/>
					</div>
				</div>
			</div>
		);
	}
}
