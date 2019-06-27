import React from 'react';
import ListToggle from './ListToggle';

const Item = (props) => {
		return (
			<div className="Item" style={{backgroundImage: 'url(' + this.props.backdrop + ')'}} >
				<div className="overlay">
					<div className="title">{this.props.title}</div>
					<div className="rating">{this.props.score} / 10</div>
					<div className="plot">{this.props.overview}</div>
					<ListToggle />
				</div>
			</div>
		);
	}

	export default Item;