export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const RESET_TIMER = "RESET_TIMER";
export const ELAPSE_TIMER = "ELAPSE_TIMER";
export const SWITCH_TIMER = "SWITCH_TIMER";
export const SET_INTVAL_TIMER = "SET_INTVAL_TIMER";
export const ALARM_TIMER = "ALARM_TIMER";

export function start_timer() {
	return {
		type: START_TIMER
	}
}

export function pause_timer() {
	return {
		type: PAUSE_TIMER
	}
}

export function reset_timer() {
	return {
		type: RESET_TIMER
	}
}

export function elapse_timer() {
	return {
		type: ELAPSE_TIMER
	}
}

export function switch_timer(sort) {
	return {
		type: SWITCH_TIMER,
		sort: sort
	}
}

export function set_intval_timer(time) {
	return {
		type: SET_INTVAL_TIMER,
		time: time
	}
}

export function alarm_timer() {
	return {
		type: ALARM_TIMER
	}
}