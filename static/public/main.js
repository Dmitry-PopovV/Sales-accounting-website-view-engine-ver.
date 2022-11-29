import { RowContext } from "./RowContext.js"

let rowContext;

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

async function sell() {
    let obj = {
        date: document.getElementById('date').value,
        orderList: rowContext.orderList(),
    };

    const body = {
        purpose: "sell",
        obj: obj
    };
    let res = await fetch("/db/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(body)
    });
    if (res.status === 200) {
        location.reload();
    }
    else {
        if (res.status === 400)
            document.getElementById('test').textContent = await res.text();
    }
}

function goToList() {
    document.location = "/list";
}

getCatalog()
    .then(res => {
        rowContext = new RowContext(res);
        rowContext.addRow();
        rowContext.rowName = "row";

        document.getElementById('addButton').addEventListener("click", rowContext.addRow.bind(rowContext));

        document.getElementById('delButton').addEventListener("click", rowContext.delRow.bind(rowContext));
        document.getElementById('delButton').addEventListener("click", rowContext.setSum.bind(rowContext));

        document.getElementById('table').addEventListener("change", rowContext.setSum.bind(rowContext));

        document.getElementById('sell').addEventListener("click", sell);

    });

document.getElementById('goToList').addEventListener("click", goToList);

document.getElementById('disconnect').addEventListener("click", disconnect);
