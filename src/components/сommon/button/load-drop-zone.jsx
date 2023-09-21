import React, { useState } from 'react'
import { CloudGray } from '../../../assets/images/icon'

const LoadDropZone = (props) => {
	const [dragActive, setDragActive] = useState(false)
	const [error, setError] = useState(false)
	const [fileName, setFileName] = useState(null)

	const getColorBorder = () => {
		if (error) return "red"
		else if (dragActive) return "#60daff91"
		else return "gray"
	}

	const handleSetFile = (file) => {
		setError(false)

		const isValidName = file.name.match(props.regular)
		const isValidSize = file.size / 1048576 < props.sizeMb

		const image = new Image()

		image.onload = function () {
			const canvas = document.createElement('canvas')

			canvas.width = props.width
			canvas.height = props.height

			const context = canvas.getContext('2d', { alpha: true })

			context.drawImage(image, 0, 0, canvas.width, canvas.height)

			setFileName(file.name.substring(0, 19) + (file.name.length > 20 ? "..." : ""))
			props.setFile(canvas.toDataURL())
			setError(false)
		}

		if (!isValidName || !isValidSize) setError(true)
		else image.src = URL.createObjectURL(file)
	}
	const handleDrag = (e) => {
		e.preventDefault()
		e.stopPropagation()

		setError(false)

		if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
		else if (e.type === "dragleave") setDragActive(false)
	}

	const handleDrop = (e) => {
		e.preventDefault()
		e.stopPropagation()

		if (e.dataTransfer.files && e.dataTransfer.files[0])
			handleSetFile(e.dataTransfer.files[0])
	}

	const handleChange = e => {
		e.preventDefault()

		if (e.target.files && e.target.files[0])
			handleSetFile(e.target.files[0])
	}

	const getImage = () => !props.file ? CloudGray : props.file

	return (
		<div className='load-drop-zone'>
			<label
				className={dragActive ? "drop-zone__hover" : "drop-zone"} htmlFor="drop-zone-file"
				onDragEnter={handleDrag}
				style={{ borderColor: getColorBorder() }}
			>
				<img alt="" src={getImage()}
					style={
						{ height: (props.height > 400) ? 400 : props.height, width: (props.width > 400) ? 400 : props.width }
					} />
				{
					!fileName ?
						<div className="drop-zone-message">
							<p><b>Нажмите для загрузки</b><br />или перетащите и отпустите</p>
							<p>{props.description}</p>
						</div> :
						<div className="drop-zone-message">
							<p>{fileName}</p>
						</div>
				}
				{
					dragActive &&
					<div
						className="drop-zone-element"
						onDragEnter={handleDrag}
						onDragLeave={handleDrag}
						onDragOver={handleDrag} onDrop={handleDrop}>
					</div>
				}
			</label>
			<input
				id="drop-zone-file"
				type="file"
				style={{ visibility: 'hidden' }}
				onChange={handleChange}
			/>
		</div>
	)
}

export default React.memo(LoadDropZone)