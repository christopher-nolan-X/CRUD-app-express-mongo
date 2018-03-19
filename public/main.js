// main.js
let update = document.getElementById('update');

update.addEventListener('click', function() {
	fetch('quotes', {
		methods: 'put',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			'name': 'Darth Vader',
			'quote': 'I find your lack of faith disturbing.'
		})
	})
})