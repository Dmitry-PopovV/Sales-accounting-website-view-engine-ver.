async function disconnect() {
    const body = {
        purpose: "disconnect"
    };
    let res = await fetch("/db/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body)
    });
    if (res.status === 200) {
        location.reload();
    }
    else {
        console.error("disconnect error");
    }

}

let catalog = [];

async function getCatalog() {
    const body = {
        purpose: "getCatalog"
    };
    let res = await fetch("/db/getCatalog", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body)
    });
    return await res.json();
}

function goToMain() {
    document.location = "/";
}

async function updateList() {
    let catalogEl = [];

    for (let i = 0; i < catalog.length; i++) {
        let check = document.getElementById("ch" + i);
        if (check.checked === true) {
            catalogEl.push(i);
        }
    }

    const obj = {
        catalogEl: catalogEl,
        dateFrom: document.getElementById('dateFrom').value,
        dateTo: document.getElementById('dateTo').value
    }

    const body = {
        purpose: "getOrders",
        obj: obj
    };

    let res = await fetch("/db/getOrders", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body)
    });

    let resBody;
    if (res.status === 200) {
        document.getElementById('test').textContent = '';
        resBody = await res.json();
        document.getElementById('table').remove();
        let newTable = document.createElement("div");
        let str = "<div class='item'>Дата</div><div class='item'>Тип</div><div class='item'>Цена</div><div class='item'>Количество</div>";
        resBody.forEach((val) => {
            val.forEach((val, i) => {
                if(i === 0) {
                    str += "<div class='item'>" + val.slice(0, 11) + "</div>";
                } else if (i === 2) {
                    str += "<div class='item'>" + val + " руб.</div>";
                } else {
                    str += "<div class='item'>" + val + "</div>";
                }
            });
        });
        newTable.setAttribute("id", "table");
        newTable.innerHTML = str;
        document.getElementById('tableRoot').append(newTable);
    }
    else {
        console.error("commit error");
        if (res.status === 400)
            document.getElementById('test').textContent = "Не выбран не один тип";
    }


}

getCatalog()
    .then((val) => {
        catalog = val;
        let str = '';
        val.forEach((val, i) => { str += "<div><input type='checkbox' id='ch" + i + "' value='" + i + "'>" + val[0] + "</div>" });
        document.getElementById('catalogSelect').innerHTML = str;
    });

document.getElementById('goToMain').addEventListener("click", goToMain);

document.getElementById('update').addEventListener("click", updateList);

document.getElementById('disconnect').addEventListener("click", disconnect);