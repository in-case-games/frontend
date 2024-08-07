import React, { useEffect, useRef, useState } from 'react'
import { Converter } from '../../helpers/converter'
import styles from './loading.module'

const LoadingHourglass = props => {
	const observer = useRef(null)

	const [percent, setPercent] = useState(1)
	const [color, setColor] = useState('transparent')
	const [height, setHeight] = useState(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setHeight(observer.current.clientHeight)

			const updatedIn = Math.round(new Date(props.updatedIn) / 1000)
			const updateTo = Math.round(new Date(props.updateTo) / 1000)
			const currentDate = Math.round(new Date(Converter.getUtcDate()) / 1000)

			const totalTime = updateTo - updatedIn
			const remainedTime = updateTo - currentDate

			let temp = remainedTime / totalTime
			temp = temp < 0 ? 0 : temp
			temp = temp >= 1 ? 1 : temp

			if (temp >= 0.7) setColor('green')
			else if (temp >= 0.4) setColor('orange')
			else setColor('red')

			setPercent(temp)
		}, 100)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.loading_hourglass} ref={observer}>
			<div
				className={styles.hourglass}
				style={{ height: `${height * percent}px`, background: color }}
			></div>
		</div>
	)
}

export default React.memo(LoadingHourglass)
