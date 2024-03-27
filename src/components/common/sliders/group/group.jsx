import React, { useEffect, useRef, useState } from 'react'
import { ArrowBottomBlack as Arrow } from '../../../../assets/images/icons'
import styles from './group.module'

const Group = props => {
	const parent = useRef()
	const child = useRef()

	const [itemWidth, setItemWidth] = useState()
	const [marginLeft, setMarginLeft] = useState(0)
	const [counter, setCounter] = useState(0)

	const [showLeft, setShowLeft] = useState(false)
	const [showRight, setShowRight] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			if (itemWidth) {
				const max = maxMove()

				setShowLeft(max !== 0 && counter !== 0)
				setShowRight(max - counter !== 0)
			} else setItemWidth(getItemWidth())
		}, 100)

		return () => clearInterval(interval)
	})

	const clickArrow = step => {
		let move = counter + step

		const max = maxMove()
		const min = 0

		if (move > max) move = max
		if (move < min) move = min

		var maxMargin = -hiddenWidth()
		var margin = move * -props.speed

		if (margin < maxMargin) margin = maxMargin

		setCounter(move)
		setMarginLeft(margin)
	}

	const maxMove = () => Math.ceil(hiddenWidth() / props.speed)
	const hiddenWidth = () => hiddenItems() * itemWidth
	const hiddenItems = () => {
		let parentWidth =
			parent && parent.current && parent.current.offsetWidth
				? parent.current.offsetWidth
				: 0

		const hidden = props.items.length - Math.floor(parentWidth / itemWidth)

		return hidden > 0 ? hidden : 0
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

	return props.items.length > 0 ? (
		<div className={styles.group_slider} ref={parent}>
			{showLeft ? (
				<div className={styles.button_slider} onClick={() => clickArrow(-1)}>
					<img alt='' className={styles.arrow_left} src={Arrow} />
				</div>
			) : null}
			<div
				className={styles.inner}
				style={{
					marginLeft: marginLeft || 0,
				}}
				ref={child}
			>
				{props.items}
			</div>
			{showRight ? (
				<div className={styles.button_slider} onClick={() => clickArrow(1)}>
					<img alt='' className={styles.arrow_right} src={Arrow} />
				</div>
			) : null}
		</div>
	) : null
}

export default React.memo(Group)
