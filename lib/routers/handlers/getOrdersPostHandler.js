const getOrdersAll = require('../../services/getOrdersAll');
const getOrdersBefore = require('../../services/getOrdersBefore');
const getOrdersFrom = require('../../services/getOrdersFrom');
const getOrdersBetween = require('../../services/getOrdersBetween');

function getOrdersPostHandler() {
    return (req, res) => {
        let receivedCatElements = req.body["obj"]["catalogEl"];
        const receivedDateFrom = req.body["obj"]["dateFrom"];
        const receivedDateTo = req.body["obj"]["dateTo"];
        if (receivedCatElements[0] === undefined) {
            res.sendStatus(400);
        } else {
            receivedCatElements.forEach((el, i) => { receivedCatElements[i] = (Number(receivedCatElements[i])) + 1; });
            if ((receivedDateFrom === '') && (receivedDateTo === '')) {
                getOrdersAll(receivedCatElements, req.dbConnection)
                    .then((arr) => {
                        res.json(arr);
                    });
            } else if (receivedDateFrom === '') {
                getOrdersBefore(receivedCatElements, receivedDateTo, req.dbConnection)
                    .then((arr) => {
                        res.json(arr);
                    });
            } else if (receivedDateTo === '') {
                getOrdersFrom(receivedCatElements, receivedDateFrom, req.dbConnection)
                    .then((arr) => {
                        res.json(arr);
                    });
            } else {
                getOrdersBetween(receivedCatElements, receivedDateFrom, receivedDateTo, req.dbConnection)
                    .then((arr) => {
                        res.json(arr);
                    });
            }
        }
    }
}

module.exports = getOrdersPostHandler;
