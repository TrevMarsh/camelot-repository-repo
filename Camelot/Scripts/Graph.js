﻿$(function () {
    // reference the hub
    var sessionhub = $.connection.sessionMini;
    // start connection
    $.connection.hub.start().done(function () {
        getChartData(0);
    });
    // Notify while changes
    sessionhub.client.updateGraph = function (roundID) {
        getChartData(roundID)
    }
});


function getChartData(roundID) {
    var json = JSON.stringify({
        'roundID': roundID
    });

    $.ajax({
        url: "/Voting/GetChartData",
        data: json,
        contentType: 'application/json ; charset:utf-8',
        type: "POST",
        dataType: "json",
        success: function (data) {
            drawChart(data);
        },
        error: function (e) {
            alert(e);
        }
    });
}

function drawChart(chartData) {
    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
        animation: {
            duration: 10000
        },
        datasets: chartData
    };

    var options = {
        title: {
            display: true,
            text: "Votes"
        },
        layout: {
            padding: {
                left: 10,
                top: 5,
                bottom: 5,
                right: 50
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            points: {
                borderWidth: 2,
                borderColor: 'rgb(0, 0, 0)'
            }
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    display: true,
                    min: 1,
                    max: 5,
                    stepSize: 2,
                    maxRotation: 0,
                    autoskip: 0,
                    maxTicksLimit: 5
                },
                gridLines: {

                }
            }],

            xAxes: [{
                display: true,
                ticks: {
                    display: true,
                    min: 1,
                    max: 5,
                    stepSize: 2,
                    maxTicksLimit: 5,
                    maxRotation: 0,
                    autoskip: true,
                    beginAtZero: true
                }
            }],
        },
        legend: {
            display: false,
            position: 'left'
        },
        tooltips: {
            mode: 'point'
        }
    };

    // For a bubble chart
    var bubbleChart = new Chart(ctx, {
        type: 'bubble',
        labels: chartData.Names,
        data: data,
        options: options
    });
}