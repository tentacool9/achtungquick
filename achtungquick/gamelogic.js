var gametime = 0;
var char = document.getElementById("char");
var canvas = document.getElementById("gameface")
var ctx = canvas.getContext("2d");
var velx = 0;
var vely = 50;
var velx2 = 50
var vely2 = 0
var xpos =  getRandomCord();
var ypos =  getRandomCord();
var xpos2 = getRandomCord();
var ypos2 = getRandomCord();
var currcolor1;
var currcolor2;
var colorcount = 0;
document.onkeydown = checkKey;
var intr = setInterval(update, 100);
function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '38' && vely != 50) {
			vely = -50
			velx = 0
			// up arrow
    }
    else if (e.keyCode == '40' && vely != -50) {
			vely = 50
			velx = 0
			// down arrow
    }
    else if (e.keyCode == '37' && velx != 50 ) {
			vely = 0
			velx = -50
		   // left arrow
    }
    else if (e.keyCode == '39' && velx != -50) {
			vely = 0
			velx = 50
		   // right arrow
	}
    else if (e.keyCode == '87' && vely2 != 50 ) {
			// w
			vely2 = -50
			velx2= 0
    } else if (e.keyCode == '68' && velx2 != -50 ) {
		
			vely2 = 0
			velx2 = 50
			// d
    } else if (e.keyCode == '83' && vely2 != -50) {
		
			vely2 = 50
			velx2 = 0
			//s 
    } else if (e.keyCode == '65' && velx2 != 50) {
			/* a */
			vely2 = 0
			velx2 = -50
    }


}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function rgbToHex(r, g, b){
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
    }
function update() {
    var p = ctx.getImageData(xpos + velx, ypos + vely, 1, 1).data;
    var hex1 = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    p = ctx.getImageData(xpos2 + velx2, ypos2 + vely2, 1, 1).data;
    var hex2 = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	
	if(playerLost(hex1, xpos, ypos)){
		ctx.fillStyle = currcolor1;
        ctx.font = "200px Arial";
		ctx.fillText("Player1 loses", calculateXMessage(xpos), calculateYMessage(ypos));
	}
	
	if(playerLost(hex2, xpos2, ypos2)){
		ctx.fillStyle = currcolor2;
        ctx.font = "200px Arial";
        ctx.fillText("Player2 loses",calculateXMessage(xpos2), calculateYMessage(ypos2));
	}
	
    xpos += velx;
    ypos += vely;
    xpos2 += velx2;
    ypos2 += vely2;
    currcolor1 =  getRandomColor();
    ctx.fillStyle = currcolor1;
    ctx.fillRect(xpos2, ypos2, 50, 50); 
    currcolor2 =  getRandomColor();
    ctx.fillStyle = currcolor2;
    ctx.fillRect(xpos, ypos, 50, 50);
    console.log(hex1 + hex2);
}

function playerLost(hex, xpos, ypos){
		
		if ((hex != "#000000" && hex != "#ffffff") || xpos <= 0 || ypos <= 0 || xpos >= 3000 || ypos >= 3000){
			clearInterval(intr);
			return true;
		}
		return false;
		
}

function calculateYMessage(ypos){
	if(ypos < 200)
		return 200;
	if (ypos > 2900)
		return 2900;
	return ypos;
}

function calculateXMessage(xpos){
	if(xpos > 2800)
		return 2800;
	return xpos;
}

function getRandomCord(){
	return Math.floor(Math.random() * 1800) + 600;
}