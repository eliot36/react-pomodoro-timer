import * as types from '../actions';

const initState = {
	is_Playing: false,
	is_Alarm: false,
	is_Init: false,
	is_Work: true,
	elapsed_time: 0,
	max_time: 90,
	min_time: 1,
	timer_duration: 1500, // 25:00
	timer_max_size: 18.75, // em
	timer_stroke_size: 5,
	work_duration: 1500,
	break_duration: 300
};

const control = (state = initState, action) => {
	switch(action.type) {
		case types.START_TIMER:
			return startTimer(state, action);
		
		case types.PAUSE_TIMER:
			return pauseTimer(state, action);
		
		case types.RESET_TIMER:
			return resetTimer(state, action);

		case types.ELAPSE_TIMER:
			return elapseTimer(state, action);

		case types.SWITCH_TIMER:
			return switchTimer(state, action);

		case types.SET_INTVAL_TIMER:
			return setIntvalTimer(state, action);

		case types.ALARM_TIMER:
			return alarmTimer(state, action);

		default:
			return state;
	}
}

function startTimer(state, action) {
	return {
		...state,
		is_Playing: true,
		is_Init: true
	}
}

function pauseTimer(state, action) {
	return {
		...state,
		is_Playing: false
	}
}

function resetTimer(state, action) {
	return {
		...state,
		is_Playing: false,
		is_Init: false,
		elapsed_time: 0
	}
}

function elapseTimer(state, action) {
	const { elapsed_time, timer_duration } = state;
	
	// Increase elapsed time after the timer starts
	if(elapsed_time < timer_duration) {
		return {
			...state,
			elapsed_time: elapsed_time + 1
		};
	}else{
		return {
			...state,
			is_Playing: false,
			is_Init: false
		};
	}
}

function setIntvalTimer(state, action) {
	const { is_Work } = state;

	if(is_Work) { // Work timer
		return {
			...state,
			work_duration: action.time,
			timer_duration: action.time
		}
	}else { // Break timer
		return {
			...state,
			break_duration: action.time,
			timer_duration: action.time
		}
	}
}

function switchTimer(state, action) {
	const { is_Playing, is_Work, work_duration, break_duration } = state;

	// Only available switching when timer has been stopped
	if(!is_Playing) {
		if(!is_Work && action.sort) { // Switch to work
			return {
				...state,
				is_Work: true,
				is_Playing: false,
				elapsed_time: 0,
				timer_duration: work_duration
			}
		}else if(is_Work && !action.sort){ // Switch to break
			return {
				...state,
				is_Work: false,
				is_Playing: false,
				elapsed_time: 0,
				timer_duration: break_duration
			}
		}
	}else{
		return state;
	}
}

function alarmTimer(state, action) {
	const { is_Alarm, elapsed_time, timer_duration } = state;

	// Beep alarm when the timer ends
	if(!is_Alarm && elapsed_time === timer_duration) {
		const music = document.getElementById("alarm-sound");
		music.play();

		const alarmIntval = setInterval( () => {
			music.play();
		}, 5000);

		return {
			...state,
			is_Alarm: true,
			elapsed_time: 0,
			alarm: music,
			interval: alarmIntval
		}
	}else if(is_Alarm) {
		// Stop beep only if timer reaches the end, not pause
		state.alarm.pause();
		clearInterval(state.interval);

		return {
			...state,
			is_Alarm: false
		}
	}else{
		return state;
	}
}

export default control;