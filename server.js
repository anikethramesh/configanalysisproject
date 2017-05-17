//Initialization of Variables
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var app = express();
var fr = require('./fileProcessing');
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var router = express.Router();
router.use(express.static(__dirname+'/View'));
app.use(express.static(__dirname + '/Script'));
router.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/View/index.html'));  
});
router.get('/tablepage',function(req,res){
	res.sendFile(path.join(__dirname+'/View/tablepage.html'));
});		
router.post('/filepost', multer({ dest: './uploads/'}).single('upl'), function(req,res){
	console.log(req.body); //form fields
	console.log(req.file); //form files
	if(req.file){
		var Output;		
		fr.Entry(req.file.path,function(Text){
			//console.log("it should be a non zero file. Check Now.");
			router.get('/lr2get',function(req,res){
				//console.log(Text);
				res.send(Text);
			});
			//console.log(Text);
		});
	}
	res.status(204).end();
});
router.get('/sample',function(req,res){
	res.send({
  "name" : "aniketh",
  "place": "Chennai",
  "animal":"Lions",
  "thing": "Cricket Bat"
});
});
app.use('/',router);
app.listen(port);
console.log('Magic happens on port ' + port);
