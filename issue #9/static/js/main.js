$(function() {
	var format = function(state, container) {
        if (!state.id) {
			return state.text;
		}
        container.append(document.createTextNode(state.text));
        container.prepend(
            $('<i class="b-info">link</i>').mousedown(function(event) {
                event.preventDefault();
                alert(state.text);
            })
        );
	};

	$('.b-select').select2({
		formatResult: format,
		formatSelection: format,
		escapeMarkup: function(markup) {
			return markup;
		}
	});
});
