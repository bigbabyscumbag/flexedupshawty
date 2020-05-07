// disable dragging of images
$("img").mousedown(function(e){
     e.preventDefault()
});

//function openAlert() {
//  var x = document.getElementById("alertbox");
//  x.style.display = "block";
//  $("#alertbox").css('z-index', getTopZIndex() + 1);
//  $("#alertbox").css('left', 80);
//  $("#alertbox").css('top', 50);
//}

//function closeAlert() {
//  var x = document.getElementById("alertbox");
//  if (x.style.display === "none") {
//    x.style.display = "block";
//  } else {
//    x.style.display = "none";
//  }
//}

//$(document).ready(function() {
//	// make new alert box
//  	openAlert();
//});

// https://stackoverflow.com/questions/25962958/calling-a-javascript-function-in-another-js-file
//import { f1 } from "./file1.js";
//f1();



function parse_query_string(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

function set_title(title){
	document.title = title;

	if(frameElement){
		frameElement.$window.title("scumweb");
	}
}

function set_icon(icon_id) {
	document.querySelector("link[rel~=icon]").href = getIconPath(icon_id, 16)
	if(frameElement){
		// frameElement.$window.$icon.attr("src", getIconPath(icon_id, TITLEBAR_ICON_SIZE));
		frameElement.$window.setIconByID(icon_id);
	}
}

function get_display_name_for_address(address) {
	// TODO: maintain less fake naming abstraction
	// base it more on the actual filesystem
	if(address === "/"){
		return "(C:)";
	}else if(address === "/my-pictures/"){
		return "My Pictures";
	}else if(address === "/my-documents/"){
		return "My Documents";
	}else if(address === "/network-neighborhood/"){
		return "Network Neighborhood";
	}else if(address === "/desktop/"){
		return "Desktop";
	}else if(address === "/programs/"){
		return "Program Files";
	}else if(address.match(/\w+:\/\//)){
		return address;
	}else{
		return file_name_from_path(address.replace(/[\/\\]$/, ""));
	}
}

function get_icon_for_address(address) {
	// TODO: maintain less fake naming abstraction
	// base it more on the actual filesystem
	if(address === "/"){ // currently / is our C:\ analog (or C:\Windows\)
		return "internet-explorer";
	// }else if(address === "/my-computer/"){ // we don't have an actual My Computer location yet, it just opens (C:)
	// 	return "my-computer";
	}else if(address === "/my-documents/"){
		return "internet-explorer";
	}else if(address === "/network-neighborhood/"){
		return "internet-explorer";
	}else if(address === "/desktop/"){ // i.e. C:\Windows\Desktop
		return "internet-explorer";
	}else if(address.match(/^\w+:\/\//) || address.match(/\.html?$/)){
		return "internet-explorer";
	}else{
		return "internet-explorer";
	}
}

var $folder_view, $iframe;
var go_to = function(address){
	if($folder_view){
		$folder_view.remove();
		$folder_view = null;
	}
	if($iframe){
		$iframe.remove();
		$iframe = null;
	}
	
	address = address || "/";
	var is_url = !!address.match(/\w+:\/\//);
	function handle_url_case() {
		if(!address.match(/^https?:\/\/web.archive.org\//) && !address.startsWith(window.location.origin)){
			if (address.match(/^https?:\/\/(www\.)?(windows93.net)/)) {
				address = "https://web.archive.org/web/2015-05-05/" + address;
			} else if (!address.match(/^https?:\/\/(www\.)?(copy.sh)/)) {
				address = "https://web.archive.org/web/1998/" + address;
			}
		}
		address_determined();
	}
	if(is_url){
		handle_url_case();
	}else{
		withFilesystem(function(){
			var fs = BrowserFS.BFSRequire("fs");
			fs.stat(address, function(err, stats){
				if(err){
					if(err.code === "ENOENT") {
						address = "https://" + address;
						handle_url_case();
						return;
					}
					return alert("Failed to get info about " + address + "\n\n" + err);
				}
				if(stats.isDirectory()){
					if(address[address.length - 1] !== "/"){
						address += "/";
					}
					address_determined();
				} else {
					// TODO: open html files in a new window, but don't infinitely recurse
					// executeFile(address);
					if (address.match(/\.html$/i)) {
						address = window.location.origin + "/" + address.replace(/^\/?/, "");
						is_url = true;
						address_determined();
					} else {
						executeFile(address);
					}
				}
			});
		});
	}

	function address_determined() {
		$("#address").val(address);
	
		set_title(get_display_name_for_address(address));
		set_icon(get_icon_for_address(address));
	
		if(is_url){
			$iframe = $("<iframe>").attr({
				src: address,
				allowfullscreen: "allowfullscreen",
				sandbox: "allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-modals allow-popups",
			}).appendTo("#content");
	
			// If only we could access the contentDocument cross-origin
			// For https://archive.is/szqQ5
			// $iframe.on("load", function(){
			// 	$($iframe[0].contentDocument.getElementById("CONTENT")).css({
			// 		position: "absolute",
			// 		left: 0,
			// 		top: 0,
			// 		right: 0,
			// 		bottom: 0,
			// 	});
			// });
	
			// We also can't inject a user agent stylesheet, for things like scrollbars
			// Too bad :/
	
			// We also can't get the title; it's kinda hard to make a web browser like this!
			// $iframe.on("load", function(){
			// 	set_title($iframe[0].contentDocument.title + " - Explorer"); // " - Microsoft Internet Explorer"
			// });
		}else{
			$folder_view = $FolderView(address).appendTo("#content");
		}
	}
};

// called from $FolderView
function executeFile(file_path){
	// I don't think this withfs is necessary
	withFilesystem(function(){
		var fs = BrowserFS.BFSRequire("fs");
		fs.stat(file_path, function(err, stats){
			if(err){
				return alert("Failed to get info about " + file_path + "\n\n" + err);
			}
			if(stats.isDirectory()){
				go_to(file_path);
			}else{
				// (can either check frameElement or parent !== window, but not parent by itself)
				if(frameElement){
					parent.executeFile(file_path);
				}else{
					alert("Can't open files in standalone mode. Explorer must be run in a desktop.");
				}
			}
		});
	});
}