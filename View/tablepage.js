$(document).ready(function(){
	$("#hello").text("Blah blah");
	$('#table').bootstrapTable({
	    url: 'http://localhost:5000/lr2get',
	    dataType: "jsonp",
	    headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',

        },
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