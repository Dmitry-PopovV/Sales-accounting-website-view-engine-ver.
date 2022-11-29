export class RowContext {
    constructor(cat) {
    this.catalog = cat;
    this.rowName = "firstRow";
    this.count = 0;
    }

    addRow () {
        let newRow = document.createElement("div");
        let str = "";
        this.catalog.forEach((val, i) => {str += "<option value='" + i + "'>" + val[0] + "</option>"});
        newRow.setAttribute("class", this.rowName);
        newRow.setAttribute("id", this.count + "d");
        newRow.innerHTML = '<div><select id="' + this.count + 's">' + str + '</select></div><div><input type="number" min="0" value="0" id="' + this.count + 'p"></div><div><input type="number" min="0" value="0" id="' + this.count + 'n"></div>';
        document.getElementById('table').append(newRow);
        this.count++;
    }

    delRow () {
        document.querySelector(".row:last-of-type").remove();
        if (this.count > 0) {
            this.count--;
        }
    }

    setSum () {
        let sum = 0;
        for (let i = 0; i < this.count; i++) {
            const s = document.getElementById(i + 's').value;
            const p = document.getElementById(i + 'p').value;
            const n = document.getElementById(i + 'n').value;
            if (p <= 0) 
                sum += this.catalog[s][1] * n;
            else
                sum += p * n;
        }
        document.getElementById("sumNum").textContent = sum;
    }

    orderList () {
        let list = [];
        for (let i = 0; i < this.count; i++) {
            let el = [];
            el[0] = document.getElementById(i + 's').value;
            const p = document.getElementById(i + 'p').value;
            el[2] = document.getElementById(i + 'n').value;
            if (p <= 0) 
                el[1] = this.catalog[el[0]][1];
            else
                el[1] = p;
            list[i] = el;
        }
        return list;
    }

}