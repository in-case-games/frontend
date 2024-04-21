const popNotifies = () => {
	var notifications = JSON.parse(localStorage.getItem('notifications')) || []

	if (notifications.length > 0) 
	{
		localStorage.setItem('notifications', JSON.stringify([]))
	}

	return notifications
}

const pushNotify = notify => {
	var content = JSON.stringify(notify.content)
	var notifications = JSON.parse(localStorage.getItem('notifications')) || []

	console.log(content)

	if (content.length > 50 || content.includes(':')) 
	{
		notify.content = content.substring(0, 47) + '...'
	}

	notifications.push(notify)
	localStorage.setItem('notifications', JSON.stringify(notifications))
}

export const Notification = {
	popNotifies,
	pushNotify,
}
