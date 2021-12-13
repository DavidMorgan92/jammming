import './TrackList.css';
import React from 'react';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
	render() {
		const tracks = this.props.tracks.map(
			track => <Track track={track} onAdd={this.props.onAdd} />
		);

		return (
			<div className="TrackList">
				{tracks}
			</div>
		);
	}
}
