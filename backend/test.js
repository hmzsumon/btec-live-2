// var today = new Date();
// var tomorrow = new Date();
// tomorrow.setDate(today.getDate() + 2);
// console.log(tomorrow.toDateString());

const currentTime = new Date().toLocaleString().split(',')[1].trim();
console.log(currentTime);
