﻿$(function () {
    // reference the hub
    var sessionhub = $.connection.sessionMini;
    // start connection
    $.connection.hub.start().done(function () {
        // do nothing yet and wait for the host/server to post a topic
    });

    // Notify while changes
    sessionhub.client.updateVoteControls = function (round) {
        getControls(round);
    }
});

function getControls(model) {
    // contintue here! use the value of the text label of the user and pass it along to keep a new vm company
    var user = $('#participant').text();
    var color = rgb2hex($('#color').css('backgroundColor'));

    var section = $('#votingControls');
    var json = JSON.stringify({
        'round': model,
        'user': user,
        'color': color
    });
    $.ajax(
    {
        url: '/Voting/GetVotingControls',
        data: json,
        contentType: 'application/json ; charset:utf-8',
        type: 'POST',
        dataType: 'html',
        success: function (result) {
            section.empty().append(result);
        },
        error: function (e) {
            alert(e);
        }
    });
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}





