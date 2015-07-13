/*global console, $, jQuery, window */
var APSAtable = (function () {
  'use strict';

  console.log('https://uab-apsa.googlecode.com/git/buildUABresearchTable.js ' + 
    'v1.1.1');

  //variables
  var curl, url, $, main, makeTable, frame, div;

  //variable declaration (for actual running)
  curl = 'https://uab-apsa.googlecode.com';
  url = curl + '/git/table.html#' + encodeURIComponent(document.location.href);

  //The below is for develoment purpose
  // curl = 'http://127.0.0.1:8000';
  // url = curl + '/table.html#' + encodeURIComponent(document.location.href);

  main = {};
  //Global functions
  //Actual table maker
  main.makeTable = function (divID) {
    // These functions require jQuery and a div id to
    // be pointed to, all other functionality is built in
    // divID should be a string.
    return makeTable(divID);
  };

  //Local functions
  makeTable = function (divID) {
    //variables

    //variable declarations

    //check input
    if (typeof jQuery !== "function") {
      console.error('jQuery must be defined to continue.');
    } else {
      $ = jQuery;
      div = $('#' + divID);
      if (div.length < 1) {
        console.error('Could not find div that was indicated, make sure one exists with id=[divID].');
      } else {
        div.empty();
        frame = $('<iframe>', {scrolling: 'no', seamless: "", frameborder: 0, allowTransparency:'true', width: '100%', src: url}).appendTo(div);
      }
    }
  };

  var receiver = function (evt) {
    if (evt.origin === curl) {
      var h = Number(evt.data);
      frame.height(h + 20);
    }
  };

  window.addEventListener('message', receiver, false);

  var updateSize = function () {
    frame[0].contentWindow.postMessage('height', url);
  };

  window.onresize = updateSize;

  return main;

}());