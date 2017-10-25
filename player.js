
function Player() {
  this.y = height - 80;
  this.x = 90;
  this.h = 160;
  this.w = 30;
  this.jumping = false;

  this.gravity = 0.6;
  this.lift = -30;
  this.velocity = 0;
  this.wet = 0;
  this.xspeed = 0;
  this.mov = false;

}

Player.prototype.show = function() {
  fill(255);
  rectMode(CENTER);
  rect(this.x, this.y, this.w, this.h);
}

Player.prototype.jump = function() {
  if (!this.jumping) {
    this.jumping = true;
    this.velocity += this.lift;
  }
}

Player.prototype.update = function() {

  if (this.jumping) {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y >= height - 80) {
      this.y = height - 80;
      this.jumping = false;
    }
  }
  this.x = constrain(this.x, 80, 350);
  if (this.x >= 85 && this.x < 346) {
    this.x += this.xspeed;
    return 0;
  } else if (this.x < 85) {
    this.x = 85;
    this.xspeed = 0;
    return -1;
  } else {
    if (this.mov) {
      return (this.speed < 0) ? -1 : 1;
    } else {
      return 0;
    }
  }
}

Player.prototype.move = function(dir) {
    switch (dir) {
      case -1:
        if (keyIsPressed) {
          this.xspeed = -2;
          this.mov = true;
          return (this.x > 90) ? 0 : -1;
        }
        break;
      case 1:
        if (keyIsPressed) {
          this.xspeed = 2;
          this.mov = true;
          return (this.x < 340) ? 0 : 1;
        }
        break;
      default:
        this.xspeed = 0;
        this.mov = false;
        return 0;
    }
}

Player.prototype.hit = function (drop) {

}
