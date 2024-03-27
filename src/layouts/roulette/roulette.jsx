import React from 'react'
import { Roulette as Slider } from '../../components/common/sliders'
import styles from './roulette.module'

const Roulette = ({ isRolling, setRollingEnd, children }) => (
	<div className={styles.roulette}>
		<div className={styles.inner}>
			<div className={styles.frame}>
				<div className={styles.bracket_left}>
					<div className={styles.triangle_top}></div>
					<div className={styles.triangle_bottom}></div>
				</div>
				<div className={styles.bracket_right}>
					<div className={styles.triangle_top}></div>
					<div className={styles.triangle_bottom}></div>
				</div>
				<div className={styles.bracket_right}></div>
				<div className={styles.border_top}></div>
				<div className={styles.border_bottom}></div>
			</div>
			{children.length > 0 ? (
				<Slider
					items={children}
					isRolling={isRolling}
					setRollingEnd={setRollingEnd}
				/>
			) : (
				<div className={styles.text}></div>
			)}
			<div className={styles.arrow}>{'<'}</div>
		</div>
	</div>
)

export default Roulette
