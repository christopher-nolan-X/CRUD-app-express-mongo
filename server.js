const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

require('env2')('.env'); // loads all entries into process.env

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Setting expresses view engine
app.set('view engine', 'ejs');

// Connecting to the DB
MongoClient.connect(process.env.DB_URL, (err, client) => {
	if (err) return console.log(err);
	db = client.db('quote-machine');
	app.listen(3000, () => {
		console.log('listening on 3000');
	})
})

app.get('/', (req, res) => {
	db.collection('quotes').find().toArray((err, result) => {
		if (err) return console.log(err);
		// renders index.ejs
		res.render('index.ejs', {quotes: result});
	})
	// res.sendFile(__dirname + '/index.html');
	// Note: __dirname is directory that contains the JavaScript source code.
	// console.log(__dirname);
})

let db;

app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);

		console.log('saved to database');
		res.redirect('/');
	})
})

app.put('/quotes', (req, res) => {
	db.collection('quotes').findOneAndUpdate({name: 'Yoda'}, {
		$set: {
			name: req.body.name,
			quote: req.body.quote
		}
	}, {
		sort: {_id: -1},
		upsert: true
	}, (err, result) => {
		if (err) return res.send(err);
		res.send(result);
	})
})

app.delete('/quotes', (req, res) => {
	// Handle delete event here
})