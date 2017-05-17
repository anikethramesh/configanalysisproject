$(document).ready(function(){
	$("#hello").text("Blah blah");
	$('#table').bootstrapTable({
	    url: 'http://localhost:5050/lr2get',
	    columns: [{
	        field: 'Mcc',
	        title: 'Mcc'
	    }, {
	        field: 'Mnc',
	        title: 'Mnc'
	    }, {
	        field: 'Nsei',
	        title: 'Nsei'
	    },{
	        field: 'Lac',
	        title: 'Lac'
	    },{
	        field: 'Rac',
	        title: 'Rac'
	    } ]
	});
});