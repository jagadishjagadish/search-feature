/*globals require, $ */
require.config({
    baseUrl: "app",
    paths: {
        "lib": "../lib",
        "text": "../lib/text"
    }
});
require(["search"], function (search) {
    "use strict";
    $("document").ready(function () {
        search.render();
    });
});