
var gui = require("nw.gui"); // node-webkit
var win = gui.Window.get();
var windowMaximized = false;
win.minimize();
win.restore();

// show devtools to debug
win.showDevTools();



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



});//end ready

win.on('unmaximize', function(){
  windowMaximized = false;
  $("#window_max").text("crop_landscape");
});

win.on('maximize', function(){
  windowMaximized = true;
  $("#window_max").text("filter_none");
});
