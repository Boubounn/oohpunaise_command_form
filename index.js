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
}
var orderTable = [];

function serializeOrder(order) {
    var serializedOrder = {};
    order.forEach(el => {
        serializedOrder[el.name] = el.value;
        return serializedOrder
    })
    addPrice(serializedOrder)
    return serializedOrder
}


function createOrder() {
    let order = $('form').serializeArray();
    console.log(order);
    
    return order;
}

function addPrice(order) {
    Object.assign(order, {price: computePrice(PRICES, order.nbOfPerson, order.petsAndBabies, order.type, order.background)});
}

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

function addOrderToTable(order) {
    orderTable.push(order);
}

$("#next").click(() => {
    let initialOrder = createOrder();
    let order = serializeOrder(initialOrder);
    addOrderToTable(order);
    document.getElementById('orderForm').reset();
    // console.log(order);
    // console.log(localStorage);
});

$('#submit').click(() => {
   let orderTableJSON = JSON.stringify(orderTable);
    console.log(orderTableJSON);
})