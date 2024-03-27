import React from 'react'
import { InCoin } from '../../../assets/images/icons'
import { TemplateBox as BoxImage } from '../../../assets/images/main'
import Constants from '../../../constants'
import { Converter } from '../../../helpers/converter'
import styles from './simple.module'

const Simple = props => {
	const clickBox = () => {
		if (props.showBox) props.showBox(props.box)
		else if (props.selectBoxes?.boxes) props.select()
	}

	const isSelected = () =>
		props.selectBoxes && props.selectBoxes.boxes.find(i => i.id === props.id)

	return (
		<div
			className={styles.box_simple}
			onClick={clickBox}
			style={
				isSelected() ? { background: Constants.ItemGradients['green'] } : {}
			}
		>
			<img
				alt=''
				src={props.box?.image ?? BoxImage}
				className={styles.box_image}
				style={{ background: 'gray' }}
			/>
			<div className={styles.box_info}>
				<div className={styles.name}>
					{Converter.cutString(props.box?.name || '', 12)}
				</div>
				<div className={styles.cost}>
					{props.box?.cost ? Converter.cutCost(props.box?.cost) : 'Пустой'}
					<img alt='' src={InCoin} className={styles.image} />
				</div>
				<div className={styles.game}>{props.box?.game}</div>
			</div>
		</div>
	)
}

export default React.memo(Simple)
