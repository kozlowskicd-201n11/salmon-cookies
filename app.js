'use strict';

var randCustomers = function(min, max) {
    return (Math.random() * (max-min) + min)
}

var storeHours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
//document.getElementById('hours').textContent = storeHours;

var makeSales = function(store) {
    for (var i = 0; i < 15; i++) {
        store.cookiesSold.push(Math.round(randCustomers(store.min, store.max) * store.avg));       
    }
}
var firstPike = {
    min: 23,
    max: 65,
    avg: 6.3,
    cookiesSold: [],
}


makeSales(firstPike);
//document.getElementById('firstPike').textContent = firstPike.cookiesSold;


 var makePerHour = function(store) {
        for (var i = 0; i < 15; i++) {
        var tableId = document.getElementById(store);
        var newRow = tableId.insertRow(-1);
        var newCell = newRow.insertCell(0);
        var newText = document.createTextNode(storeHours[i] + ' --- ' + firstPike.cookiesSold[i] + ' cookies sold');
        newCell.appendChild(newText);
    }
}


makePerHour('firstPike');

// var seaTac = {
//     min: 3,
//     max: 24,
//     avg: 1.2,
//     cookiesSold: [],
// }

// makeSales(seaTac);
// document.getElementById('seaTac').textContent = seaTac.cookiesSold;

// var seaCenter = {
//     min: 11,
//     max: 38,
//     avg: 3.7,
//     cookiesSold: [],
// }

// makeSales(seaCenter);
// document.getElementById('seaCenter').textContent = seaCenter.cookiesSold;

// var capHill = {
//     min: 20,
//     max: 38,
//     avg: 2.3,
//     cookiesSold: [],
// }

// makeSales(capHill);
// document.getElementById('capHill').textContent = capHill.cookiesSold;

// var alki = {
//     min: 2,
//     max: 16,
//     avg: 4.6,
//     cookiesSold: [],
// }

// makeSales(alki);
// document.getElementById('alki').textContent = alki.cookiesSold;