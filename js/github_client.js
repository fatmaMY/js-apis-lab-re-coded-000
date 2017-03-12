//define functions here
var createGist = function(file_name, content, description, token){
	var data = {
		'public':   true,
		'description': description,
		'files': {}
	};

	data['files'][file_name] = {
		'content': content
	};

	$.ajax({
		url: 'https://api.github.com/gists',
		type: 'POST',
		dataType: 'json',
		headers: {
			Authorization: "token "+token,
		},
		
		data: JSON.stringify(data)
	}).done(function(response) {
		myGists(username, token);
	});
};

var myGists = function (username, token){
	$.ajax({
		url: 'https://api.github.com/users/'+username+'/'+token,
		type: 'GET',
		dataType: 'jsonp'
	}).success( function(gistdata) {
		
			var link = `<a href = '${gistdata.html_url}'>${gistdata.description}</a>`;

			$('#myGists').append(link);
		});
}


var bindCreateButton = function() {
	$('#form').submit(function(e) {
        e.preventDefault();
		var token = $('#token').val();
		var file_name = $('#file_name').val();
		var content = $('#content').val();
		var description = $('#description').val();

		createGist(file_name, content, description, token);
	});
};

$(document).ready(function(){
	
	bindCreateButton();
});
