import React, { useEffect, useState } from 'react'

const Loading = (props) => {
		const [load, setLoad] = useState(false);

		useEffect(() => {
			const interval = setInterval(async () => {
					setLoad(true);
			}, 2000);

			return () => clearInterval(interval);
		});

		const handleClick = () => {
				if(load) {
						setLoad(false);
						props.click();
				}
		};

		return(
			<div className={ props.isLoading ? 'btn-loading loading' : 'btn-loading' } onClick={() => handleClick()}>↻</div>
		);
};

export default Loading;