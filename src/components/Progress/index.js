import React, { Component } from 'react';
import './Progress.css';

class Progress extends Component {
	render() {
		const { work, timerDuration, elapsedTime, maxSize, strokeSize, workColor, breakColor } = this.props,

		pxSize = maxSize * 16,
		radius = (pxSize - strokeSize) / 2,
		viewBox = `0 0 ${pxSize} ${pxSize}`,
		percentage = Math.round((elapsedTime/timerDuration) * 100),
		dashArr = radius * Math.PI * 2,
		dashOffset = dashArr * percentage / 100; // From 100 to 0
		
		return (
			<div className="Progress" style={{height:pxSize, width:pxSize}}>
				
				{/* Progress circle svg */}
				<svg
					height={"100%"}
					width={"100%"}
					viewBox={viewBox}>

					{/* Progress circle background */}
					<circle className="circle-background"
						cx={pxSize/2}
						cy={pxSize/2}
						r={radius}
						strokeWidth={`${strokeSize}px`}
					/>

					{/* Progress circle */}
					<circle className="circle-progress"
						cx={pxSize/2}
						cy={pxSize/2}
						r={radius}
						strokeWidth={`${strokeSize}px`}
						transform={`rotate(-90 ${pxSize/2} ${pxSize/2})`} // Begin at 12
						style={{
							stroke: `${(work) ? workColor:breakColor}`,
							strokeDasharray: dashArr,
							strokeDashoffset: dashOffset
						}}
					/>
				</svg>
			</div>
		);
	}
}
export default Progress;