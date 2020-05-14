// disable dragging of images
$("img").mousedown(function (e) {
  e.preventDefault()
});

function closeAlert() {
  var x = document.getElementById("alertbox");
  x.style.display = "none";
}

function okButton() {
  var x = document.getElementById("alertbox");
  x.style.display = "none";
  window.open('https://www.smarturl.it', '_blank');
}

function updateClock() {
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var suffix = "AM";
  if (minutes < 10) {
    // prefix 0 
    minutes = "0" + minutes;
  }
  if (hours === 0) {
    hours = "12"
  } else if (hours === 12) {
    suffix = "PM";
  } else if (hours > 12) {
    hours = hours % 12;
    suffix = "PM";
  }
  var currentTime = hours + ":" + minutes + " " + suffix;
  $(".time").html(currentTime);
}
var getTopZIndex = function () {
  var allDivs = $('.window');
  var topZindex = 0;
  var topDivId;
  allDivs.each(function () {
    var currentZindex = parseInt($(this).css('z-index'));
    if (currentZindex > topZindex) {
      topZindex = currentZindex;
      topDivId = this.id;
    }
  });
  return topZindex;
};
var openWindow = function (id) {
  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  if (isMobile) {
    $("#" + id).show();
    $("#" + id).css('z-index', getTopZIndex() + 1);
    $("#" + id).css('left', 80);
    $("#" + id).css('top', 50);
  } else {
    $("#" + id).show();
    $("#" + id).css('z-index', getTopZIndex() + 1);
    $("#" + id).css('left', 200);
    $("#" + id).css('top', 50);
  }
};
var openScumwebWindow = function (id) {
  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  if (isMobile) {
    $("#" + id).show();
    $("#" + id).css('z-index', getTopZIndex() + 1);
    $("#" + id).css('left', 80);
    $("#" + id).css('top', 50);
  } else {
    $("#" + id).show();
    $("#" + id).css('z-index', getTopZIndex() + 1);
    $("#" + id).css('left', 450);
    $("#" + id).css('top', 50);
  }
};

