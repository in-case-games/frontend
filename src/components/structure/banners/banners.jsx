import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box as BoxApi } from '../../../api'
import { Handler } from '../../../helpers/handler'
import { Banner } from '../../banner'
import { AutomaticDot } from '../../common/sliders'
import styles from './banners.module'

const Banners = () => {
	const boxApi = new BoxApi()
	const windowWidth = useRef(window.innerWidth)
	const navigate = useNavigate()

	const [isStart, setIsStart] = useState(true)
	const [banners, setBanners] = useState([])
	const [counter, setCounter] = useState(1)
	const [penaltyDelay, setPenaltyDelay] = useState(0)

	useEffect(() => {
		const interval = setInterval(
			async () => {
				await Handler.error(
					async () => {
						setIsStart(false)
						const response = await boxApi.getBannersByIsActive(true)
						const result = []

						for (let i = 0; i < response.length; i++) {
							let r = await boxApi.bannerPushImage(response[i])
							result.push(
								<Banner
									image={r.image}
									click={() => navigate(`/box/${r.box.id}`)}
									key={r.id}
								/>
							)
						}
						setBanners(result)
					},
					undefined,
					undefined,
					penaltyDelay,
					setPenaltyDelay,
					'BANNER'
				)
			},
			isStart ? 100 + penaltyDelay : 5000 + penaltyDelay
		)

		return () => clearInterval(interval)
	})

	const getMarginLeft = () => {
		const width = windowWidth.current > 1000 ? 1000 : windowWidth.current

		return `${-width * (counter - 1)}px`
	}

	return (
		<div className={styles.banners}>
			<div className={styles.banners_inner}>
				<div
					className={styles.inner}
					style={{
						marginLeft: getMarginLeft(),
					}}
				>
					{banners}
				</div>
				<AutomaticDot
					maxValue={banners.length}
					counter={counter}
					setCounter={setCounter}
				/>
			</div>
		</div>
	)
}

export default React.memo(Banners)
