window.result = document.querySelector("#result");
const generateUUID = () => {
		let d = new Date().getTime();
		let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x'? r: (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	}

/**
 * Manifest class
 * @param {string} name - pack name
 * @param {string} description - pack description
 * @param {string} version - pack version
 * @param {string} minBedrockVersion - minimum bedrock version
 * @param {string} type - pack type
 * @param {string} uuid - uuid v4
 */
class Manifest {
	constructor(name, description, version, minBedrockVersion, type, authors, license, url) {
		this.format_version = (minBedrockVersion.split('.')[0] == 1 && minBedrockVersion.split('.')[1] >= 13)? 2: 1;
		this.header = {
			description, name, version: version.split('.').map(Number), min_engine_version: minBedrockVersion.split('.').map(Number),
			uuid: generateUUID()
		};
		this.modules = [{
			type, version: version.split('.').map(Number),
			uuid: generateUUID()
		}];
		if(authors) this.metadata.authors = authors.split(',').map(s => s.trim()) || [];
		if(license) this.metadata.license = license;
		if(url) this.metadata.url = url;
	}
	metadata = {
		generated_with: {
			"latedream-mcpack-manifest-generator": [mcpackM.version.number.join('.')]
		}
	}
}
// debug
globalThis.Manifest = Manifest;

export const mcpackM = {
	generation() {
		const mcPackInfo = new FormData(document.querySelector("form#mcPackInfo"));
		let mBv = mcPackInfo.get("minBedrockVersion");
		if(mBv.split('.')[0] > 1) {
			alert(`what? minecraft has been update to ${mBv.join('.')}???`);
			return;
		} else
		if(mBv.split('.')[0] < 1 && mBv.split('.')[1] < 8) {
			alert("min bedrock version is too low!!\nlowest: 1.8.0");
			return;
		}
		result.toggleAttribute("isUUID");
		result.value = (JSON.stringify(new Manifest(mcPackInfo.get("name"), mcPackInfo.get("description"), mcPackInfo.get("version"), mBv, mcPackInfo.get("type"), mcPackInfo.get("authors"), mcPackInfo.get("license"), mcPackInfo.get("url"))));
		document.querySelector("#buttonPanel").style.display = "inline";
		window.alert("success!");
	},
	version: {
		number: [0, 2, 6],
		build: "20241213",
		name: "beta"
	},
	getVer() {
		let version = this.version;
		return `${version.name[0].toUpperCase() + version.name.slice(1)} v${version.number.join('.')}(${version.build})`;
	},
	getUUID() {
		result.toggleAttribute("isUUID");
		result.value = mcpackM.generateUUID();
		document.querySelector("#buttonPanel").style.display = 'inline';
	}
}

console.log(`mcpackM version: ${mcpackM.getVer()}`);
