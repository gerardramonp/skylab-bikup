const debug = require('debug')('app:crudBikeController');
const { ObjectID } = require('mongodb');

function crudBikeController(UserModel, BikeModel, CompoModel) {
	function post(req, res) {
		// comprovar que la bici no existeix
		// Si existeix retornar missatge bike name already exist
		// Si no existeix crear bici i dir que ja existeix
	}
}