var createProgram = function (id, title, imgUrl, url, width, height) {
  $("#startbutton").after("<span class='program' id='start-bar-" + id + "' >" + title + "</span>");
  $("#start-bar-" + id).css('background-image', 'url(' + imgUrl + ')');
  var content = '<div class="window ui-widget" id="' + id + '">' + '<div class="window-inner">' + '<div class="window-header"><img class="window-header-icon" src="' + imgUrl + '" />' + '<p>' + title + '</p>' + ' <div class="window-icon close" ></div>' + '</div>' + '<div class="window-content" id="' + id + '-content">' + '<iframe id="frame" scrolling="no" width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allowfullscreen></iframe>'
  '</div>' + '</div>' + '</div>';
  $(".desktop").after(content);
  $(".window").draggable({
    handle: ".window-header",
    cursor: "move",
    containment: "window",
    stack: ".window"
  });
  //$(".window").resizable({
  //  handles: "n, e, s, w, ne, se, sw, nw",
  //  minHeight: 250,
  //  minWidth: 350
  //});
  // Prevent windows from moving on sibling being resized or closed
  $(".window").css({
    position: "absolute"
  });
  openWindow(id);
};
var createScumwebMobile = function (id, title, imgUrl, url, width, height) {
  $("#startbutton").after("<span class='program' id='start-bar-" + id + "' >" + title + "</span>");
  $("#start-bar-" + id).css('background-image', 'url(' + imgUrl + ')');
  var content = '<div class="window" id="' + id + '">' + '<div class="scumweb-window-inner">' + '<div class="scumweb-window-header"><img class="scumweb-window-header-top-left-button" src="./programs/scumweb/window_header_top_left_button.png" />' + '<p>' + title + '</p>' + '<img class="scumweb-window-header-top-right-button-right" src="./programs/scumweb/window_header_top_right_button_right.png" /><img class="scumweb-window-header-top-right-button-left" src="./programs/scumweb/window_header_top_right_button_left.png" />' + '</div>' + '<div class="scumweb-window-content" id="' + id + '-content">' + '<iframe id="frame" scrolling="no" width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allowfullscreen></iframe>'
  '</div>' + '</div>' + '</div>';
  $(".desktop").after(content);
  $(".window").draggable({
    handle: ".scumweb-window-header",
    cursor: "move",
    containment: "window",
    stack: ".window"
  });
  //$(".window").resizable({
  //  handles: "n, e, s, w, ne, se, sw, nw",
  //  minHeight: 250,
  //  minWidth: 350
  //});
  // Prevent windows from moving on sibling being resized or closed
  $(".window").css({
    position: "absolute"
  });
  openScumwebWindow(id);
};
var createScumwebDesktop = function (id, title, imgUrl, url, width, height) {
  $("#startbutton").after("<span class='program' id='start-bar-" + id + "' >" + title + "</span>");
  $("#start-bar-" + id).css('background-image', 'url(' + imgUrl + ')');
  var content = '<div class="window" id="' + id + '">' + '<div class="scumweb-window-inner">' + '<div class="scumweb-window-header"><img class="scumweb-window-header-top-left-button" src="./programs/scumweb/window_header_top_left_button.png" /> <img class="title-bars" src="./programs/scumweb/bars.png" /><img class="scumweb-window-header-top-right-button-right" src="./programs/scumweb/window_header_top_right_button_right.png" /><img class="scumweb-window-header-top-right-button-left" src="./programs/scumweb/window_header_top_right_button_left.png" />' + '</div>' + '<div class="scumweb-window-content" id="' + id + '-content">' + '<iframe id="frame" scrolling="no" width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allowfullscreen></iframe>'
  '</div>' + '</div>' + '</div>';
  $(".desktop").after(content);
  $(".window").draggable({
    handle: ".scumweb-window-header",
    cursor: "move",
    containment: "window",
    stack: ".window"
  });
  //$(".window").resizable({
  //  handles: "n, e, s, w, ne, se, sw, nw",
  //  minHeight: 250,
  //  minWidth: 350
  //});
  // Prevent windows from moving on sibling being resized or closed
  $(".window").css({
    position: "absolute"
  });
  openScumwebWindow(id);
};
var isWindowMaximised = function (id) {
  var targetId = $("#" + id);
  console.log("desktop width " + $(window).width());
  console.log("window width " + targetId.outerWidth());
  if (targetId.outerWidth() < $(window).width()) {
    return false;
  } else //(targetId.outerWidth() $(window).width) 
  {
    return true;
  }
}
var isWindowOpen = function (id) {
  if ($("#start-bar-" + id).length > 0) {
    return true;
    console.log("window open");
  } else {
    return false;
    console.log("window does not exist");
  }
};
var closeProgram = function (id) {
  $("#start-bar-" + id).remove();
  $("#" + id).remove();
};
var minimiseProgram = function (id) {
  $("#start-bar" + id).toggleClass("focused");
};

