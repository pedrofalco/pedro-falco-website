let language_es = document.getElementById("es");
let language_en = document.getElementById("en");

language_en.style.display = "none";

language_es.addEventListener("click", () => {
	language_es.style.display = "none";
	language_en.style.display = "inline";
	console.log("now the language is spanish");

	getData("en");
});
language_en.addEventListener("click", () => {
	language_en.style.display = "none";
	language_es.style.display = "inline";
	console.log("now the language is english");

	getData("es");
});

const getData = async (lang) => {
	let data = await getScript(`/js/lang-${lang}.js`);
	console.log("lang", lang);
	document.querySelectorAll("[data-translation]").forEach((item) => {
		item.textContent = translations[`${item.dataset.translation}`];
	});
};

onload = () => {

	let userLang = navigator.language || navigator.userLanguage; 
	console.log("The language is: " + userLang);

	if (userLang == 'es') {
		language_en.style.display = "none";
		language_es.style.display = "inline";
		getData("es") 
	} else {
		language_es.style.display = "none";
		language_en.style.display = "inline";
		getData("en")
	};
};
