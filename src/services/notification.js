const popNotifies = () => {
  var notifications = JSON.parse(localStorage.getItem("notifications"));

  if (!notifications || notifications.length > 0) {
    notifications = notifications || [];
    localStorage.setItem("notifications", JSON.stringify([]));
  }

  return notifications;
};

const pushNotify = (notify) => {
  var notifications = JSON.parse(localStorage.getItem("notifications"));

  if (!notifications || notifications.length > 0) {
    notifications = notifications || [];
  }

  notifications.push(notify);
  localStorage.setItem("notifications", JSON.stringify(notifications));
};

export const Notification = {
  popNotifies,
  pushNotify,
};
