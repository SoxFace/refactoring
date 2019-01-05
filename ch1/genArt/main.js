/* 
  Lines do not cross
  http://www.kevs3d.co.uk/dev/lsystems/
  Space Filling Curve
  [
    6, 90, "XY", "X", "X=-YF+XFX+FY-", "Y=+XF-YFY-FX+"
  ]

  [ iterations, angle, constants, axiom, rule1, rule2 ]
*/

var canvas = document.getElementById('keith');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var context = canvas.getContext('2d');
context.lineWidth = 10;
var x = document.documentElement.clientWidth / 2;
var y = document.documentElement.clientHeight / 2;
// var rule = "f+f−f−f+f+f+f−fff+fff+fff−f+f−f+f−f−f+f+f+f−f−f+f"
var rule = "-YF+XFX+FY-";
var distance = 50;
var direction = 100;
var paths = [{ x: x, y: y }];
for (var j = 0; j < 50; j++) {
  for (var i = 0; i < rule.length; i++) {
    var char = rule[i];
    switch (char) {
      case 'f': {
        if (direction === 0) x += distance;
        else if (direction === 1) y += distance;
        else if (direction === 2) x -= distance;
        else if (direction === 3) y -= distance;
        if (x < 0 || x > document.documentElement.clientWidth)
          x = getRandomInt(document.documentElement.clientWidth)
        if (y < 0 || y > document.documentElement.clientHeight)
          y = getRandomInt(document.documentElement.clientHeight)
        paths.push({ x: x, y: y })
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
var index = 0;
context.beginPath();
context.moveTo(paths[index].x, paths[index].y);
index++;
var speed = 50;
var colours = ['white'];
setTimeout(draw, speed);
function draw() {
  context.beginPath();
  context.moveTo(paths[index - 1].x, paths[index - 1].y);
  context.strokeStyle = colours[getRandomInt(colours.length - 1)];
  context.lineTo(paths[index].x, paths[index].y);
  context.stroke();
  index++;
  if (index < paths.length - 1) {
    setTimeout(draw, speed);
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}