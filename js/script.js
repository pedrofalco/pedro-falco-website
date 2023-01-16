let time = new Date().getHours();
let offset = 0;
let normalized_time = (time - offset) / 24;
// normalized_time = Math.sin(Math.PI * normalized_time).toFixed(5);
console.log(`normalized_time: ${time / 24}, sin_time: ${normalized_time}`);

const canvas = document.createElement("canvas");
const root = document.getElementById("root");
const text = document.getElementById("pedro");
const current_time = document.getElementById("date-time");
let textColor;

if (time >= 12) {
	textColor = 25;
	current_time.style.color = `rgba(${textColor}, ${textColor}, ${textColor}, 0.8)`;
	text.style.color = `rgba(${textColor}, ${textColor}, ${textColor}, 0.8)`;
} else {
	textColorR = 255;
	textColorG = 242;
	textColorB = 234;
	current_time.style.color = `rgba(${textColorR}, ${textColorG}, ${textColorB}, 0.8)`;
	text.style.color = `rgba(${textColorR}, ${textColorG}, ${textColorB}, 0.8)`;
}
console.log("textcolor", textColor);

// -------------------- THREE.JS SKETCH --------------------
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 75;
root.appendChild(canvas);
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
	canvas,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const plane = new THREE.PlaneGeometry(canvas.width, canvas.height);
const material = new THREE.ShaderMaterial({
	uniforms: {
		u_time: { type: "f", value: 0 },
		u_resolution: {
			value: new THREE.Vector2(canvas.width, canvas.height),
		},
		u_mouse: { type: "vec2", value: new THREE.Vector2() },
		u_hour: { type: "f", value: normalized_time },
	},
	fragmentShader: fragment,
});

const mesh = new THREE.Mesh(plane, material);
scene.add(mesh);

function animate() {
	requestAnimationFrame(animate);
	material.uniforms.u_time.value += 0.001;
	renderer.render(scene, camera);
	renderer.domElement.addEventListener("mousemove", mouseMove, false);
}

function mouseMove(e) {
	const vpRatio = window.innerWidth / window.innerHeight;
	material.uniforms.u_mouse.value.x = (e.offsetX / window.innerWidth) * vpRatio;
	material.uniforms.u_mouse.value.y = 1 - e.offsetY / window.innerHeight;
}

function refreshTime() {
	var dateString = new Date().toString();
	dateString = dateString.split("G")[0];

	// var formattedString = dateString.replace(", ", " - ");
	current_time.innerHTML = dateString;
}

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

animate();
// setInterval(refreshTime, 1000);
