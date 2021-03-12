/**
 * @param {*} date
 * @returns la data in formato EU
 */
export function dateStringConverter(date) {
	if (date.charAt(2) !== "-") {
		const oldDate = date.split("T")[0];
		const toInvert = oldDate.split("-");
		return toInvert[2] + "-" + toInvert[1] + "-" + toInvert[0];
	}
	return date;
}

/**
 * @param {*} date
 * @returns la data in formato USA a partire da un oggetto date
 */
export function getDateString(date) {
	return (
		date.getFullYear() +
		"-" +
		String(date.getMonth() + 1).padStart(2, "0") +
		"-" +
		String(date.getDate()).padStart(2, "0")
	);
}

/**
 * @param {*} dateString
 * @returns un oggetto date a partire da una stringa
 */
function getDateFromString(dateString) {
	var myDate = new Date();
	const oldDate = dateString.split("-");
	myDate.setFullYear(oldDate[0]);
	myDate.setMonth(oldDate[1] - 1);
	myDate.setDate(oldDate[2]);
	return myDate;
}

/**
 * @returns la data del lunedì precedente ad oggi
 */
export function getStartDate() {
	var myDate = new Date();
	const dateOffset = 24 * 60 * 60 * 1000 * myDate.getDay();
	myDate.setTime(myDate.getTime() - dateOffset);
	return getDateString(myDate);
}

/**
 * @returns la data della domenica successiva ad oggi
 */
export function getEndDate() {
	var myDate = new Date();
	const dateOffset = 24 * 60 * 60 * 1000 * (6 - myDate.getDay());
	myDate.setTime(myDate.getTime() + dateOffset);
	return getDateString(myDate);
}

/**
 * @param {*} previousWeek
 * @param {*} dateString
 * @returns la data d'inizio della settimana precedente o successiva a dateString
 */
export function shiftDateWeek(previousWeek, dateString) {
	var date = getDateFromString(dateString);
	var dateOffset = 0;
	dateOffset = 24 * 60 * 60 * 1000 * 7;
	if (previousWeek) {
		date.setTime(date.getTime() - dateOffset);
	} else date.setTime(date.getTime() + dateOffset);
	return getDateString(date);
}
