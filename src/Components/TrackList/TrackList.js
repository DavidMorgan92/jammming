import './TrackList.css';
import React from 'react';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
	render() {
		const tracks = this.props.tracks.map(
			track => <Track
				key={track.id}
				track={track}
				onAdd={this.props.onAdd}
				onRemove={this.props.onRemove}
				isRemoval={this.props.isRemoval}
				onClick={this.props.onTrackClick}
			/>
		);

		return (
			<div className="TrackList">
				{tracks}
			</div>
		);
	}
}
