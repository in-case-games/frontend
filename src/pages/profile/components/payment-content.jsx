import React, { useState } from 'react'
import { PaymentsHistory } from '../../../components/payments-history'
import { Loading } from '../../../components/сommon/button'

const PaymentContent = (props) => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div className='payment-content'>
			<div className='profile-header'>
				<div className="profile-tittle">
					<div className='profile-group'>
						<Loading isLoading={isLoading} click={() => setIsLoading(true)} />
						<div className="profile-name">История открытия кейсов:</div>
					</div>
				</div>
				<div className="profile-delimiter"></div>
			</div>
			<PaymentsHistory
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
		</div>
	)
}

export default PaymentContent