const initInfo = (name, content) => {
	let color = null;
	if(typeof content === "boolean") {
		color = content? "#0f0": "#f00";
	}
	findEles(`[${name}]`).forEach(ele => {
		ele.style.color = color || '';
		ele.innerHTML = content;
	});
};

export default () => {
	let info = [
		["mcpackMl", displayLang],
		["oreuiI", (oreui)? true: false],
		["oreuiV", `v${oreui.info.version}(${oreui.info.date})`],
		["mcpackMv", mcpackM.getVer()]
	];

	info.forEach(i => {
		initInfo(i[0], i[1]);
	});
};

setInterval(()=>{
	try {
		findEle("[onLine]").style.color = navigator.onLine? "#0f0": "#f00";
		initInfo("onLine", navigator.onLine);
	} catch (error) {
		
	}
}, 2500)
