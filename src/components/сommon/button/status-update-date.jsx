import React, { useEffect, useRef, useState } from 'react'

const StatusUpdateDate = (props) => {
	const [percent, setPercent] = useState(1)
	const [color, setColor] = useState("green")
	const [height, setHeight] = useState(100)

	const stageCanvasRef = useRef(null)

	useEffect(() => {
		if (stageCanvasRef.current) setHeight(stageCanvasRef.current.offsetHeight)
	}, [stageCanvasRef])

	useEffect(() => {
		const interval = setInterval(() => {
			const date = Math.round(new Date(props.updateDate) / 1000)
			const newDate = Math.round(new Date() / 1000)
			const difference = newDate - date

			let temp = 1 - (difference / props.secondsUpdate)

			temp = temp < 0 ? 0 : temp

			if (temp >= 0.7) setColor("green")
			else if (temp >= 0.4) setColor("orange")
			else setColor("red")

			setPercent(temp)
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className="status-update-date" ref={stageCanvasRef}>
			<div className='status-strip' style={{ height: `${height * percent}px`, background: color }}>
			</div>
		</div>)
}

export default StatusUpdateDate