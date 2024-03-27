import React, { useEffect, useState } from 'react'
import { User as UserApi } from '../../../api'
import { Handler } from '../../../helpers/handler'
import { Modal as ModalLayout } from '../../../layouts'
import { Group } from '../../../layouts/group'
import { Review } from '../../review'
import {
	Box as BoxWindow,
	Item as ItemWindow,
	LoadImage as LoadImageWindow,
	MiniProfile as MiniProfileWindow,
	Restriction as RestrictionWindow,
} from '../../windows'

const Reviews = () => {
	const userApi = new UserApi()

	const [isStart, setIsStart] = useState(true)
	const [isOpenLoadWindow, setIsOpenLoadWindow] = useState(false)

	const [reviews, setReviews] = useState([])
	const [penaltyDelay, setPenaltyDelay] = useState(0)

	const [miniProfile, setMiniProfile] = useState()
	const [item, setItem] = useState()
	const [box, setBox] = useState()
	const [restriction, setRestriction] = useState()
	const [image, setImage] = useState()

	useEffect(() => {
		const interval = setInterval(
			async () =>
				await Handler.error(
					async () => {
						setIsStart(false)
						const response = await userApi.getReviewLast(10)
						const result = []

						for (let i = 0; i < response.length; i++) {
							const r = response[i]
							const image = await userApi.getImageByUserId(r.userId)
							result.push(
								<Review
									id={r.id}
									image={image}
									name={r.title}
									date={r.creationDate}
									showMiniProfile={() => setMiniProfile(r.userId)}
									content={r.content}
									score={r.score}
									key={r.id}
								/>
							)
						}

						setReviews(result)
					},
					undefined,
					undefined,
					penaltyDelay,
					setPenaltyDelay,
					'REVIEWS'
				),
			isStart ? 100 + penaltyDelay : 5000 + penaltyDelay
		)

		return () => clearInterval(interval)
	})

	return (
		<div>
			<Group sliderSpeed={540} name='Отзывы'>
				{reviews}
			</Group>
			<ModalLayout isActive={miniProfile} close={() => setMiniProfile()}>
				<MiniProfileWindow
					userId={miniProfile}
					openRestrictionWindow={r => setRestriction(r)}
					openItemWindow={item => setItem(item)}
					openBoxWindow={box => setBox(box)}
					exchangeWindow={id => setMiniProfile(id)}
				/>
			</ModalLayout>
			<ModalLayout isActive={restriction} close={() => setRestriction()}>
				<RestrictionWindow
					restriction={restriction}
					setRestriction={setRestriction}
					close={() => setRestriction()}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={item}
				close={() => {
					setItem()
					setImage()
				}}
			>
				<ItemWindow
					item={item}
					image={image}
					setImage={setImage}
					setItem={setItem}
					openLoadWindow={setIsOpenLoadWindow}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={box}
				close={() => {
					setBox()
					setImage()
				}}
			>
				<BoxWindow
					box={box}
					image={image}
					setImage={setImage}
					setBox={setBox}
					openLoadWindow={setIsOpenLoadWindow}
				/>
			</ModalLayout>
			<ModalLayout
				isActive={isOpenLoadWindow}
				close={() => setIsOpenLoadWindow(false)}
			>
				<LoadImageWindow
					file={image}
					setFile={setImage}
					width={200}
					height={200}
					sizeMb={1}
					regular={/\.(png)$/}
					description={'PNG (MAX. 200x200px | 1MB)'}
				/>
			</ModalLayout>
		</div>
	)
}

export default Reviews
