/*
 *  PathControls
 *  by Ben van Werkhoven (Netherlands eScience Center)
 *  
 *  free look around with mouse drag
 */

var camera;
var clock;
var path;
var drag = false;

var bodyAngle;
var bodyAxis;
var bodyPosition;
var xAngle = 0;
var yAngle = 0;

var seq = 0;

var mouseX = window.innerWidth / 2;
var mouseY = window.innerHeight / 2;

//this factor controls mouse sensitivity
//should be more than 2*Math.PI to get full rotation
var factor = 8;

// Map for key states
var keys = [];
for(var i = 0; i < 130; i++){
  keys.push(false);
}

var zoom = 45;
var maxZoom = 45;

var autoWalk = false;
var autoLook = true;
var firstPerson = false;

var positionOnRoad = 0;

//poor man's lookat
function lookat(camera, center) {
	var zero = new THREE.Vector3(0, 0, -1);
	var tmp = new THREE.Vector3(0,0,0);

	var look = new THREE.Vector3(center.x, 0, center.z);
	var cam = new THREE.Vector3(camera.position.x, 0, camera.position.z);
	
	tmp.subVectors(look, cam).normalize();
	//var angle = 2*Math.PI - Math.acos(zero.dot(tmp));
	var angle = Math.acos(zero.dot(tmp));
	
	if (tmp.x > 0) {
		//this fixes the fact that acos only returns values between 0 and Pi
		//and we want to be able to rotate around in a full circle 
		angle = 2*Math.PI - angle;
	}
	
	camera.rotation.y = xAngle = angle;
	camera.rotation.x = yAngle = 0;	
}


PathControls = function (camera, path) {
	this.camera = camera;
    this.path = path;
	init();
	
	var pos = path.getPointAt(0);
	
	camera.position = pos;
	camera.up.set(0,1,0);
	camera.rotation.order = 'YXZ';
	
    lookat(camera, path.getPointAt(0.0001));
	
	camera.updateProjectionMatrix();
	
	bodyPosition = camera.position;
	
	zoom = camera.fov;
	maxZoom = camera.fov;
	
	this.updateInput = function () {
		  var delta		  = clock.getDelta();
		  var elapsed     = clock.getElapsedTime();
		  var step        = 10 * delta;
		  
		  if (keys[18]) {
			  step *= 6; //Alt
		  }

		  if (autoWalk) {
			  
			  var looptime = 120;
			  positionOnRoad = ((positionOnRoad + elapsed) % looptime) / looptime;
			  var pos = path.getPointAt(positionOnRoad);
			  
			  camera.position.set(pos.x, pos.y, pos.z);
			  
			  if (autoLook) {
				  
				  lookat(camera, path.getPointAt(positionOnRoad+0.0001));
			  
			  }
			  
		  } else if (firstPerson) {
			  
			  // Forward/backward
			  if(keys[87] || keys [119] || keys[38]) { // W or UP
			      bodyPosition.x -= Math.cos(-xAngle + Math.PI / 2) * step;
			      bodyPosition.y -= Math.cos(yAngle + Math.PI / 2) * step;
			      bodyPosition.z -= Math.sin(-xAngle + Math.PI / 2) * step;
			  }

			  if(keys[83] || keys [115] || keys[40]) { // S or DOWN
			      bodyPosition.x += Math.cos(-xAngle + Math.PI / 2) * step;
			      bodyPosition.y += Math.cos(yAngle + Math.PI / 2) * step;
			      bodyPosition.z += Math.sin(-xAngle + Math.PI / 2) * step;
			  }

			  // Turn
			  if(keys[90] || keys [122]) { // Z
				  bodyPosition.y -= step;
			  }
			  
			  if(keys[81] || keys [113]) { // Q
				  bodyPosition.y += step;
			  }

			  // Straif
			  if(keys[65] || keys[97] || keys[37]) { // A or left
			      bodyPosition.x -= Math.cos(-xAngle) * step;
			      bodyPosition.z -= Math.sin(-xAngle) * step;
			  }   
			  
			  if(keys[68] || keys[100] || keys[39]) { // D or right
			      bodyPosition.x += Math.cos(-xAngle) * step;
			      bodyPosition.z += Math.sin(-xAngle) * step;
			  }

			  camera.position.set(bodyPosition.x, bodyPosition.y, bodyPosition.z);
			  
		  
		  } else {
			  // Forward/backward
			  if(keys[87] || keys[38]) { // W or UP
				  positionOnRoad += 0.01 * delta;
			  }
			  if(keys[83] || keys[40]) { // S or DOWN
				  positionOnRoad -= 0.01 * delta;
			  }

			  if (positionOnRoad > 1) {
				  positionOnRoad = positionOnRoad % 1;
			  }
			  if (positionOnRoad < 0) {
				  positionOnRoad += 1;
			  }
			  
			  var pos = path.getPointAt(positionOnRoad);
			  
			  camera.position.set(pos.x, pos.y, pos.z);
		  }
		  

		  
	}	
		
}

