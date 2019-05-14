/*
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

module.exports = {
	all: "*",
	id: "[0-9]+",
	pass: "([0-9]+|[a-f]+){32}",
	key: "([0-9]+|[a-f]+){32}",
	email: "*@*.*",
	double: "(-|)[0-9]+.[0-9]+",
	dis: "[0-9]+.[0-9]+",
	name: "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+",
	url_name: "[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ%20]+",
	utc_date: "([A-Za-z0-9%20:\+\(\)||%7C])+",
	base_64: "([A-Za-z0-9\+/=])+"
};