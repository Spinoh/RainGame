
function Building(moving) {
  this.x = width + 150;
  this.w = 300;
  this.h = 250;
  this.col = color(random(256),random(256),random(256));
  if (moving) {
    this.moving = moving;
  } else {
    this.moving = false;
  }
  if (this.moving == -1) {
    this.speed = -3;
  } else if(this.moving == 1) {
    this.speed = 3;
  } else {
    this.speed = 0;
  }
}

Building.prototype.update = function(move) {
  if (move == -1) {
    this.speed = -3;
  } else if(move == 1) {
    this.speed = 3;
  } else {
    this.speed = 0;
  }
  this.x -= this.speed;
}

Building.prototype.show = function() {
  fill(this.col);
  rectMode(CENTER);
  rect(this.x, height - (this.h/2), this.w, this.h);
}

Building.prototype.offscreen = function() {
  if(this.x < -200) {
    return true;
  } else {
    return false;
  }
}

Building.prototype.move = function(px, dir) {
  switch (dir) {
    case -1:
      if (px > 90) {
        this.speed = 0;
      } else {
        this.speed = -3;
      }
      break;
    case 1:
      if (px < 340) {
        this.speed = 0;
      } else {
        this.speed = 3;
      }
      break;
    default:
      this.speed = 0;
  }
}
