import './App.css';
import React from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistName: '',
			playlistTracks: []
		};

		// Bind event handlers
		this.addTrack = this.addTrack.bind(this);
	}

	addTrack(track) {
		// If track ID is not already in the playlist
		if (!this.state.playlistTracks.some(t => t.id === track.id)) {
			// Add track to playlist
			const newPlaylist = this.state.playlistTracks.concat([track]);
			this.setState({playlistTracks: newPlaylist});
		}
	}

	render() {
		return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					{/*<!-- Add a SearchBar component -->*/}
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
						<Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} />
					</div>
				</div>
			</div>
		);
	}
}
