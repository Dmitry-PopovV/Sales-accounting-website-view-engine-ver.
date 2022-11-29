let myCookie = /wrong/.test(document.cookie);

if (myCookie === true) {
    console.log("!");
    document.getElementById("wrong").textContent = "Неверно!";
}