const popNotifies = () => {
  var notifications = JSON.parse(localStorage.getItem("notifications"));

  if (!notifications || notifications.length > 0) {
    notifications = notifications || [];
    localStorage.setItem("notifications", JSON.stringify([]));
  }

  return notifications;
};

const pushNotify = (notify) => {
<<<<<<< Updated upstream
=======
  var content = JSON.stringify(notify.content);

  console.log(content);
  if (content.length > 60 || content.includes(":")) {
    console.log(notify.content);
    notify.content = "Содержание в консоли";
  }
>>>>>>> Stashed changes
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