var setIcon = function () {
  if ($(this).data("icon")) {
    var icon = $(this).data("icon");
    $(this).css('background-image', "url(" + icon + ")");
  } else {
    console.log("no icon supplied")
  }
}
$(document).ready(function () {
  setInterval(updateClock(), 1000);
  //start up music
  //var audio = new Audio('./audio/win98.ogg');   // OG startup audio
  var audio = new Audio('./audio/startupsound.mp3');
  audio.play();
  //load clippy after 3 seconds
  setTimeout(loadClippy, 3000);
  function loadClippy() {
  clippy.load('Clippy', function(agent) {
  agent.show();
  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  if (isMobile) {
    agent.moveTo(350,610);
  }
  else {
    agent.moveTo(1200,630);
  }
  agent.speak("Damn shawty you're flexed up. Would you like some help?");
  });
  }
  //this creates a *new* program window for scumweb on page load instead of opening the already existing scumweb program window. find fix.
  let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  if (isMobile) {
    var targetId = "scumweb";
    var title = "scumweb";
    var imgUrl = "./images/icons/scumweb-16x16.png";
    var url = "./programs/scumweb-mobile/index.html";
    var width = "410";
    var height = "400";
    if (!isWindowOpen(targetId)) {
      createScumwebMobile(targetId, title, imgUrl, url, width, height);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
    } else {
      openWindow(targetId);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
      console.log("program already exists... opening window")
    };
  } else {
    var targetId = "scumweb";
    var title = "scumweb";
    var imgUrl = "./images/icons/scumweb-16x16.png";
    var url = "./programs/scumweb/index.html";
    var width = "500";
    var height = "459";
    if (!isWindowOpen(targetId)) {
      createScumwebDesktop(targetId, title, imgUrl, url, width, height);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
    } else {
      openScumwebDesktopWindow(targetId);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
      console.log("program already exists... opening window")
    };
  }
  // toggle start menu 
  $("#startbutton").click(function () {
    $("#startbutton").toggleClass("startbutton-on");
    $('#menu').toggle();
  });
  // close start menu if desktop clicked
  $(".desktop").click(function () {
    // Depress windows start button animation 
    $("#startbutton").removeClass("startbutton-on");
    // hide start menu 
    $('#menu').hide();
  });
  // bind event listeners to programs in task
  $(".startbar").on("click", ".program", function (event) {
    // identify program id that is currently clicked
    var id = $(this).attr('id');
    var windowId = id.substring(10);
    console.log(windowId);
    // is program window currently open? 
    if ($("#" + windowId).is(':visible')) {
      // window is open
      console.log(windowId + " is visible")
      var z = getTopZIndex();
      var windowZ = $("#" + windowId).css("z-index");
      console.log(windowZ)
      // is window top of stack on desktop?
      if ($("#" + windowId).css("z-index") == z) {
        // window is at the top
        console.log(windowId + " is at top of stack")
        // minimise window
        $("#" + windowId).hide();
      }
      if ($("#" + windowId).css("z-index") < z) {
        // window is open, but not at top. 
        console.log("else condition fired pepe show");
        // bring window to front
        openWindow(windowId);
      }
    } else {
      // window is minimised, open window, bring to front of stack.  
      openWindow(windowId);
    }
  });
  // bind closeProgram function to all windows. 
  $(document.body).on("click", ".close", function (event) {
    var target = $(this).parent().parent().parent();
    //console.log(target.attr('id'));
    var targetId = target.attr('id');
    closeProgram(targetId);
  });
  $(document.body).on("click", ".minimise", function (event) {
    var target = $(this).parent().parent().parent();
    console.log(target.attr('id'));
    var targetId = target.attr('id');
    $("#" + targetId).hide();
  });
  $(document.body).on("click", ".maximise", function (event) {
    var target = $(this).parent().parent().parent();
    var targetId = target.attr('id');
    console.log(targetId);
    if (!isWindowMaximised(targetId)) {
      maximiseWindow(targetId);
      console.log("maximising window");
    } else if (isWindowMaximised(targetId)) {
      unMaximiseWindow(targetId);
      console.log("unmaximise window");
    } else {
      console.log("error");
    }
  });
  // bring window to front of stack when clicked. 
  $(document.body).on("click", ".window", function (event) {
    var target = $(this).attr('id');
    var z = getTopZIndex();
    $("#" + target).css("z-index", z + 1);
  });
  $("#menu").on("click", ".launch", function (event) {
    console.log($(this).data("launch"));
    var targetId = $(this).data("launch");
    var title = $(this).data("title");
    var imgUrl = $(this).data("icon");
    var url = $(this).data("url");
    var width = $(this).data("width");
    var height = $(this).data("height");
    if (!isWindowOpen(targetId)) {
      createProgram(targetId, title, imgUrl, url, width, height);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
    } else {
      openWindow(targetId);
      $('#menu').hide();
      $("#startbutton").removeClass("startbutton-on");
      console.log("program already exists... opening window")
    }
  });
  $("#desktop").on("click", ".launch", function (event) {
    console.log($(this).data("launch"));
    var targetId = $(this).data("launch");
    var title = $(this).data("title");
    var imgUrl = $(this).data("icon");
    var url = $(this).data("url");
    var width = $(this).data("width");
    var height = $(this).data("height");
    if (!isWindowOpen(targetId)) {
      createProgram(targetId, title, imgUrl, url, width, height);
      $("#startbutton").removeClass("startbutton-on");
    } else {
      openWindow(targetId);
      $("#startbutton").removeClass("startbutton-on");
      console.log("program already exists... opening window")
    }
  });
  $(".item").each(function () {
    if ($(this).data("icon")) {
      var icon = $(this).data("icon");
      $(this).css('background-image', "url(" + icon + ")");
    } else {
      console.log("no icon supplied")
    }
  });
  $(".dropdown-item").each(function () {
    if ($(this).data("icon")) {
      var icon = $(this).data("icon");
      $(this).css('background-image', "url(" + icon + ")");
    } else {
      console.log("no icon supplied")
    }
  });
}); // end document ready
