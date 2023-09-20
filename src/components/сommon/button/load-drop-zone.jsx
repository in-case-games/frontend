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
			if (this.width > props.width || this.height > props.height) {
				props.setFile()
				setError(true)
			}

			URL.revokeObjectURL(this.src)
		}

		var objectURL = URL.createObjectURL(file)
		img.src = objectURL

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

	return (
		<div className='load-drop-zone'>
			<label
				className={dragActive ? "drop-zone__hover" : "drop-zone"} htmlFor="drop-zone-file"
				onDragEnter={handleDrag}
				style={{ borderColor: getColorBorder() }}
			>
				<img alt="" src={CloudGray} />
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