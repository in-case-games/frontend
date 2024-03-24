import React, { useEffect, useState } from 'react'
import styles from './automatic-dot.module'
import Dot from './dot'

const AutomaticDot = props => {
	const [isStart, setIsStart] = useState(true)
	const [dots, setDots] = useState([])

	useEffect(() => {
		const interval = setInterval(
			() => {
				setIsStart(false)

				const result = []
				let counter = props.counter >= props.maxValue ? 1 : props.counter + 1

				for (let i = 1; i <= props.maxValue; i++) {
					result.push(<Dot isActive={i === counter} key={i} />)
				}

				props.setCounter(counter)
				setDots(result)
			},
			isStart ? 1000 : 3000
		)

		return () => clearInterval(interval)
	})

	return <div className={styles.automatic_dot}>{dots}</div>
}

export default React.memo(AutomaticDot)
