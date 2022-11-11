console.log("hello");
const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams.get("winner"));


document.getElementById("start-game").setAttribute("href") = `your.newurl.com?p1_name=${variable}`

<a id="start-game" href=""></a>

document.getElementById("winner").textContent = urlSearchParams.get("winner")
