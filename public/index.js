const PRICES = {
    fullBody: {
        persons: 13,
        petsAndBabies: 10
    },
    halfBody: {
        persons: 8,
        petsAndBabies: 8
    },
    background: {
        custom: 25,
        house: 0,
        couch: 0,
        church: 0,
        sky: 0,
    }
};


function addPrice(order) {
    Object.assign(order, {price: computePrice(PRICES, order.nbOfPerson, order.petsAndBabies, order.type, order.background)});
};

function computePrice(prices, person, petsAndBabies, bodyType, background) {
    var increaseFullBodyPrice = 12;
    var increaseHalfBodyPrice = 7;
    var petsAndBabiesPrice = (prices[bodyType].petsAndBabies * petsAndBabies);
    
    if (person == 0) {
        return 0 + petsAndBabiesPrice + prices.background[background];
    }
    if (bodyType === 'fullBody') {
        return (prices[bodyType].persons + (parseInt(person) * increaseFullBodyPrice) - increaseFullBodyPrice) + petsAndBabiesPrice + prices.background[background];
    }

    if (bodyType === 'halfBody') {
        return (prices[bodyType].persons + (parseInt(person) * increaseHalfBodyPrice) - increaseHalfBodyPrice) + petsAndBabiesPrice + prices.background[background];
    }

};

function textModel(orders) {
    return orders.map(order => 
        String(`Commande: #${order.order}
        ${order.price}€
        Nb of Person: ${order.nbOfPerson}
        Pets/Babies: ${order.petsAndBabies}
        Type: ${order.type}
        Background: ${order.background}
        Details: ${order.details}\n\n`
    ));
};

module.exports = {
    addPrice,
    textModel
};


