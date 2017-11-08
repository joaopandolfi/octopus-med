const express = require('express')
const bodyParser = require('body-parser')
var exec = require('child_process').exec;

var telegramAPI = require("./libs/telegramAPI.js");
var interface = require("./libs/interface.js"); 
var responseControl = require("./libs/responseControl.js"); 
const servicesAPI = require("./constants/servicesAPI.js");
const messages = require("./constants/messages.js");
const config = require("./constants/config.js");


const app = express()
app.use( bodyParser.json() );


app.all('/test', function (req, res) {
	//data = [{key:"text=",value:"Resposta automatica"},{key:"chat_id=",value:373552498}]
	//telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);
	console.log(req.body);
	
	photos = req.body.message.photo
	photo = photos[photos.length-1]
	photo.file_id
  	res.send('Ok')
})

app.all('/rest', function (req, res) {
	
	//debug
	console.log(req.body);
	
	//Verifica se e imagem
	if(req.body.message.photo != undefined){
		chat_id = req.body.message.chat.id

		//Coleta dados da imagem
		photos = req.body.message.photo
		index = (photos.length ==4)? 3:photos.length-1
		photo = photos[index]

		//Adiciona imagem na lista de resposta
		responseControl.file_queue.push({chat_id:chat_id,image_id:photo.file_id})

		//Responde usuario
		data = [{key:"text=",value: messages.received_image.replace("{name}", req.body.message.from.first_name)},{key:"chat_id=",value:chat_id}]
		telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);

		//Faz download da imagem
		data_file = [{key:"file_id=",value:photo.file_id}]
		telegramAPI.consumeAPI(servicesAPI.getFile,data_file,function(result){
			telegramAPI.downloadImage(result.data.result,config.download_path+result.data.result.file_id+".jpg", function(result){
				console.log("BAIXOU A IMAGEM"+result.path);
				
				var cmd = "cd {caffe_path} ; python {caffe_script}{id_image}.png"
				cmd = cmd.replace("{caffe_path}",config.caffe_path)
						.replace("{caffe_script}",
							config.caffe_script.replace("{path_in}",config.reverse_path+result.path)
										.replace("{path_out}",config.reverse_path+config.processed_path))
						.replace("{id_image}",result.image_id)

				exec(cmd, function(error, stdout, stderr) {
  					if(error == null){
  						//responseControl.responseImages(config.processed_path,telegramAPI.uploadImage);
  						//responseControl.sendImage(chat_id,config.processed_path+result.image_id+".png",telegramAPI.uploadImage);
  						data_file = {path_img:config.processed_path+result.image_id+".png",chat_id:chat_id}
  						telegramAPI.uploadImage(data_file,function(result){
  							//console.log(chat_id)
  							console.log(result)
  							console.log("IMAGE DATA: "+result.photo)
  						});
  					}
  					else{
  						console.log("ERRO AO PROCESSAR IMAGEM");
  						console.log(stderr)
  					}
  					//console.log(stderr)
  					//console.log(stdout)
				});
			});	
		});
		
	} //Chat
	else{

		if(req.body.message.text == "beleza" || req.body.message.text == "Beleza"){
			data = [{key:"text=",value:messages.blz},{key:"chat_id=",value:req.body.message.chat.id}]
			telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);		
		}
		else if(req.body.message.text == "/start"){
			data = [{key:"text=",value:messages.hello.replace("{name}",req.body.message.from.first_name)},{key:"chat_id=",value:req.body.message.chat.id}]
			telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);

			data_file = [{key:"photo=",value:config.tut_img_id},{key:"chat_id=",value:req.body.message.chat.id}]
			telegramAPI.consumeAPI(servicesAPI.sendPhoto,data_file,interface.show);

			//data_file = {path_img:config.tut_img_path,chat_id: req.body.message.chat.id}
			/*telegramAPI.uploadImage(data_file,function(result){
				//console.log(chat_id)
				console.log(result)
				console.log("IMAGE DATA: ")
				console.log(result.result.photo)
			});*/
		}
		else{
			data = [{key:"text=",value:messages.default.replace("{name}",req.body.message.from.first_name)},{key:"chat_id=",value:req.body.message.chat.id}]
			telegramAPI.consumeAPI(servicesAPI.sendMessage,data,interface.show);
		}
	}
	
	console.log("ok")
  	res.send('Ok')
})

app.all('/test2', function (req, res) {
	console.log(req.body);
  	res.send('Ok')
})

app.listen(config.port, function () {
  console.log('Octopus Med running on port'+config.port)
})
