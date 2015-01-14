$(function() {
	$('.b-form').on('submit', function(event) {
        event.preventDefault();
        $.post('/login', $(this).serialize(), function() {
			alert('Авторизация прошла успешно!');
		});
	});
});
