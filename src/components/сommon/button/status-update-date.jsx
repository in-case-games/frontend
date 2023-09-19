import React, { useEffect, useState } from 'react'

const StatusUpdateDate = (props) => {
	const [percent, setPercent] = useState(1)
	const [color, setColor] = useState("green")

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
		<div className="status-update-date">
			<div className='status-strip' style={{ height: `${100 * percent}px`, background: color }}>
			</div>
		</div>)
}

export default StatusUpdateDate