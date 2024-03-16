import React, { useEffect, useState } from 'react'
import { ArrowBottomBlack as Arrow } from '../../../../assets/images/icons'
import styles from './counter.module'

const Counter = props => {
	const [showLeft, setShowLeft] = useState(false)
	const [showRight, setShowRight] = useState(false)

	useEffect(() => {
		const interval = setInterval(async () => {
			if (props.page > 1 !== showLeft) setShowLeft(props.page > 1)
			if (props.page < props.pages !== showRight)
				setShowRight(props.page < props.pages)
		}, 10)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.counter}>
			{showLeft ? (
				<div className={styles.button_slider} onClick={() => props.click(-1)}>
					<img alt='' className={styles.arrow_left} src={Arrow} />
				</div>
			) : null}
			<div className={styles.pages}>
				{props.page}/{props.pages}
			</div>
			{showRight ? (
				<div className={styles.button_slider} onClick={() => props.click(1)}>
					<img alt='' className={styles.arrow_right} src={Arrow} />
				</div>
			) : null}
		</div>
	)
}

export default React.memo(Counter)
