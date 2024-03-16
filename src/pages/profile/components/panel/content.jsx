import React from 'react'
import styles from '../../profile.module'
import {
	Admin,
	AdminBanners,
	AdminBoxes,
	AdminGroups,
	AdminItems,
	AdminPromocodes,
	AdminStatistics,
	Inventory,
	HistoryOpening as Openings,
	HistoryPayment as Payments,
	ObserverProfile as Profile,
	HistoryPromocode as Promocodes,
	HistoryWithdrawn as Withdrawn,
} from '../content'

const Content = props => {
	const dictionary = {
		profile: <Profile />,
		inventory: <Inventory />,
		history_opening: <Openings />,
		payment: <Payments />,
		withdrawn: <Withdrawn />,
		promocode: <Promocodes />,
		admin: <Admin exchange={props.exchange} />,
		admin_items: <AdminItems exchange={props.exchange} />,
		admin_boxes: <AdminBoxes exchange={props.exchange} />,
		admin_promocodes: <AdminPromocodes exchange={props.exchange} />,
		admin_banners: <AdminBanners exchange={props.exchange} />,
		admin_groups: <AdminGroups exchange={props.exchange} />,
		admin_statistics: <AdminStatistics exchange={props.exchange} />,
	}

	return (
		<div className={styles.panel_content}>
			{dictionary[props.content]
				? dictionary[props.content]
				: dictionary['profile']}
		</div>
	)
}

export default Content
