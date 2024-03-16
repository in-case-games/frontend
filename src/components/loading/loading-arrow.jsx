import React, { useEffect, useState } from 'react'
import styles from './loading.module'

const LoadingArrow = props => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => setLoading(true), getInterval())

		return () => clearInterval(interval)
	})

	const click = () => {
		if (loading && props.setLoading !== undefined) {
			setLoading(false)
			props.setLoading()
		}
	}

	const getClassName = () =>
		props.isLoading ? styles.loading_arrow__active : styles.loading_arrow
	const getCursor = () =>
		props.cursor !== undefined ? props.cursor : 'pointer'
	const getInterval = () =>
		props.intervalMs === undefined ? 2000 : props.intervalMs

	return (
		<div className={styles.loading}>
			<div
				className={getClassName()}
				style={{ cursor: getCursor() }}
				onClick={click}
			>
				↻
			</div>
		</div>
	)
}

export default React.memo(LoadingArrow)
