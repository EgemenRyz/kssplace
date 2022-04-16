var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var color = null;
var colorpicker = document.getElementById("colorpicker");
var timerP = document.getElementById("timer");
var timer = 0;
getcanvas();

document.getElementById("BlackBut").onclick = function setblack() {
  color = "#000000";
  colorpicker.jscolor.fromString("000000");
};

document.getElementById("RedBut").onclick = function setblack() {
  color = "#e50000";
  colorpicker.jscolor.fromString("e50000");
};

document.getElementById("GreenBut").onclick = function setblack() {
  color = "#02be01";
  colorpicker.jscolor.fromString("02be01");
};

document.getElementById("BlueBut").onclick = function setblack() {
  color = "#0000ea";
  colorpicker.jscolor.fromString("0000ea");
};

document.getElementById("Eraser").onclick = function setblack() {
  color = "#ffffff";
  colorpicker.jscolor.fromString("ffffff");
};


colorpicker.onchange = () => {
  color = "#" + colorpicker.value;
};

function getcanvas() {
  fetch("/canvas", {})
    .then(res => res.json())
    .then(canvas => {
      for (let index = 0; index < canvas.length; index++) {
        for (let indexs = 0; indexs < canvas[index].length; indexs++) {
          if (canvas[index][indexs] != null) {
            ctx.fillStyle = canvas[index][indexs];
            ctx.fillRect(index * 10, indexs * 10, 10, 10);
          }
        }
      }
    });
  if (timer != 0) {
     timer = timer - 3;
       timerP.textContent = "Yapılan değişiklikler kaydediliyor...";
    } else {
        timerP.textContent = "";
    }
}

setInterval(getcanvas, 500);

canvas.onclick = function draw(event) {

  if (color != null && timer == 0) {
    console.log("X: " + event.pageX + " Y: " + event.pageY)
    var x = event.pageX - 12;
    var y = event.pageY - 42;
    console.log("X: " + x + " Y: " + y)
    timer = 3;
    if (x < 0) {
      x = 0; 
    }
    if (y < 0) {
      y = 0; 
    }
    if (y > 2000) {
      y = 2000;
    }
    if (x > 2000) {
      x = 2000;
    }
    x = Math.floor(x / 10) * 10;
    y = Math.floor(y / 10) * 10;
    var data = { x: x / 10, y: y / 10, color: color };
    fetch("/setcolor", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
  }
};
