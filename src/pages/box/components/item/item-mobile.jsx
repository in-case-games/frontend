import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Item as ItemApi } from '../../../../api'
import { AirplaneBlack, InCoinGray } from '../../../../assets/images/icons'
import { TemplateItem as ItemImage } from '../../../../assets/images/main'
import Constants from '../../../../constants'
import { Converter } from '../../../../helpers/converter'
import { Handler } from '../../../../helpers/handler'
import styles from './item.module'

const ItemMobile = props => {
	const itemApi = new ItemApi()
	const navigate = useNavigate()

	const getGradientColor = () =>
		Constants.ItemGradientsNoTransparent[
			props.item.rarity ? props.item.rarity : 'white'
		]

	return (
		<div
			className={styles.item_mobile}
			style={{ background: getGradientColor() }}
		>
			<div className={styles.content}>
				<div className={styles.button_back} onClick={() => props.goBack()}>
					{'<'}
				</div>
				<div className={styles.tittle}>{props.item?.name}</div>
				<img
					alt=''
					className={styles.image}
					src={props.item?.image || ItemImage}
				/>
			</div>
			<div className={styles.buttons}>
				<div
					className={styles.button_sell}
					onClick={async () =>
						await Handler.error(async () => {
							await itemApi.sellLastByItemId(props.item.id)
							props.goBack()
						})
					}
				>
					{props.item?.cost ? Converter.cutCost(props.item?.cost) : null}
					<img className={styles.image} alt='' src={InCoinGray} />
				</div>
				<div
					className={styles.button_send}
					onClick={() => navigate('/profile')}
				>
					<img className={styles.image} alt='' src={AirplaneBlack} />
				</div>
			</div>
		</div>
	)
}

export default React.memo(ItemMobile)
