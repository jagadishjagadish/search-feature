/*globals define, $, Handlebars */
define([], function () {
    "use strict";
    var render,
        search,
        searchEventHandle,
        selectSuggested;

    //search function
    search = function (textData, callback) {
        var searchText, cities, result = [], i;
        
        searchText = textData;
        cities = ["Bangalore", "Delhi", "Chennai", "Mumbai", "Pune", "Kolkata",
                    "Jaipur", "Punjab", "Hyderabad", "kochin", "Pondicherry",
                    "Paris", "New york", "Milan", "Zurich", "London", "Rome", "Amsterdam", "Brussels", "Berlin", "Frankfurt", "Munich", "Dublin", "Monacco", "Los Angeles", "Sydney", "Mexico"];

        for (i = 0; i < cities.length; i += 1) {
            var city;
            city = cities[i].toLowerCase();
            searchText = searchText.toLowerCase();
            if (city.search(searchText) > -1) {
                result.push(cities[i]);
            }
        }
        callback(result);
    };
    //search event handling
    searchEventHandle = function (searchtxt) {
        $(".search-suggestion").empty();
        if (searchtxt.length > 0) {
            search(searchtxt, function (result) {
                if (result.length > 0) {
                    var templateHtml, tempHtml;
                    
                    templateHtml = $("#template-search").html();
                    tempHtml = Handlebars.compile(templateHtml);
                    $(".search-result").html(tempHtml({result: result}));
                    render();
                }
            });
        }
    };

    selectSuggested = function (selectedTxt) {
        $("#search-box").val(selectedTxt);   //show selected city in input box
        $(".search-suggestion").empty();    //Clear the suggestions
    };

    render = function () {

        //search input event bind
        $("#search-box").off().on("keyup", function () {
            searchEventHandle($(this).val());
        });

        //search suggestions select event bind
        $(".list-item").off().on("click", function () {
            selectSuggested($(this).text());
        });

    };
    return {
        render: render
    };
});