
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
  this.life = {
    x : 20,
    y : 20,
    w : 200,
    h : 30,
    stat : 0,
  }

}

Player.prototype.show = function() {
  rectMode(CORNER);
  fill(255, 125);
  rect(this.life.x, this.life.y, this.life.w, this.life.h);
  fill(255)
  rect(this.life.x, this.life.y, this.life.stat, this.life.h);
  push();
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  pop();

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
  if (this.x > 80 && this.x < 350) {
    this.x += this.xspeed;
    return 0;
  } else if (this.x == 80) {
    this.x += this.xspeed;
    return (this.mov) ? -1 : 0;
  } else if (this. x  == 350) {
    this.x += this.xspeed;
    return (this.mov) ? 1 : 0;
  }

  if (this.life.stat >= 190) {
    return -2;
  }
}

Player.prototype.move = function(dir) {
    switch (dir) {
      case -1:
        if (keyIsPressed) {
          this.xspeed = -3;
          this.mov = true;
          return (this.x > 90) ? 0 : -1;
        }
        break;
      case 1:
        if (keyIsPressed) {
          this.xspeed = 3;
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

Player.prototype.eval = function (drop) {
  if (drop.pos.x > this.x - 15 && drop.pos.x < this.x + 15 && drop.pos.y > this.y - 80) {
    this.life.stat = constrain(this.life.stat, 0, 200);
    this.life.stat += 20;
    return true;
  } else {
    return false;
  }
}
