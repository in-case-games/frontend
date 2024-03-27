import React from 'react'
import { Helmet } from 'react-helmet'
import { Reviews } from '../../components/structure'
import { Dropdown } from './components'
import styles from './faq.module'

const FAQ = () => (
	<div className={styles.faq}>
		<Helmet>
			<title>InCase - FAQ</title>
			<meta
				name='description'
				content='InCase кейсы по кс го, дота 2. FAQ информация для гостей и наших клиентов, подскажем по популярным вопросам. По любым вопросам обращаться в наши соц.сети.'
			/>
		</Helmet>
		<div className={styles.container_small}>
			<div className={styles.tittle}>Вопросы и ответы</div>
			<div className={styles.questions}>
				<Dropdown
					question='Что такое баннеры?'
					answer='У нас на сайте есть возможность, открывать кейсы, которые имеют систему дропа как путь. То есть вы видите, что на кейсе есть банер и он действует, вы можете выбрать предмет, которые хотите выиграть. Он выпадет вам с определенным количеством открытием, если он вам выпадет раньше, то вы заново можете выбрать тот же или другой предмет'
				/>
				<Dropdown
					question='Что такое - инкоин, инка, incoin???'
					answer='Инкоин это наша игровая валюта, которая относится к рублю как 1/7, где один это рубль, а семь это инкоинов. То есть 1 RUB = 7 инкоинами. За них, вы можете открывать наши кейсы, играть в игры'
				/>
				<Dropdown
					question='Вы нашли баг?'
					answer='Обратитесь к нам в тех поддержку, возможно мы предложим вам вознаграждение'
				/>
			</div>
			<Reviews />
		</div>
	</div>
)

export default FAQ
