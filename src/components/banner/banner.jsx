import React, { useEffect, useState } from 'react'
import styles from './banner.module'

const Banner = props => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		window.addEventListener('resize', () => setWidth(window.innerWidth))
		return () => {
			window.removeEventListener('resize', () => setWidth(window.innerWidth))
		}
	}, [])

	return (
		<div
			className={styles.banner}
			onClick={props.click}
			style={{
				width: `${width > 1000 ? 1000 : width}px`,
			}}
		>
			<img className={styles.image} alt='' src={props.image} />
		</div>
	)
}

export default React.memo(Banner)
