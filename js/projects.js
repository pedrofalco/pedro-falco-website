window.addEventListener("load", () => {

	let starred_projects = 9; 
	let display = document.getElementById("display");
	let video_container = Array.from(display.children);
	let videos = document.getElementsByTagName("video");

	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		for (let vid of videos) {	
			console.log(vid)
			vid.setAttribute('autoplay', 'true');
		}
	}
	
	let shuffle_video_important = video_container.slice(0, starred_projects).sort(() => {
		return Math.random() - 0.5;
	});
	let shuffle_video_sub = video_container
		.slice(starred_projects, video_container.length)
		.sort(() => {
			return Math.random() - 0.5;
		});

	let shuffle_video = shuffle_video_important.concat(shuffle_video_sub);

	for (const [i, video] of shuffle_video.entries()) {
		let number = document.createElement("p");
		number.style.fontWeight = "bold";
		number.style.marginBottom = "5px";
		number.textContent = `_${i}`;
		display.append(number, video);
	}
});
