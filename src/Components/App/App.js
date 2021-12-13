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
	}

	render() {
		return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					{/*<!-- Add a SearchBar component -->*/}
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} />
						<Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} />
					</div>
				</div>
			</div>
		);
	}
}
