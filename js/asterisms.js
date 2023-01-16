function random_hash() {
	let chars = "0123456789abcdef";
	let result = "";
	for (let i = 64; i > 0; --i)
		result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
let tokenData = {
	hash: random_hash(),
	tokenId: "0",
};
var minSpeed,
	maxSpeed,
	minSize,
	maxSize,
	linkForce,
	starMax,
	colorLink,
	colorR,
	colorG,
	colorB,
	alphaK,
	alphaX,
	mx,
	hash = tokenData.hash,
	tokenID = hash,
	sourceText = "",
	textY = 20,
	textX = 15,
	iniStars = [],
	starCount = 0,
	starPos = new Array(starCount),
	starMaxV = new Array(starCount),
	starVel = new Array(starCount),
	starSize = new Array(starCount),
	starR = new Array(starCount),
	starG = new Array(starCount),
	starB = new Array(starCount),
	sf = 1,
	my = 0;

function setup() {
	(root = document.getElementById("root")),
		(c = createCanvas(root.offsetWidth, root.offsetWidth / 1.8)),
		c.parent("canvas"),
		c.mouseWheel(zoom),
		(min_dim = min(c.width, c.height)),
		(size = min_dim / 390 / 2),
		randomSeed(parseInt(tokenData.hash.slice(0, 16), 16)),
		frameRate(20),
		colorMode(RGB, 255, 255, 255, 100),
		ellipseMode(RADIUS),
		(iniStars = round(random(90, 150))),
		(starMax = 1e3),
		(minSize = round(random(0.25 * size, 0.8 * size), 4)),
		(maxSize = round(random(2 * size, 7 * size), 4)),
		(minSpeed = round(random(0.05 * size, 0.1 * size), 4)),
		(maxSpeed = round(random(0.15 * size, 0.2 * size), 4)),
		(linkForce = round(random(50 * size, 65 * size), 4)),
		(colorLink = random(12, 240)),
		(lineWeight = round(random(0.25 * size, 1.5 * size), 4)),
		(colorR = random(50, 255)),
		(colorG = random(50, 255)),
		(colorB = random(50, 255)),
		(alphaL = random(200, 255)),
		(backgroundB = random(0, 35)),
		(backgroundR = random(0, 35)),
		(backgroundG = random(0, 35)),
		(sourceText = tokenID);
	for (var r = 0; r < iniStars; r++) newStar();
}
function draw() {
	blendMode(BLEND),
		background(backgroundR, backgroundG, backgroundB, 255),
		blendMode(SCREEN),
		textSize(13 * size),
		noStroke(),
		fill(255),
		textFont("JetBrains Mono"),
		text(sourceText, size * textX, size * textY, 490 * size, 100 * size),
		textWidth > 490 && (textY = 100),
		mouseX <= width &&
			mouseX >= 0 &&
			mouseY <= height &&
			mouseY >= 0 &&
			((mx = mouseX), (my = mouseY)),
		translate(mx, my),
		scale(sf),
		translate(-mx, -my),
		mouseIsPressed && starCount <= starMax && newStar();
	for (var r = 0; r < starCount; r++) {
		noStroke();
		var e = map(
			dist(width / 2, height / 2, starPos[r].x, starPos[r].y),
			180,
			360 * size,
			360 * size,
			180
		);
		fill(colorR + 75, colorG + 75, colorB + 75, e + 75),
			ellipse(starPos[r].x, starPos[r].y, starSize[r], starSize[r]);
	}
	for (r = 0; r < starCount; r++) {
		e = map(
			dist(width / 2, height / 2, starPos[r].x, starPos[r].y),
			180,
			360 * size,
			360 * size,
			180
		);
		for (var s = r + 1; s < starCount; s++)
			if (
				dist(starPos[r].x, starPos[r].y, starPos[s].x, starPos[s].y) <
					linkForce &&
				dist(width / 2, height / 2, starPos[s].x, starPos[s].y) < 360
			) {
				var t = 0.6;
				(t = map(t, 1, -1, 0, alphaL)),
					line(starPos[r].x, starPos[r].y, starPos[s].x, starPos[s].y),
					stroke(colorR, colorG, colorB, e),
					strokeWeight(lineWeight);
			}
	}
	for (r = 0; r < starCount; r++) {
		var o = starPos[r].x + starVel[r].x,
			a = starPos[r].y + starVel[r].y;
		(starPos[r].x = o),
			(starPos[r].y = a),
			(o < 0 || o > size * min_dim) &&
				((starVel[r].x *= -1), (o = starPos[r].x + starVel[r].x)),
			(a < 0 || a > size * min_dim) &&
				((starVel[r].y *= -1), (a = starPos[r].y + starVel[r].y));
	}
}
function newStar() {
	if (starCount < iniStars) {
		starPos.push(
			createVector(
				random(0, root.offsetWidth),
				random(0, root.offsetWidth / 1.8)
			)
		);
		var r = random(minSpeed, maxSpeed);
		starMaxV.push(r),
			starVel.push(createVector(random(-r, r), random(-r, r))),
			starSize.push(random(minSize, maxSize)),
			starR.push(round(random(0, 255))),
			starG.push(round(random(0, 255))),
			starB.push(round(random(0, 255))),
			starCount++;
	} else {
		starPos.push(createVector(mouseX, mouseY));
		r = random(minSpeed, maxSpeed);
		starMaxV.push(r),
			starVel.push(createVector(random(-r, r), random(-r, r))),
			starSize.push(random(minSize, maxSize)),
			starR.push(round(random(0, 255))),
			starG.push(round(random(0, 255))),
			starB.push(round(random(0, 255))),
			starCount++;
	}
}
function keyTyped() {
	"Enter" == key
		? (sourceText = sourceText)
		: sourceText == tokenID
		? (sourceText = key)
		: " " == key
		? (sourceText = sourceText.substring(0, sourceText.length + 1 - 1))
		: (sourceText += key);
}
function keyPressed() {
	32 === keyCode
		? (sourceText += " ")
		: 8 === keyCode
		? (sourceText = sourceText.substring(0, sourceText.length - 1))
		: 46 === keyCode
		? (sourceText = "")
		: 13 === keyCode && saveCanvas(sourceText + " asterism", "png");
}
function zoom(r) {
	r.preventDefault();
	sf > 1 && r.deltaY > 0
		? (sf *= 0.95)
		: sf < 0.99
		? (sf = 0.99)
		: sf > 5 && r.deltaY < 0
		? (sf *= 1)
		: r.deltaY < 0 && (sf *= 1.05),
		!1;
}
