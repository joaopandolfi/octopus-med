/*
* Classe base de controller Octopus Med
* 
* (C) João Carlos Pandolfi Santana - 15/10/2017
*/

var Autenticator = require( './autenticator.js' );

var test = function(req,res){
	res.send({test:"ok"});
}

var Controller = {
	query_format: {
		error: 0, 
		message: "Sucess", 
		results:{}
	},

	url_data:{
		user_id: null,
		hash: null,
		q_id: null
	},

	url_data_prepare: {
		ambulatory: null,
		session: null
	},

	add: test,

	search: test,

	update: test,

  /*
   * Get data from prepare url 
   * @receives /{ambulatory}/{session}/
   * @return url_data {hash,user_id,q_id}
   * */
	get_prepare_data: function(req){
		var url_components = req.path.split('/');
		var len = url_components.length -1;
		this.url_data_prepare.session = url_components[len-1];
		this.url_data_prepare.ambulatory = url_components[len-2];
	},

  /*
   * Get data from url 
   * @receives /{id}/{id_user}/{hash}/  
   * @return url_data {hash,user_id,q_id}
   * */
	get_url_data: function(req){
		var url_components = req.path.split('/');
		var len = url_components.length -1
		this.url_data.hash 	= url_components[len-1];
		this.url_data.user_id = url_components[len-2];
		this.url_data.q_id = url_components[len-3];
	},

  /*
   * Check id hash make a sense
   * @receives user_id {User id}
   * @receives hash {Hash sended by client}
   * @return true or false
   * */
	check_hash_id: function(user_id, hash){
		return Autenticator.check_hash_id(user_id,hash);
	},

  /*
   * Check if requestion is valid 
   * @receives req
   * @return true or false
   * */
	check_requisition: function(req){
		this.get_url_data(req)
		return this.check_hash_id(this.url_data.user_id,this.url_data.hash)
	},


  /*
   * Get data and check request 
   * @receives req
   * @return {accept: (true or false), data}
   * */
 	prepare_request: function(req,res){
		var result = {
			accept: true,
			data: {}
		}

		var var_req = req.body;
		result.data = Generic.decode_data(var_req)

		//Check authentication
		if(!Generic.check_requisition(req)){
			res.send(Generic.error_message(500,"Bad request"));
			result.accept = false;
		}

		return result;
	},


  /*
   * Create error message
   * @receives code {Number of message}
   * @receives message {Message to send}
   * @return {formatted message}
   * */
	error_message: function(code, message){
		return {success: 0, error:{code:code,message:message}};
	},

	format_response: function(data){
		return {
			success: 1,
			data: data
		}
	},

	test: test 
}


module.exports = Controller;
