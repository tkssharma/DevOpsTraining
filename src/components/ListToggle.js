import React,{useState} from 'react';

const ListToggle = (props) => {

	const [toggled, setToggled] = useState(false);
	const handleClick = () => {
		if(this.state.toggled === true) {
			this.setState({ toggled: false });
		} else {
			this.setState({ toggled: true });	
		}	
	}
		return (
			<div onClick={handleClick} data-toggled={toggled} className="ListToggle">
				<div>
					<i className="fa fa-fw fa-plus"></i>
					<i className="fa fa-fw fa-check"></i>
				</div>
			</div>
		);
}

export default  ListToggle;