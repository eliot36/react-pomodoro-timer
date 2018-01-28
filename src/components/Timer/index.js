import React, { Component } from 'react';
import Progress from '../Progress';
import Display from '../Display';
import Control from '../Control';
import Alarm from '../Alarm';

import { connect } from 'react-redux'
import * as actions from '../../actions';
import './Timer.css';

class Timer extends Component {
	render() {
		const { timerMaxSize, isAlarm } = this.props,
		size = timerMaxSize * 16; // em -> px

		return (
			<div className="Timer" style={{height: size, width: size}}>
				<Progress
					work={this.props.isWork}
					workColor={this.props.workColor}
					breakColor={this.props.breakColor}
					timerDuration={this.props.timerDuration}
					elapsedTime={this.props.elapsedTime}
					maxSize={this.props.timerMaxSize}
					strokeSize={this.props.timerStrokeSize}

				/>

				<div className="Timer-itself" style={{display: `${(isAlarm) ? 'none' : 'block'}`}}>
					<Display
						play={this.props.isPlaying}
						work={this.props.isWork}
						maxTime={this.props.maxTime}
						minTime={this.props.minTime}
						workColor={this.props.workColor}
						breakColor={this.props.breakColor}
						timerDuration={this.props.timerDuration}
						elapsedTime={this.props.elapsedTime}
						startTimer={this.props.startTimer}
						pauseTimer={this.props.pauseTimer}
						resetTimer={this.props.resetTimer}
						elapseTimer={this.props.elapseTimer}
						alarmTimer={this.props.alarmTimer}
						switchTimer={this.props.switchTimer}
						setIntvalTimer={this.props.setIntvalTimer}
					/>

					<Control
						play={this.props.isPlaying}
						active={this.props.isInit}
						startTimer={this.props.startTimer}
						pauseTimer={this.props.pauseTimer}
						resetTimer={this.props.resetTimer}
					/>
				</div>
				
				<Alarm
					isAlarm={this.props.isAlarm}
					play={this.props.isPlaying}
					size={this.props.timerMaxSize}
					resetTimer={this.props.resetTimer}
					alarmTimer={this.props.alarmTimer}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {	
		isPlaying: state.control.is_Playing,
		isAlarm: state.control.is_Alarm,
		isInit: state.control.is_Init,
		elapsedTime: state.control.elapsed_time,
		timerDuration: state.control.timer_duration,
		timerMaxSize: state.control.timer_max_size,
		timerStrokeSize: state.control.timer_stroke_size,
		isWork: state.control.is_Work,
		maxTime: state.control.max_time,
		minTime: state.control.min_time,
		workColor: state.display.work_color,
		breakColor: state.display.break_color
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		startTimer: () => {dispatch(actions.start_timer())},
		pauseTimer: () => {dispatch(actions.pause_timer())},
		resetTimer: () => {dispatch(actions.reset_timer())},
		elapseTimer: () => {dispatch(actions.elapse_timer())},
		switchTimer: (sort) => {dispatch(actions.switch_timer(sort))},
		setIntvalTimer: (time) => {dispatch(actions.set_intval_timer(time))},
		alarmTimer: () => {dispatch(actions.alarm_timer())}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);