/**
 *
 * @param {*} appuntamenti
 * @returns un array di oggetti leggibili da FullCalendar sulla base degli appuntamenti passati
 */
export function getEvents(appuntamenti) {
	var events = [];
	for (let i = 0; i < appuntamenti.length; i++) {
		const appuntamento = appuntamenti[i];
		var event = {
			start: appuntamento.inizio,
			end: appuntamento.fine,
			id: appuntamento.id,
			title: appuntamento.inizio.split("T")[1].slice(0, 5),
		};
		events.push(event);
	}
	return events;
}

/**
 * @param {*} appId
 * @param {*} appuntamenti
 * @returns l'appuntamento il cui id è appId
 */
export function getAppuntamentoFromId(appId, appuntamenti) {
	var toReturn;
	appuntamenti.map(function (appuntamento) {
		if (appuntamento.id === appId) toReturn = appuntamento;
	});
	return toReturn;
}
