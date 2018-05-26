'use strict';

var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', 'noon', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var totalCookiesPerHour = 0;
var totalTotalCookies = 0;
var allStores = [];


function MakeLocation(storeName, minCustPerHour, maxCustPerHour, avgSoldPerHour) {
    this.storeName = storeName;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.avgSoldPerHour = avgSoldPerHour;
    this.custPerHour = [];
    this.cookiesSoldPerHour = [];
    this.totalCookies = 0;
    this.makeCustomers = function() {
        for(var i = 0; i < storeHours.length; i++) {
            this.custPerHour.push(Math.round(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour))
        }
    }
    this.makeSales = function() {
        for (var ii = 0; ii < storeHours.length; ii++) {
            this.cookiesSoldPerHour.push(Math.round(this.custPerHour[ii] * this.avgSoldPerHour))
            this.totalCookies += this.cookiesSoldPerHour[ii];  
        }
        totalTotalCookies += this.totalCookies;
    }
    this.makeCustomers();
    this.makeSales();
    allStores.push(this);
}

function makeAllLocations() {
    new MakeLocation('First and Pike', 25, 63, 6.3);
    new MakeLocation('SeaTac Airport', 3, 24, 1.2);
    new MakeLocation('Seattle Center', 11, 38, 3.7);
    new MakeLocation('Capitol Hill', 20, 38, 2.3);
    new MakeLocation('Alki', 2, 16, 4.6);
}

makeAllLocations();

var render = function() {
    storeHours.unshift('Store Name');
    storeHours.push('Daily Totals');
    for (var i = 0; i < allStores.length; i++) {
        allStores[i].cookiesSoldPerHour.unshift(allStores[i].storeName);
        allStores[i].cookiesSoldPerHour.push(allStores[i].totalCookies);
        allStores[i].totalCookies += totalTotalCookies;
    }

    var tableEl = document.getElementById("salesTable");

    function insertTableRow(array) {
        var trEl = document.createElement("tr");
        for (var i = 0; i < array.length; i++) {
            var tdEl = document.createElement("td");
            tdEl.textContent = array[i];
            trEl.appendChild(tdEl);
        }
        tableEl.appendChild(trEl);
    }

    insertTableRow(storeHours);

    for (var i = 0; i < allStores.length; i++) {
        insertTableRow(allStores[i].cookiesSoldPerHour);
    }
}

render();

var pEl = document.getElementById("total");
pEl.textContent = "Total number a cookies needed for the day: " + totalTotalCookies;




