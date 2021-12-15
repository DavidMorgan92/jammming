import './SamplePlayer.css';
import React from 'react';

export class SamplePlayer extends React.Component {
	render() {
		return (
			<div className="SamplePlayer">
				<audio autoplay controls src={this.props.src} />
			</div>
		);
	}
}
