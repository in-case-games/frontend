import React from 'react'
import {
	Box,
	ChartUp,
	Flag,
	Gun,
	HtmlTag,
	Layers,
} from '../../../../assets/images/icons'
import { SquarePanel } from '../../../../components/common/buttons'
import styles from './content.module'

const Admin = props => (
	<div className={styles.admin}>
		<div className={styles.admin_content}>
			<div className={styles.admin_group}>
				<SquarePanel image={Gun} click={() => props.exchange('admin_items')} />
				<SquarePanel image={Box} click={() => props.exchange('admin_boxes')} />
				<SquarePanel
					image={ChartUp}
					click={() => props.exchange('admin_statistics')}
				/>
			</div>
			<div className={styles.admin_group}>
				<SquarePanel
					image={Layers}
					click={() => props.exchange('admin_groups')}
				/>
				<SquarePanel
					image={Flag}
					click={() => props.exchange('admin_banners')}
				/>
				<SquarePanel
					image={HtmlTag}
					click={() => props.exchange('admin_promocodes')}
				/>
			</div>
		</div>
	</div>
)

export default React.memo(Admin)
