// import languages from "./languages.json" with {type: "json"}; // chrome 128+
// globalThis.languages = languages;

export const lang = {
	change(lang) {
		this.set(lang);
		this.getSettings();
	},
	getSettings() {
		let f, cookies = document.cookie.split("; ");
		for(let cookie of cookies) {
			if(cookie.startsWith("lang")) {
				f = true;
				globalThis.displayLang = cookie.split('=')[1];
				lang.setLang(displayLang);
				break;
			} else continue;
		}
		(f)? null: this.init();
	},
	init() {
		if(navigator.language) {
			let lang = navigator.language.split('-')[0];
			this.set(lang);
			this.getSettings();
		} else {
			console.log("your browser not support `navigator.language`");
			this.set("en");
		};
	},
	set(lang) {
		let date = new Date();
		date.setDate(date.getDate() + 7); // default expires is 7 days
		document.cookie = `lang=${lang}; expires=${date}`;
	},
	async setLang(langName) {
		console.log('fetching language data');
		const languages = await (await fetch('/i18n.json')).json();
		console.log(`will use "${langName}" as display language`);
		let displayLang = languages[langName];
		document.querySelector("html").lang = langName;

		displayLang.forEach(l => {
			lang.innerText(l[0], l[1]);
		});
	},
	innerText(ele, text) {
		findEles(`[${ele}]`).forEach(e => {
			e.innerHTML = text;
		});
	}
}
