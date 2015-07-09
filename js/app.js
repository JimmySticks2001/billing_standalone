
var gui = require("nw.gui"); // node-webkit
var win = gui.Window.get();
var windowMaximized = false;
//Store the timeoutID globally so we can remove the timer before setting a new one.
var timeoutID;

//quick fix for the no window shadow for frameless windows.
win.minimize();
win.restore();

// show devtools to debug
win.showDevTools();

// get all of the dot html templates
var viewPartials = require('dot').process({ path: "./views"});

$("#page").html(viewPartials.login);


//main javascript bullshit goes here
$(document).ready(function() {

  //window controls
  $("#window_close").click(function(){
    //after things get complicated use win.on close to do shutdown work before exiting
    win.close();
  });
  $("#window_max").click(function(){
    if(windowMaximized)
    {
      win.unmaximize();
      windowMaximized = false;
      $("#window_max").text("crop_landscape");
    }
    else
    {
      win.maximize();
      windowMaximized = true;
      $("#window_max").text("filter_none");
    }
  });
  $("#window_min").click(function(){
    win.minimize();
  });

  //if the log in button is clicked
  $("body").on('click', '#success', function(){
    //clear the old timeout
    window.clearTimeout(timeoutID);
    //make a new one. Pretty much restarting the timer.
    timeoutID = window.setTimeout(function(){$(".notice").slideUp(250)},5000);
    $(".notice").html(viewPartials.notice({type: "success", message: "Something has been successful"})).slideDown(250);
  });

  //if the log in button is clicked
  $("body").on('click', '#alert', function(){
    //clear the old timeout
    window.clearTimeout(timeoutID);
    //make a new one. Pretty much restarting the timer.
    timeoutID = window.setTimeout(function(){$(".notice").slideUp(250)},5000);
    $(".notice").html(viewPartials.notice({type: "alert", message: "This is an alert"})).slideDown(250);
  });

  //if the log in button is clicked
  $("body").on('click', '#info', function(){
    //clear the old timeout
    window.clearTimeout(timeoutID);
    //make a new one. Pretty much restarting the timer.
    timeoutID = window.setTimeout(function(){$(".notice").slideUp(250)},5000);
    $(".notice").html(viewPartials.notice({type: "info", message: "This is informative"})).slideDown(250);
  });


});//end ready


win.on('unmaximize', function(){
  windowMaximized = false;
  $("#window_max").text("crop_landscape");
});

win.on('maximize', function(){
  windowMaximized = true;
  $("#window_max").text("filter_none");
});
