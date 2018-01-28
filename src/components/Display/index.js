import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: timeFormat(props.timerDuration - props.elapsedTime),
			error_range: false
		}

		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	render() {
		const { timerDuration, elapsedTime, switchTimer, play, work, workColor, breakColor } = this.props;
		
		return (
			<div className="Display">
				{/* Dynamic Title based on the time */}
				<title>({timeFormat(timerDuration - elapsedTime)}) - Pomodoro Timer</title>

				<div className="input">
					{/* Timer display and input */}
					<textarea name="user_input" cols="5" rows="1"
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						onKeyDown={this.handleKeyDown}
						onChange={this.handleChange}
						value={this.state.display}
						disabled={play}
						style={{
							cursor: `${(play) ? 'default' : 'text'}`
						}}>
					</textarea>

					{/* Error Msg  */}
					<div className="error-msg">
						{ this.state.error_range &&
						(<pre>Please enter between {this.props.minTime} - {this.props.maxTime} minutes</pre>) }
					</div>

					{/* Switch button: Work, Break  */}
					<div className="timer-switcher">
						<p
							onClick={() => switchTimer(true)}
							style={{
								borderBottom: `${(work) ? `2px solid ${workColor}`: `none`}`,
								cursor: `${(!play) ? 'pointer' : 'default'}`
							}}>
							Work
						</p>
						<p
							onClick={() => switchTimer(false)}
							style={{
								borderBottom: `${(!work) ? `2px solid ${breakColor}`: `none`}`,
								cursor: `${(!play) ? 'pointer' : 'default'}`
							}}>
							Break
						</p>
					</div>
				</div>
			</div>
		);
	}

	/* Timer switch and count handler by getting nextProps */
	componentWillReceiveProps(nextProps) {
		timerHandler(this, nextProps);
		switchHandler(this, nextProps);
	}

	/* Convert timer display mm:ss to mm */
	handleFocus() {
		this.setState({
			display: this.props.timerDuration / 60
		})
	}

	/* Submit modified time when focus out input*/
	handleBlur(event) {
		intvalSubmitHandler(this);

		this.setState({
			display: timeFormat(this.props.timerDuration - this.props.elapsedTime)
		})
	}

	/* Catch input changes */
	handleChange(event) {
		const { maxTime, minTime } = this.props,
		currVal = parseInt(event.target.value, 10);
		
		if(currVal < minTime || isNaN(currVal)) {
			this.setState({
				display: minTime,
				error_range: true
			});
		}else if(currVal > maxTime) {
			this.setState({
				display: maxTime,
				error_range: true
			});
		}else{
			this.setState({
				display: event.target.value,
				error_range: false
			});
		}
	}

	/* Catch key input */
	handleKeyDown(event) {
		const { maxTime, minTime } = this.props,
			input = event.key, currVal = parseInt(event.target.value, 10),
			allowedKey = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];

		if(input === "ArrowUp" || input === "+") { // Increase timer
			event.preventDefault(); 
			(currVal < maxTime) ? this.setState({ display: parseInt(this.state.display, 10) + 1, error_range: false }) : this.setState({ error_range: true });

		}else if(input === "ArrowDown" || input === "-") { // Decrease timer
			event.preventDefault();
			(currVal > minTime) ? this.setState({ display: parseInt(this.state.display, 10) - 1, error_range: false }) : this.setState({ error_range: true });

		}else if(input === "Enter") { // Focus out from textarea and executes intvalSubmitHandler
			event.preventDefault();
			document.querySelector(".Display textarea").blur();

		}else if(!/^[0-9]+$/.test(input) && allowedKey.indexOf(input) === -1){ // Prevent event if not numbers or allowed key entered
			event.preventDefault();
		}
	}
}

/* Return time format: mm:ss */
function timeFormat(time) {
	const min = Math.floor(time / 60);
	time -= min * 60;
	const sec = parseInt(time % 60, 10);

	return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}

/* Control timer actions */
function timerHandler(_this, nextProps) {
	const currProps = _this.props;

	if(!currProps.play && nextProps.play) {
		const timerIntval = setInterval( () => {
			currProps.elapseTimer();
		}, 1000);

		_this.setState({
			interval: timerIntval
		});
	}else if(currProps.play && !nextProps.play) {
		clearInterval(_this.state.interval);
		currProps.alarmTimer();
	}
}

/* Change timer display when timer switched between work and break */
function switchHandler(_this, nextProps) {
	if(_this.work !== nextProps.work) {
		_this.setState({
			display: timeFormat(nextProps.timerDuration - nextProps.elapsedTime)
		})
	}
}

/* Submit changed timer based on user input */
function intvalSubmitHandler(_this) {
	const { timerDuration, setIntvalTimer } = _this.props;
	
	(_this.state.display !== timerDuration / 60) && (setIntvalTimer(_this.state.display * 60));
	(_this.state.error_range) && (_this.setState({ error_range: false }));
}

export default Display;