
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

//set the window's minimum size
win.setMinimumSize(545, 545);

// get all of the dot html templates
//var viewPartials = require('dot').process({ path: "./views"});

// require xlsx module so we can read Excel files.
//if(typeof require !== 'undefined') XLSX = require('xlsx');

//use the fs node module to read text files
fs = require('fs');

//$("#page").html(viewPartials.login);

//Function to open up a notification on the top of the page. Type is a string: alert, success, or info.
// Message is a string representing the message you want the user to see.
//function Notification(type, message) {
  //clear the old timeout
  //window.clearTimeout(timeoutID);
  //make a new one. Pretty much restarting the timer.
  //timeoutID = window.setTimeout(function(){$(".notice").slideUp(250)},5000);
  //$(".notice").html(viewPartials.notice({type: type, message: message})).slideDown(250);
//}//end Notification


//main javascript bullshit goes here
$(document).ready(function() {

  //window controls
  $(".window_close").click(function(){
    //after things get complicated use win.on close to do shutdown work before exiting
    win.close();
  });
  $(".window_max").click(function(){
    if(windowMaximized)
    {
      win.unmaximize();
      windowMaximized = false;
      $(".window_max").text("crop_landscape");
    }
    else
    {
      win.maximize();
      windowMaximized = true;
      $(".window_max").text("filter_none");
    }
  });
  $(".window_min").click(function(){
    win.minimize();
  });

  //if the log in menu button is clicked
  $("body").on('click', '#menu_login', function(){
    window.location.href = '#/login';
  });

  //if the upload 837 menu button is clicked
  $("body").on('click', '#menu_upload', function(){
    window.location.href = '#/upload';
  });
  $("body").on('click', '#init', function(){
    $.material.init();
  });

});//end ready


// Events called when the window is maximized or minimized so we can change the header window icons.
win.on('unmaximize', function(){
  windowMaximized = false;
  $("#window_max").text("crop_landscape");
});
win.on('maximize', function(){
  windowMaximized = true;
  $("#window_max").text("filter_none");
});
