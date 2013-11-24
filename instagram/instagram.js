$(document).ready(function() {

	var nflPromise, nbaPromise, nhlPromise, fifaPromise, nflLoad, nbaLoad, nhlLoad, fifaLoad;

    nflPromise = $.ajax({
        url: "https://api.instagram.com/v1/tags/nfl/media/recent?access_token=1285990.ec566ad.debd7e9b132349fcb41b78cd5c869012",
        dataType: "jsonp"

    });

    nbaPromise = $.ajax({
        url: "https://api.instagram.com/v1/tags/nba/media/recent?access_token=1285990.ec566ad.debd7e9b132349fcb41b78cd5c869012",
        dataType: "jsonp"

    });

    nhlPromise = $.ajax({
        url: "https://api.instagram.com/v1/tags/nhl/media/recent?access_token=1285990.ec566ad.debd7e9b132349fcb41b78cd5c869012",
        dataType: "jsonp"

    });

    fifaPromise = $.ajax({
    	url: "https://api.instagram.com/v1/tags/fifa/media/recent?access_token=1285990.ec566ad.debd7e9b132349fcb41b78cd5c869012",
        dataType: "jsonp"
    });

    failCallback = function ( jqXHR, textStatus, errorThrown ) {};

    nflLoad = function(json) {
    	for (var i = 0; i < 10; i++) {
            $(".pics").append("<a target='_blank' href='" + json.data[i].link +
            "'><img src='" + json.data[i].images.low_resolution.url +"'></img></a>");
        }
    }

    nbaLoad = function(json) {
    	for (var i = 0; i < 10; i++) {
            $(".pics").append("<a target='_blank' href='" + json.data[i].link +
            "'><img src='" + json.data[i].images.low_resolution.url +"'></img></a>");
        }
    }

    nhlLoad = function(json) {
    	for (var i = 0; i < 10; i++) {
            $(".pics").append("<a target='_blank' href='" + json.data[i].link +
            "'><img src='" + json.data[i].images.low_resolution.url +"'></img></a>");
        }
    }

    fifaLoad = function(json) {
    	for (var i = 0; i < 10; i++) {
            $(".pics").append("<a target='_blank' href='" + json.data[i].link +
            "'><img src='" + json.data[i].images.low_resolution.url +"'></img></a>");
        }
    }

    $('.nfl').on('click', function(){	
    $('.pics').empty();
	nflPromise.done(nflLoad).fail(failCallBack);
	return false;
	});

	$('.nba').on('click', function(){
	$('.pics').empty();
	nbaPromise.done(nbaLoad).fail(failCallBack);
	return false;
	});

	$('.nhl').on('click', function(){
	$('.pics').empty();	
	nhlPromise.done(nhlLoad).fail(failCallBack);
	return false;
	});

	$('.fifa').on('click', function(){
	$('.pics').empty();
	fifaPromise.done(fifaLoad).fail(failCallBack);
	return false;
	});

});