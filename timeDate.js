function displayDateTime() {

//------------------------ Showing Date -------------------------------

  const showDate = document.querySelector(".date");
  let today = new Date();
  let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
  let month = `${today.getMonth() < 10 ? "0" : ""}${today.getMonth() + 1}`;
  let year = `${today.getFullYear() < 10 ? "0" : ""}${today.getFullYear()}`;

  showDate.textContent = `${day}/${month}/${year}`;

  //------------------------ Showing Time --------------------------------
  
  const showTime = document.querySelector(".time");

  let hour = `${today.getHours() < 10 ? "0" : ""}${today.getHours()}`;
  let min = `${today.getMinutes() < 10 ? "0" : ""}${today.getMinutes()}`;
  let sec = `${today.getSeconds() < 10 ? "0" : ""}${today.getSeconds()}`;

  const ap = hour >= 12 ? "PM" : "AM";

  showTime.innerHTML = `${hour}-${min}-${sec} ${ap}`;
}

setInterval(displayDateTime, 1000);
