import './Track.css';
import React from 'react';

export class Track extends React.Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	renderAction() {
		const addButton = <button className='Track-action' onClick={this.addTrack}>+</button>;
		const removeButton = <button className='Track-action' onClick={this.removeTrack}>-</button>;

		return this.props.isRemoval ? removeButton : addButton;
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	handleClick() {
		this.props.onClick(this.props.track);
	}

	render() {
		return (
			<div className="Track">
				<div className="Track-information" onClick={this.handleClick}>
					<h3>{this.props.track.name}</h3>
					<p>{this.props.track.artist} | {this.props.track.album}</p>
				</div>
				{this.renderAction()}
			</div>
		);
	}
}
