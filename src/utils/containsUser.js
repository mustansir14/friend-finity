export default function containsUser(id, list) {
  var x;
  for (x in list) {
    if (list[x].userID === id) {
      return true;
    }
  }
  return false;
}
