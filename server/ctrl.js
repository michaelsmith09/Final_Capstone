const data = require('../data/cards.json');
// let turn = 0;


module.exports = {

    getCards: (req, res) => {

        res.status(200).send(data);
    },
    addTurn: (req, res) => {
        // turn++;
        res.status(200).send({ turn });

    },

};