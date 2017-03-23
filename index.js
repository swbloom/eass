const express = require('express');
const app = express();
const emojis = require('./data/emojis.js');
const utils = require('./utils');

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Content-length, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

app.get('/emojis', (req,res) => {
	const query = req.query;
	if(query.limit) {
		res.send({
			emojis: utils.limit(query.limit,emojis)
		});
	}
	else {
		res.send({
			emojis
		});
	}
});

app.get('/emojis/lorem', (req,res) => {
	const loremArr = [];
	const query = req.query;

	const words = query.limit || 100;

	for (let x = 0; x < words; x++) {
		let wordLength = Math.ceil(Math.random() * 5);
		let word = utils.limit(wordLength, emojis).join("");
		loremArr.push(word);
	}

	const loremStr = loremArr.join(" ");

	res.send({
		response: loremStr
	})
});

app.get('/emojis/random', (req,res) => {
	res.send({
		emoji: utils.random(emojis)
	});
});

app.listen(3000)