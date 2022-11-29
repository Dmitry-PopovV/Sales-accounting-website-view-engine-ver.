const addOrders = require('../../services/addOrders');

function sellPostHandler() {
    return (req, res) => {
        const receivedDate = req.body["obj"]["date"];
        const receivedOrderList = req.body["obj"]["orderList"];
        const IsIncorrectBool1 = receivedOrderList.find(el => el.find(ell => isNaN(ell)) !== undefined) !== undefined;
        if (receivedDate === '') {
            res.status(400);
            res.send("Не указана дата");
        }
        else if (IsIncorrectBool1) {
            res.status(400);
            res.send("Указаны некорректные данные(Не являются числом)");
        }
        else {
            receivedOrderList.forEach((el, i) => receivedOrderList[i][0] = Number(receivedOrderList[i][0])+1);
            const IsIncorrectBool2 = receivedOrderList.find(el => el.find(ell => ell < 1) !== undefined) !== undefined;
            if(IsIncorrectBool2) {
                res.status(400);
                res.send("Указаны некорректные данные(Меньше 1)");
            }
            else {
            addOrders(req.body["obj"], req.myIdVal, req.dbConnection);
            res.sendStatus(200);
            }
        }
    }
}

module.exports = sellPostHandler;
