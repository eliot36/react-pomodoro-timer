import React, { Component } from 'react';
import Bell from '../../assets/bell.png'
import AlarmBeep from '../../assets/alarm.ogg'
import './Alarm.css';

class Alarm extends Component {
	render() {
		const { size, isAlarm, alarmTimer } = this.props;

		return (
			<div className="Alarm" onClick={alarmTimer} style={{display: `${(!isAlarm) ? 'none' : 'block'}`}}>
				{/* Alarm label */}
				<img className="alarm-bell" src={Bell} alt="Bell" title="Stop beeping"
					style={{
						width: `${size}em`,
						height: `${size}em`
					}}/>
				
				{/* Alarm beeping */}
				<audio id="alarm-sound">
					<source src={AlarmBeep} type="audio/ogg"/>
				</audio>
			</div>
		);
	}
}

export default Alarm;