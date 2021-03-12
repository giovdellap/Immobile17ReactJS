/**
 * Crea un cookie con il token identificativo
 * @param {*} token
 */
export function createCookie(token) {
	var date = new Date();
	date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
	document.cookie =
		"Immobile17token=" +
		token +
		"; expires=" +
		date.toGMTString() +
		"; path=/";
}

/**
 * @returns il token se il cookie è presente, NO COOKIE se è assente
 */
export function readCookie() {
	var name = "Immobile17token=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1, c.length);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "NO COOKIE";
}

/**
 * Elimina il cookie
 */
export function eraseCookie() {
	var date = new Date();
	date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
	document.cookie =
		"Immobile17token=" + "; expires=" + date.toGMTString() + "; path=/";
}
