
function Rain() {
  this.pos = createVector(random(-500, 1300), random(0, 20));
  this.vel = createVector(0 , 3);
}

Rain.prototype.update = function(moving) {
  if (moving == -1) {
    this.vel = createVector(2, 3);
  } else if (moving == 1) {
    this.vel = createVector(-2, 3);
  } else {
    this.vel = createVector(0 , 3);
  }
  this.pos.add(this.vel);
}

Rain.prototype.show = function() {
  push();
  fill(256, 240, 230, 125);
  translate(this.pos.x, this.pos.y);
  rotate(this.vel.heading());
  rectMode(CENTER);
  rect(0, 0, 30, 5);
  pop();
}

Rain.prototype.offscreen = function() {
  if(this.pos.y > height || this.pos.x < 0 || this.pos.x > width) {
    return true;
  } else {
    return false;
  }
}
