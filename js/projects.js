window.addEventListener("load", async () => {
	
	let root = document.getElementById('display');
	
	let data = await getJson();
	getData("es");

	let works = shuffleObject(data);

	Object.entries(works).forEach(
		([key, value], index) => {

			let video_container = document.createElement('div');
			video_container.classList.add("video-container");

			let number = document.createElement("p");
			number.style.fontWeight = "bold";
			number.style.marginBottom = "5px";
			number.textContent = `_${index}`;
			display.append(number);

			if (value.project_media == 'video') {
				let video = document.createElement("video");
				let header = document.createElement('div');
				header.classList.add("overlay-header", "overlay-header--primary");

				let link = document.createElement('a');
				link.textContent = value.project_name;
				link.href = value.project_page;
				link.classList.add("video-title");

				let parrafo = document.createElement('p');
				parrafo.classList.add("video-description");
				parrafo.setAttribute('data-translation', value.project_type);

				video.classList.add('video');
				video.src = value.project_file;
				video.type = "video/mp4";
				video.preload = "auto";
				video.muted = true;
				video.playsinline = true;
				video.loop = true;
				
				if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
					video.autoplay = true;
				};

				header.append(link, parrafo);
				video_container.append(video, header);
			};
			if (value.project_media == 'image') {
				let image = document.createElement("img");

				let header = document.createElement('div');
				header.classList.add("overlay-header", "overlay-header--primary");

				let link = document.createElement('a');
				link.textContent = value.project_name;
				link.href = value.project_page;
				link.classList.add("video-title");

				let parrafo = document.createElement('p');
				parrafo.classList.add("video-description");
				parrafo.setAttribute('data-translation', value.project_type);

				image.classList.add('video');
				image.src = value.project_file;

				if (value.project_name === "Observaciones sobre el ruido en la condensacion de una nube" || value.project_name === "Biorremediaciones de Juan Pablo Ferlat"){
					link.setAttribute("id", "observacion-nube");
				};

				header.append(link, parrafo);
				video_container.append(image, header);
			};
			root.append(video_container);
		});
});

async function getJson() {
	let data = await fetch('../js/json/project-data.json');
	let json = await data.json();
	
	return json.Projects;
};

function shuffleObject(d) {
	
	let newObj = {};
	let keys = Object.keys(d);

	let starred_video = keys.slice(0, 9).sort(() => {
		return Math.random() - 0.5;
	});
	let other_video = keys.slice(9, 21).sort(() => {
		return Math.random() - 0.5;
	});

	starred_video.sort(function(a,b){return Math.random()- 0.5;});
	starred_video.forEach(function(k) {
		newObj[k] = d[k];
	});

	other_video.sort(function(a,b){return Math.random()- 0.5;});
	other_video.forEach(function(k) {
		newObj[k] = d[k];
	});
	return newObj;
};