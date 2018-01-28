import React, { Component } from 'react';
import './Control.css';

class Control extends Component {
	render() {
		const { play, active, startTimer, pauseTimer, resetTimer } = this.props;

		return (
			<div className="Control">
				{/* Play */}
				{!play &&
					(<button onClick={startTimer} title="Start">▶</button>)}
				
				{/* Pause */}
				{play &&
					(<button onClick={pauseTimer} title="Pause"><strong>||</strong></button>)}

				{/* Stop */}
				<button onClick={resetTimer} title="Stop" disabled={!active}>■</button>
			</div>
		);
	}
}

export default Control;