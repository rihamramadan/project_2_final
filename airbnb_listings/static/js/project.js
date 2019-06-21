const neighbourhoodselect = document.querySelector("#neighbourhoodselect");
const tableDiv = document.querySelector("#tableDiv");

let dataItems = [];

// Grab the data with d3

var monthly_price = monthly_price 
var availability_365 = availability_365
var number_of_reviews = number_of_reviews
var review_scores_rating = review_scores_rating
var reviews_per_month = reviews_per_month
var minimum_nights
var maximum_nights

var CSV = "/api/table_analysis";

d3.csv(CSV, function(response) {
    let totalMonthyPrice = 0.00, totalAvailability_365 = 0, TotalNumberOfReviews = 0,
        TotalReviewScoreRating = 0, TotalReviewsPerMonth = 0.00, TotalMinimumNights = 0, TotalMaximumNights = 0,
        TotalAccomodates = 0;

    if (response) {
        // Loop through data
        for (let i = 0; i < response.length; i++) {

            dataItems.push(response[i]);

            let totalMonthlyPriceWithoutDollar = response[i].monthly_price.replace("$", "").replace(",","");
            
            if (!totalMonthlyPriceWithoutDollar == "")
                totalMonthyPrice = totalMonthyPrice + parseFloat(monthly_price);

            totalAvailability_365 = totalAvailability_365 + parseInt(response[i].availability_365);
            TotalNumberOfReviews = TotalNumberOfReviews + parseInt(response[i].number_of_reviews);

            if (!response[i].review_scores_rating == "")
                TotalReviewScoreRating = TotalReviewScoreRating + parseInt(response[i].review_scores_rating);

            if (!response[i].reviews_per_month == "")
                TotalReviewsPerMonth = TotalReviewsPerMonth + parseFloat(response[i].reviews_per_month);

            TotalMinimumNights = TotalMinimumNights + parseInt(response[i].minimum_nights);
            TotalMaximumNights = TotalMaximumNights + parseInt(response[i].maximum_nights);
            // TotalAccomodates = TotalAccomodates + parseInt(response[i].accommodates);

        }

        let monthlyprice=totalMonthyPrice/12;
        let availability_year=totalAvailability_365/365;
        let tableProperties = "<table id='tableProjectAnalysis' >";
        tableProperties = tableProperties + "<thead><tr><th scope='col'>Features:</th><th scope='col'>Details</th></tr></thead>";
        tableProperties = tableProperties + "<tr><td>Avg. Monthly Income </td><td> $" + numberWithCommas(monthlyprice.toFixed(2)) + "</td></tr>";
        tableProperties = tableProperties + "<tr><td>Availability(year) </td><td>" + numberWithCommas(availability_year.toFixed(2)) + "</td></tr>";
        tableProperties = tableProperties + "<tr><td>Number of Reviews </td><td>" + numberWithCommas(TotalNumberOfReviews) + "</td></tr>";
        // tableProperties = tableProperties + "<tr><td>Total Review Score Rating: " + TotalReviewScoreRating + "</td></tr>";
        tableProperties = tableProperties + "<tr><td>Reviews Per Month </td><td>" + numberWithCommas(TotalReviewsPerMonth.toFixed(2)) + "</td></tr>";
        tableProperties = tableProperties + "<tr><td>Minimum Stay </td><td>" + numberWithCommas(TotalMinimumNights) + "</td></tr>";
        tableProperties = tableProperties + "<tr><td>Maximum Stay </td><td>" + numberWithCommas(TotalMaximumNights) + "</td></tr>";
        // tableProperties = tableProperties + "<tr><td>Total Accomodates </td><td>" + TotalAccomodates + "</td></tr>";
        tableProperties = tableProperties + "</table>";

        tableDiv.innerHTML = tableProperties;
    }
});

function neighbourhoodselectEventHandler(event) {

    let val = this.value;
    let totalMonthyPrice = 0.00, totalAvailability_365 = 0, TotalNumberOfReviews = 0,
        TotalReviewScoreRating = 0, TotalReviewsPerMonth = 0.00, TotalMinimumNights = 0, TotalMaximumNights = 0,
        TotalAccomodates = 0;

    let filteredDataItems = [];

    if (val == "Chicago") {

        filteredDataItems = dataItems;
    }
    else {
        filteredDataItems = dataItems.filter(function (dataItem) {
            return dataItem.neighbourhood.toLowerCase().indexOf(val.toLowerCase()) !== -1;
        });

    }

    for (let i = 0; i < filteredDataItems.length; i++) {

        let totalMonthlyPriceWithoutDollar = filteredDataItems[i].monthly_price.replace("$", "").replace(",", "");

        if (!totalMonthlyPriceWithoutDollar == "")
            totalMonthyPrice = totalMonthyPrice + parseFloat(totalMonthlyPriceWithoutDollar);

        totalAvailability_365 = totalAvailability_365 + parseInt(filteredDataItems[i].availability_365);
        TotalNumberOfReviews = TotalNumberOfReviews + parseInt(filteredDataItems[i].number_of_reviews);

        // if (!filteredDataItems[i].review_scores_rating == "")
        //     TotalReviewScoreRating = TotalReviewScoreRating + parseInt(filteredDataItems[i].review_scores_rating);

        if (!filteredDataItems[i].reviews_per_month == "")
            TotalReviewsPerMonth = TotalReviewsPerMonth + parseFloat(filteredDataItems[i].reviews_per_month);

        TotalMinimumNights = TotalMinimumNights + parseInt(filteredDataItems[i].minimum_nights);
        TotalMaximumNights = TotalMaximumNights + parseInt(filteredDataItems[i].maximum_nights);
        // TotalAccomodates = TotalAccomodates + parseInt(filteredDataItems[i].accommodates);
    }

    let monthlyprice=totalMonthyPrice/12;
    let availability_year=totalAvailability_365/365;
    let tableProperties = "<table id='tableProjectAnalysis' >";
    tableProperties = tableProperties + "<thead><tr><th scope='col'>Features:</th><th scope='col'>Details</th></tr></thead>";
    tableProperties = tableProperties + "<tr><td>Monthly Income </td><td> $" + numberWithCommas(monthlyprice.toFixed(2)) + "</td></tr>";
    tableProperties = tableProperties + "<tr><td>Availability (year) </td><td>" + numberWithCommas(availability_year.toFixed(2)) + "</td></tr>";
    tableProperties = tableProperties + "<tr><td>Number of Reviews </td><td>" + numberWithCommas(TotalNumberOfReviews) + "</td></tr>";
    // tableProperties = tableProperties + "<tr><td>Total Review Score Rating: " + TotalReviewScoreRating + "</td></tr>";
    tableProperties = tableProperties + "<tr><td>Reviews Per Month </td><td>" + numberWithCommas(TotalReviewsPerMonth.toFixed(2)) + "</td></tr>";
    tableProperties = tableProperties + "<tr><td>Minimum Stay </td><td>" + numberWithCommas(TotalMinimumNights) + "</td></tr>";
    tableProperties = tableProperties + "<tr><td>Maximum Stay </td><td>" + numberWithCommas(TotalMaximumNights) + "</td></tr>";
    // tableProperties = tableProperties + "<tr><td>Total Accomodates </td><td>" + TotalAccomodates + "</td></tr>";
    tableProperties = tableProperties + "</table>";

    tableDiv.innerHTML = tableProperties;
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

neighbourhoodselect.addEventListener("change", neighbourhoodselectEventHandler);

