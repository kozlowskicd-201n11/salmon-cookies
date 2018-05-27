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
        for(var i = 0; i < 15; i++) {
            this.custPerHour.push(Math.round(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour))
        }
    }
    this.makeSales = function() {
        for (var ii = 0; ii < 15; ii++) {
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

var pEl = document.getElementById("total");
pEl.textContent = totalTotalCookies;

var storeForm = document.getElementById("storeForm");

function addNewStoreFunc(event) {
    event.preventDefault();
    if (!event.target.storeName.value || !event.target.minCust.value || !event.target.maxCust.value || !event.target.avgCookies.value) {
        return alert("Fields on the form cannot remain blank.  Please try again.");
    }
    else if (isNaN(event.target.minCust.value) || isNaN(event.target.maxCust.value) || isNaN(event.target.avgCookies.value)) {
        return alert("Min, Max, and Avg require numbers.  Numerals only, please!");
    }
    else {
        new MakeLocation(event.target.storeName.value, event.target.minCust.value, event.target.maxCust.value, event.target.avgCookies.value);
        event.target.storeName.value = null;
        event.target.minCust.value = null;
        event.target.maxCust.value = null;
        event.target.avgCookies.value = null;
        var x = allStores.length - 1;
        allStores[x].cookiesSoldPerHour.unshift(allStores[x].storeName);
        allStores[x].cookiesSoldPerHour.push(allStores[x].totalCookies);
        allStores[x].totalCookies += totalTotalCookies;
        insertTableRow(allStores[x].cookiesSoldPerHour);
        pEl.textContent = totalTotalCookies;
    }
}
storeForm.addEventListener('submit', addNewStoreFunc);