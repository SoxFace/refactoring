/* 
  Lines do not cross
  http://www.kevs3d.co.uk/dev/lsystems/
  Space Filling Curve
  [
    6, 90, "XY", "X", "X=-YF+XFX+FY-", "Y=+XF-YFY-FX+"
  ]

  [ iterations, angle, constants, axiom, rule1, rule2 ]
*/

var context = setupCanvas().getContext("2d");
    context.lineWidth = 10;

var widthHalved = document.documentElement.clientWidth / 2;
var heightHalved = document.documentElement.clientHeight / 2;
// var rule = "f+f−f−f+f+f+f−fff+fff+fff−f+f−f+f−f−f+f+f+f−f−f+f"
var rule = "-YF+XFX+FY-";
var distance = 50;
var direction = 100;
var paths = [{ x: widthHalved, y: heightHalved }];
console.log(paths);

var index = 0;
context.beginPath();
context.moveTo(paths[index].x, paths[index].y);
index++;

var speed = 50;

function randomColour() {
  var colours = ["white", "red", "green", "blue"];
  var result  = colours[getRandomInt(colours.length)];
  return result;
}

setTimeout(draw, speed);

function setupCanvas() {
  var canvas = document.getElementById('lSystemArt');
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  return canvas;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function changeDirection() {
  var character = rule[i];
  switch (character) {
    case 'f': {
      if (direction === 0) widthHalved += distance;
      else if (direction === 1) heightHalved += distance;
      else if (direction === 2) widthHalved -= distance;
      else if (direction === 3) heightHalved -= distance;
      if (widthHalved < 0 || widthHalved > document.documentElement.clientWidth)
        x = getRandomInt(document.documentElement.clientWidth)
      if (heightHalved < 0 || heightHalved > document.documentElement.clientHeight)
        y = getRandomInt(document.documentElement.clientHeight)
      paths.push({ x: widthHalved, y: heightHalved })
      break;
    }
    case '+': {
      direction = (direction + 1) % 4;
      break;
    }
    case '-': {
      if (direction === 0) {
        direction = 3;
      } else {
        direction = direction - 1;
      }
      break;
    }
  }
}

for (var j = 0; j < 50; j++) {
  
  for (var i = 0; i < rule.length; i++) {
    changeDirection();
  }

  var charIndex = getRandomInt(rule.length - 1);
  var newChar = '';
  switch (rule[charIndex]) {
    case 'f': {
      newChar = '-';
      break;
    }
    case '-': {
      newChar = 'f-';
      break;
    }
    case '+': {
      newChar = '+f';
      break;
    }
  }

  rule = rule.substr(0, charIndex - 1) + newChar + rule.substr(charIndex);
}

function draw() {
  context.beginPath();
  context.moveTo(paths[index - 1].x, paths[index - 1].y);
  context.strokeStyle = randomColour();
  context.lineTo(paths[index].x, paths[index].y);
  context.stroke();
  index++;
  if (index < paths.length - 1) {
    setTimeout(draw, speed);
  }
}