
var gui = require("nw.gui"); // node-webkit
var win = gui.Window.get();
//Store the state of the window.
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


//Function to open up a notification on the top of the page. Type is a string: alert, success, or info.
// Message is a string representing the message you want the user to see.
function Notification(type, message) {
  //clear the old timeout
  window.clearTimeout(timeoutID);
  //make a new one. Pretty much restarting the timer.
  timeoutID = window.setTimeout(function(){$(".notice").slideUp(250)},5000);
  $(".notice").html(viewPartials.notice({type: type, message: message})).slideDown(250);
}


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
    Notification("success", "Something has been successful");
  });

  //if the log in button is clicked
  $("body").on('click', '#alert', function(){
    Notification("alert", "This is an alert");
  });

  //if the log in button is clicked
  $("body").on('click', '#info', function(){
    Notification("info", "This is informative");
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
