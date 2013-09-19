// GLOBAL VARS
var socket;
var canvas;
var ctx;

var canvasData;
var data;
var type;
var stats;
var image;
var URL = window.URL ? window.URL : window.webkitURL;

//----------------------------------------------------------------------------------------------------------------
// ON READY, SETUP SOCKET!
//----------------------------------------------------------------------------------------------------------------

$(document).ready( function() {
	canvas 		= document.getElementById('contourCanvas');
	ctx			= canvas.getContext('2d');
    
    image = new Image();

    canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    data = canvasData.data;

	document.getElementById("brow").textContent = " " + BrowserDetect.browser + " "
		+ BrowserDetect.version +" " + BrowserDetect.OS +" ";
        
   stats = new Stats();
   stats.setMode( 0 ); // 0: fps, 1: ms
   
   // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';
   
  document.body.appendChild( stats.domElement );

  setupSocket();
  
  stats.begin();
    
});

//----------------------------------------------------------------------------------------------------------------
// WS:ON OPEN
//----------------------------------------------------------------------------------------------------------------
function onOpen(){
	document.getElementById("wslm_statustd").style.backgroundColor = "#40ff40";
	document.getElementById("wslm_statustd").textContent = " websocket connection opened ";
}

//----------------------------------------------------------------------------------------------------------------
// WS: ON CLOSE
//----------------------------------------------------------------------------------------------------------------
function onClose(){
	document.getElementById("wslm_statustd").style.backgroundColor = "#ff4040";
	document.getElementById("wslm_statustd").textContent = " websocket connection CLOSED ";
}

//----------------------------------------------------------------------------------------------------------------
// WS: ON MESSAGE
//----------------------------------------------------------------------------------------------------------------

var prevBlob;
function onMessage( messageEvent ){
    stats.end();
    socket.onmessage = null;
    if (messageEvent.data instanceof Blob) {
      ctx.drawImage(image, 0, 0);
      URL.revokeObjectURL(prevBlob);
      prevBlob = URL.createObjectURL(messageEvent.data);
      image.src = prevBlob;
      setTimeout(poll,1000 / 60);
	}
    stats.begin();
}



function poll(){
  socket.onmessage = onMessage;
}

//----------------------------------------------------------------------------------------------------------------
// setup web socket
//----------------------------------------------------------------------------------------------------------------

function setupSocket(){
	// setup!
	if (BrowserDetect.browser == "Firefox") {
		socket = new MozWebSocket( get_appropriate_ws_url(), "of-protocol" );
		socket.binaryType = "blob";
	} else {
		//socket = new WebSocket( get_appropriate_ws_url(), "of-protocol");
        socket = new WebSocket( 'ws://127.0.0.1:9093', "of-protocol");
		socket.binaryType = "blob";
	}
	
	// open
	try {
		socket.onopen 		= onOpen;
		//socket.onmessage 	= onMessage;
		socket.onclose 	 	= onClose;
        setTimeout(poll,1000 / 60);
	} catch(exception) {
		alert('Error' + exception);  
	}
}