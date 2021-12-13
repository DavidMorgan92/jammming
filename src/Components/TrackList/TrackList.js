import './TrackList.css';
import React from 'react';

export class TrackList extends React.Component {
	render() {
		const tracks = this.props.tracks.map(
			track => {
				return (
					<div key={track.id}>
						{track.name}
					</div>
				);
			}
		);

		return (
			<div className="TrackList">
				{tracks}
			</div>
		);
	}
}
