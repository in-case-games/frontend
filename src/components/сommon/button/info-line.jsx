import React from 'react'

const InfoLine = (props) => {
	return (
		<div className='info-line'>
			<div className='line-name'>{props.placeholder + ":"}</div>
			{
				props.comboBox ?
					<select className="combo-box"
						value={props.value}
						onChange={e => props.setValue(e.target.value)}
					>
						{
							props.comboBox.map(v =>
								<option key={v.id}>{v.name}</option>)
						}
					</select> :
					<input
						maxLength={200}
						className="input-form"
						placeholder={props.placeholder}
						readOnly={props.isReadOnly}
						value={props.value || ''}
						onInput={e => props.setValue(e.target.value)}
						name={props.name}
					/>
			}
		</div>
	)
}

export default React.memo(InfoLine)