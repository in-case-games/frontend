import React, { useEffect, useState } from 'react'
import { InCoin } from '../../../assets/images/icons'
import {
	TemplateBox as BoxImage,
	TemplateItem as ItemImage,
} from '../../../assets/images/main'
import Constants from '../../../constants'
import { Converter } from '../../../helpers/converter'
import styles from './opening.module'

const Opening = props => {
	const [gradientColor, setGradientColor] = useState(
		Constants.ItemGradients[
			props.history.item.rarity ? props.history.item.rarity : 'white'
		]
	)

	useEffect(() => {
		const interval = setInterval(
			() =>
				setGradientColor(
					Constants.ItemGradients[
						props.history.item.rarity ? props.history.item.rarity : 'white'
					]
				),
			1000
		)

		return () => clearInterval(interval)
	})

	return (
		<div className={styles.opening} onClick={props.click}>
			<div className={styles.tittle}>
				{Converter.getMiniDate(props.history.date)}
			</div>
			<div
				className={
					props.isMobile
						? styles.opening_content_mobile
						: styles.opening_content
				}
			>
				<div className={styles.opening_box}>
					<img
						alt=''
						src={props.history.box.image ?? BoxImage}
						onClick={e => {
							e.stopPropagation()
							props.showBox()
						}}
						className={styles.image}
					/>
					{!props.isMobile ? (
						<div className={styles.box_content}>
							<div className={styles.tittle}>Кейс:</div>
							<div className={styles.info}>
								<div className={styles.name}>
									{Converter.cutString(props.history.box.name, 25)}
								</div>
								<div className={styles.cost}>
									{Converter.cutCost(props.history.box.cost)}
									<img alt='' src={InCoin} className={styles.image} />
								</div>
							</div>
							<div className={styles.game}>{props.history.box.game}</div>
						</div>
					) : null}
				</div>
				<div className={styles.vertical_delimiter}></div>
				<div className={styles.opening_item}>
					{!props.isMobile ? (
						<div className={styles.item_content}>
							<div className={styles.tittle}>Предмет:</div>
							<div className={styles.info}>
								<div className={styles.name}>
									{Converter.cutString(props.history.item.name, 25)}
								</div>
								<div className={styles.cost}>
									{Converter.cutCost(props.history.item.cost)}
									<img alt='' src={InCoin} className={styles.image} />
								</div>
							</div>
							<div className={styles.game}>{props.history.item.game}</div>
						</div>
					) : null}
					<img
						className={styles.image}
						alt=''
						src={props.history.item.image ?? ItemImage}
						style={{ background: gradientColor }}
						onClick={e => {
							e.stopPropagation()
							props.showItem()
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Opening)
