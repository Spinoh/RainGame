var drops = [];
var builds = [];
var player;
var canv;
var moving = 0;

function setup() {
	noCursor();
	canv = createCanvas(800, 600);
	centerCanvas();
	player = new Player();
	for (var i = 0; i < 10; i++) {
		drops[i] = new Rain();
	}
	builds.push(new Building(moving));
	builds.push(new Building(moving));
	builds[1].x = 150;
}

function restart() {
	player = new Player();
	for (var i = 0; i < 10; i++) {
		drops[i] = new Rain();
	}
	builds.push(new Building(moving));
	builds.push(new Building(moving));
	builds[1].x = 150;
}

function draw() {
	var rand = random(5, 20);
	background(51);

	if ( frameCount % 30 == 0) {
		for (var i = 0; i < rand; i++) {
			drops.push(new Rain());
		}

	}

	for (var i = builds.length - 1; i >=0 ; i--) {
		builds[i].update(moving);
		builds[i].show();

		if (builds[i].offscreen()) {
			builds.splice(i, 1);
		}
	}

	for (var i = drops.length - 1; i >= 0; i--) {
		drops[i].update(moving);
		for (var j = 0 ; j < builds.length; j++) {
			drops[i].eval(builds[j]);
		}

		drops[i].show();

		if (drops[i].offscreen()) {
			drops.splice(i, 1);
		}


	}
	var dist = [200, 250, 300, 350, 400];

	if ( builds.length < 2) {
		builds.push(new Building(moving));
	}

	moving = player.update();
	if (moving == -2) {
		restart();
	}
	for (var i = drops.length - 1; i >= 0; i--) {
		var check = player.eval(drops[i]);
		if (check) {
			drops.splice(i, 1);
		}
	}
	player.show();


}

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) /2;
	canv.position(x,y);
}

function keyPressed() {
	switch (keyCode) {
		case 32:
			player.jump();
			break;
		case 65:
		case LEFT_ARROW:
			moving = player.move(-1);
			for (var i = 0; i < builds.length; i++) {
				builds[i].move(player.x, -1);
			}
			break;
		case 68:
		case RIGHT_ARROW:
			moving = player.move(1);
			for (var i = 0; i < builds.length; i++) {
				builds[i].move(player.x, 1);
			}
	}
}

function keyReleased() {
	if (key != " ") {
		moving = player.move(0);
		for (var i = 0; i < builds.length; i++) {
			builds[i].move(player.x, 0);
		}
		moving = 0;
	}
}