function degInRad(deg) {
    return deg * Math.PI / 180;
}  


function init(){
  clock = new THREE.Clock();

  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  
  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mousedown', mousedown, false);
  document.addEventListener('mouseup', mouseup, false);
  
  document.addEventListener('mousewheel', mousewheel, false );
  document.addEventListener('DOMMouseScroll', mousewheel, false ); // firefox
  


}

function onKeyDown(event) {
  keys[event.keyCode] = true;
  
  if (keys[18]) { //catch shortcuts that use ALT key
    event.preventDefault();
  }
  
  if (event.keyCode == 49) { //the 1 key
	autoWalk = !autoWalk;
	firstPerson = false;
	  
	//restart clock to continue from current position
	if (autoWalk) {
		clock.elapsedTime = 0;
	}
  }
  
  if (event.keyCode == 50) { // the 2 key
		autoWalk = false;
        firstPerson = true;
        
        if (firstPerson) {
        	//continue from current position
        	bodyPosition = camera.position;
        }
  }
  
  if (event.keyCode == 51) { //the 3 key
	  autoLook = !autoLook;
  }
  
  //print position
  if (event.keyCode == 80 || event.keyCode == 112) {
    console.log("{\n   \"type\": \"Feature\",\n   \"geometry\": {\n    \"type\": \"Point\",\n    \"coordinates\": ["
    		+ camera.position.x + ', ' + camera.position.y + ', ' + camera.position.z + "]\n   },\n   \"id\": "
    		+ seq++ + "\n}​,");
  }
    
  //console.log(event.keyCode);
}

function onKeyUp(event) {
  keys[event.keyCode] = false;
}

function mousedown(event) {
	
	//right mouse button going down!!
	if (event.button == 2) {
		
		event.preventDefault();
		
		mouseX = event.pageX;
		mouseY = event.pageY;

		drag = true;
	}
}

function mouseup(event) {
	
	//right mouse button going up!!
	if (event.button == 2) {
		event.preventDefault();
		drag = false;
	}
}

function mousemove(event) {
	if (!drag) return;
	
	xAngle -= factor*(event.pageX - mouseX) / (window.innerWidth);
	yAngle -= factor*(event.pageY - mouseY) / (window.innerHeight);
	
	if (yAngle < -0.95 * Math.PI/2) {
		yAngle = -0.95 * Math.PI/2;
	}
	if (yAngle > 0.95 * Math.PI/2) {
		yAngle = 0.95 * Math.PI/2;
	}

	mouseX = event.pageX;
	mouseY = event.pageY;
    
	
	camera.rotation.y = xAngle;
	camera.rotation.x = yAngle;
	
}

function mousewheel(event) {
	
	event.preventDefault();
	event.stopPropagation();

	var delta = 0;

	if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9
		delta = event.wheelDelta;
	} else if ( event.detail !== undefined ) { // Firefox
		delta = - event.detail;
	}

	if ( delta < 0 ) {
		zoom += 2.5;
	} else {
		zoom -= 2.5;
	}
	
	if (zoom > maxZoom) {
		zoom = maxZoom;
	}
	if (zoom < 5) {
		zoom = 5;
	}
	
	camera.fov = zoom;
	camera.updateProjectionMatrix();
	
	//console.log(zoom);

}
