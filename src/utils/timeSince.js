export default function timeSince(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;
  var s;
  var num;
  if (interval > 1) {
    num = Math.floor(interval);
    s = num === 1 ? "" : "s";
    return num + " year" + s + " ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    num = Math.floor(interval);
    s = num === 1 ? "" : "s";
    return num + " month" + s + " ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    num = Math.floor(interval);
    s = num === 1 ? "" : "s";
    return num + " day" + s + " ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    num = Math.floor(interval);
    s = num === 1 ? "" : "s";
    return num + " hour" + s + " ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    num = Math.floor(interval);
    s = num === 1 ? "" : "s";
    return num + " minute" + s + " ago";
  }
  num = Math.floor(seconds);
  s = num === 1 ? "" : "s";
  return num + " second" + s + " ago";
}
