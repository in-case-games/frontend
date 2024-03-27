import React from 'react'
import { LoadDropZone } from '../../common/inputs'
import styles from './load-image.module'

const LoadImage = props => {
	return (
		<div className={styles.load_image}>
			<div className={styles.load_image_content}>
				<LoadDropZone
					file={props.file}
					setFile={props.setFile}
					sizeMb={props.sizeMb}
					width={props.width}
					height={props.height}
					regular={props.regular}
					description={props.description}
					isBlockedLoad={props.isBlockedLoad}
				/>
				{props.click ? (
					<div
						className={
							props.file ? styles.button_send__active : styles.button_send
						}
						onClick={() => props.click()}
						style={
							props.buttonColor
								? {
										cursor: props.file ? 'pointer' : 'default',
										color: props.buttonColor,
										borderColor: props.buttonColor,
								  }
								: { cursor: props.file ? 'pointer' : 'default' }
						}
					>
						{props.buttonName || 'Отправить'}
					</div>
				) : null}
			</div>
		</div>
	)
}

export default LoadImage
