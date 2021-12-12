const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const productsInSale = products.filter(product => product.category === "in-sale");
		const productsVisited = products.filter(product => product.category === 'visited') 

		res.render('index', {
			productsInSale,
			productsVisited,
			toThousand
		})
	},
	search: (req, res) => {
		let searchResult = [];
		products.forEach( product => {
			if(product.name.includes(req.query.keywords)){
				searchResult.push(product);
			}
		});
		res.send(searchResult)
		if(searchResult.length !== 0){
			res.render('results', {
				searchResult
			})
		} else {
			
		}
	},
};

module.exports = controller;
