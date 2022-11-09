console.log("hello");
const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams.get("winner"));

document.getElementById("winner").textContent = urlSearchParams.get("winner")
