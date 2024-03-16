import React from 'react'
import { useNavigate } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import styles from './link.module'

const Link = props => {
	const navigate = useNavigate()

	const handleClick = e => {
		e.preventDefault()

		if (props.isScrollToTop) {
			if (window.location.href === `http://localhost:3000/${props.link}`)
				scroll.scrollToTop()
			else window.scrollTo(0, 0)
		}

		navigate(props.link)
	}

	return (
		<a
			className={styles.link}
			onClick={handleClick}
			href={`http://localhost:3000/${props.link}`}
		>
			{props.text}
		</a>
	)
}

export default React.memo(Link)
