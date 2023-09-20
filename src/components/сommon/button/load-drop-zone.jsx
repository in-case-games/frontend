import React, { useState } from 'react'
import { CloudGray } from '../../../assets/images/icon'

const LoadDropZone = (props) => {
	const [dragActive, setDragActive] = useState(false)
	const [error, setError] = useState(false)

	const getColorBorder = () => {
		if (error) return "red"
		else if (dragActive) return "#60daff91"
		else return "gray"
	}

	const handleSetFile = (file) => {
		setError(false)

		const isValidName = file.name.match(/\.(jpg|jpeg|png)$/)
		const isValidSize = file.size / 1048576 < props.sizeMb
		const img = new Image()

		img.onload = function () {
			var canvas = document.createElement("canvas")
			var ctx = canvas.getContext("2d")
			ctx.drawImage(img, 0, 0)
			var MAX_WIDTH = 100
			var MAX_HEIGHT = 50
			var width = img.width
			var height = img.height

			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width
					width = MAX_WIDTH
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height
					height = MAX_HEIGHT
				}
			}
			canvas.width = width
			canvas.height = height

			ctx = canvas.getContext("2d")
			ctx.drawImage(img, 0, 0, width, height)

			console.log(canvas.toBlob())
			props.setFile(new File(canvas, "name"))
		}

		img.src = URL.createObjectURL(file)

		if (isValidName && isValidSize) props.setFile(file)
		else setError(true)
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

	const getImage = () => {
		if (!props.file) return CloudGray
		try {
			return URL.createObjectURL(props.file)
		}
		catch (err) {
			props.setFile()
			return CloudGray
		}
	}

	return (
		<div className='load-drop-zone'>
			<label
				className={dragActive ? "drop-zone__hover" : "drop-zone"} htmlFor="drop-zone-file"
				onDragEnter={handleDrag}
				style={{ borderColor: getColorBorder() }}
			>
				<img id="a" alt="" src={getImage()} />
				{
					!props.file ?
						<div className="drop-zone-message">
							<p><b>Нажмите для загрузки</b><br />или перетащите и отпустите</p>
							<p>{props.description}</p>
						</div> :
						<div className="drop-zone-message">
							<p>{props.file.name.substring(0, 19) + (props.file.name.length > 20 ? "..." : "")}</p>
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

export default LoadDropZone