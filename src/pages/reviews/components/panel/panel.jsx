import React, { useState } from 'react'
import styles from '../../reviews.module'
import Home from '../content/home'

const Panel = () => {
	const [content, setContent] = useState('home')

	const dictionary = {
		home: <Home exchange={setContent} />,
	}

	return (
		<div className={styles.panel}>
			{dictionary[content] ? dictionary[content] : dictionary['home']}
		</div>
	)
}

export default Panel
