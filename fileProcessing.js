'use strict';
var fs = require('fs'),
	readline = require('readline'),
	stream = require('stream'),
	strManip = require('string'),
	forEachAsync = require('foreachasync').forEachAsync;
var StrLine = new Array();
var instream = new stream,
	outstream = new stream;
	outstream.readable = true;
	outstream.writable = true;
//var MainArray = new Array();
var LR2gArray = new Array();
var lac,rac,mcc,mnc,nsei;

// function LacRac2g(Mcc,Mnc,Nsei,Lac,Rac){
// 	this.mcc = Mcc;
// 	this.mnc = Mnc;
// 	this.nsei= Nsei;
// 	this.lac = Lac;
// 	this.rac = Rac;
// }
exports.Entry = function(fileName,callBack){
	AddText(fs.createReadStream(fileName),callBack);
	//callBack(MainArray);
}
function AddText(dataStream,callBack_passed){
	var txt = new Array();
	var r1 = readline.createInterface({
		input: dataStream,
		output: outstream,
		terminal : false
	});
	r1.on('line',function(line){
		txt.push(line);
	});
	r1.on('close',function(){
		Process2gLacRac(txt,callBack_passed);
	});
}
function Process2gLacRac(inputArray,callBack){
	//var LacRac2gObj;	
	forEachAsync(inputArray,function(line){
		if (strManip(line).contains('plmn id mcc')){
			StrLine = strManip(line).replaceAll('plmn id mcc ','').s;
			StrLine = strManip(StrLine).replaceAll(' mnc ',',').s;
			StrLine = StrLine.split(',');
			mcc = strManip(StrLine[0]).trim().s;
			mnc = strManip(StrLine[1]).trim().s;
		}
		if (strManip(line).contains('peer-nsei')){
			StrLine = strManip(line).replaceAll('peer-nsei','').s;
			StrLine = strManip(StrLine).replaceAll(' ','').s;
			StrLine = strManip(StrLine).replaceAll('lac',',').s;			
			StrLine = strManip(StrLine).replaceAll('rac',',').s;
			StrLine = StrLine.split(',');
			nsei = strManip(StrLine[0]).trim().s;
			lac = strManip(StrLine[1]).trim().s;
			rac = strManip(StrLine[2]).trim().s;
			//console.log(mcc,mnc,nsei,lac,rac);
			//LR2gArray.push(JSON.stringify(LacRac2g(mcc,mnc,nsei,lac,rac)));
			LR2gArray.push({
				Mcc : mcc,
				Mnc : mnc,
				Nsei: nsei,
				Lac : lac,
				Rac : rac				
			});			
		}
	}).then(function(){
		callBack(LR2gArray);
	});	
}