import React, { useState } from 'react'
import { FlagBlack as Flag } from '../../../../assets/images/icons'
import { TemplateBox as BoxImage } from '../../../../assets/images/main'
import Constants from '../../../../constants'
import styles from './box.module'

const BoxMobile = props => {
	const [hovered, setHovered] = useState(false)

	const getBackground = () => {
		if (props.pathBanner) return '#00ff82'
		if (props.isHasBanner) return hovered ? '#ffed94' : '#ffe665'
		else return hovered ? '#d3d3d3' : '#b8b8b8'
	}

	return (
		<div
			className={styles.box_mobile}
			style={{ background: Constants.ItemGradientsNoTransparent['gold'] }}
		>
			<div className={styles.content}>
				<div className={styles.tittle}>{props.box?.name}</div>
				<img
					alt=''
					className={styles.image}
					src={props.box?.image || BoxImage}
				/>
			</div>
			<div
				className={styles.button_banner}
				onClick={props.openBannerWindow}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{ background: getBackground() }}
			>
				<img className={styles.image} alt='' src={Flag} />
			</div>
		</div>
	)
}

export default React.memo(BoxMobile)
