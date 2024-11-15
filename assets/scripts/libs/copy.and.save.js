export const cAS = {
	async copy() {
		await navigator.clipboard.writeText(document.querySelector("input#result").value);
		window.alert("success!");
	},
	save() {
		const result = document.querySelector("input#result");
		if(result.hasAttribute("isUUID")) return;
		if(result.value == '') return;
		const a = document.createElement("a");
		a.href = URL.createObjectURL(new Blob([result.value], {type: "text/json;charset=utf-8"}));
		a.download = "manifest.json";
		a.click();
	}
}
