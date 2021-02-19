export function base64Converter(image) {
	console.log("CONV 1");
	return new Promise(function (resolve) {
		console.log("CONV 2");
		var reader = new FileReader();
		reader.onLoad = function () {
			console.log("CONV 3");
			resolve(reader.result);
		};
		reader.onError = (error) => console.log("ERRORE CONV: " + error);
		reader.readAsDataURL(image);
	});
}

export function dateStringConverter(date) {
	if (date.charAt(2) !== "-") {
		const oldDate = date.split("T")[0];
		const toInvert = oldDate.split("-");
		return toInvert[2] + "-" + toInvert[1] + "-" + toInvert[0];
	}
	return date;
}
