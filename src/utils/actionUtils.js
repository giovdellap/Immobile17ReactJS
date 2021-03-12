/**
 * @param {*} image
 * @returns l'immagine convertita in Base64
 */
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

/**
 * @param {*} ids
 * @param {*} immobili
 * @param {*} toDelete numero di immobili da eliminare
 * @returns gli indici dell'array degli immobili da eliminare
 */
export function getIndexesNotInArray(ids, immobili, toDelete) {
	var toReturn = [];
	var counter = toDelete;
	Object.keys(immobili).map(function (key) {
		if (ids.includes(immobili[key].id) && counter !== 0) {
			toReturn.push(key);
			counter--;
		}
	});
	return toReturn;
}

/**
 * @param {*} ids
 * @param {*} page
 * @returns Gli indici degli immobili da visualizzare nella pagina attuale e nelle 3 pagine adiacenti
 */
export function getIndexesToMantainByPage(ids, page) {
	const pages = Math.ceil(ids.length / 9);
	if (page < 2) {
		return ids.splice(40, ids.length - 40);
	} else if (page > pages - 2) {
		return ids.splice(0, ids.length - 40);
	} else {
		var toReturn = ids.splice(0, (page - 2) * 10);
		return toReturn.splice(40);
	}
}
