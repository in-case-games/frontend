import React, { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'
import { RouletteScrollingSound, ShowWinItemSound } from '../../../../assets/sounds/'
import { Converter } from '../../../../helpers/converter'
import styles from './roulette.module'

const Roulette = props => {
	const parent = useRef()
	const child = useRef()
	const boost = Converter.getRandomInt(3, 8)
	
	const [rouletteSoundPlay] = useSound(RouletteScrollingSound, { volume:0.01 })
	const [showWinItemSoundPlay] = useSound(ShowWinItemSound, { volume:0.2 })

	const [itemWidth, setItemWidth] = useState()
	const [marginLeft, setMarginLeft] = useState(0)
	const [distance, setDistance] = useState()
	const [runDistance, setRunDistance] = useState()
	const [fixNumberItem, setFixNumberItem] = useState()

	const [isPassive, setIsPassive] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			if (!itemWidth) setItemWidth(getItemWidth())
			else if ((isPassive && props.isRolling) || !distance) zeroingOut()
			else {
				const remainedItems = (distance + marginLeft) / itemWidth - runDistance
				const speed = !props.isRolling ? itemWidth / 100 : remainedItems * boost

				if (speed <= 0.01) {
					showWinItemSoundPlay();
					props.setRollingEnd(false)
				}

				if (isPassive && remainedItems <= 5) zeroingOut()
				else {
					if(!isPassive && props.isRolling && speed < 170) playAudio(remainedItems)
					setMarginLeft(marginLeft - speed)
				}
			}

			setIsPassive(!props.isRolling)
		}, 10)

		return () => clearInterval(interval)
	})

	const zeroingOut = () => {
		const distance = (props.items.length - 5) * itemWidth
		const parentWidth =
			parent && parent.current && parent.current.offsetWidth
				? parent.current.offsetWidth
				: 0
		const items = parentWidth / itemWidth
		const runDistance =
			items / 2 - Converter.getRandomInt(30, itemWidth + 20) / itemWidth

		setRunDistance(runDistance ? runDistance : 0)
		setDistance(distance)
		setMarginLeft(0)
	}

	const getItemWidth = () => {
		if (child && child.current) {
			var item = child.current.children[0]
			var style = window.getComputedStyle(item, null)
			return (
				item.offsetWidth +
				parseFloat(style.marginLeft) +
				parseFloat(style.marginRight)
			)
		} else return 0
	}

	const playAudio = remainedItems => {
		const minNumber = Math.round(remainedItems)

		if (fixNumberItem != minNumber) {
			setFixNumberItem(minNumber)
			rouletteSoundPlay()
		}
	}

	return props.items.length > 0 ? (
		<div className={styles.roulette} ref={parent}>
			<button
				onClick={rouletteSoundPlay}
				style={{ width: 0, height: 0, margin: 0, opacity: 0, visibility: 'hidden' }}
			></button>
			<button
				onClick={showWinItemSoundPlay}
				style={{ width: 0, height: 0, margin: 0, opacity: 0, visibility: 'hidden' }}
			></button>
			<div
				className={styles.inner}
				style={{
					marginLeft: marginLeft || 0,
				}}
				ref={child}
			>
				{props.items}
			</div>
		</div>
	) : null
}

export default React.memo(Roulette)
