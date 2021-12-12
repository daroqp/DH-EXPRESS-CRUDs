const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dataBase), 'utf-8');
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => product.id === +req.params.id);

		res.render('detail', {
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let lastId = 1;

		products.forEach(product => {
			if(product.id > lastId){
				lastId = product.id;
			}
		});

		let { name, price, discount, category, description } = req.body;

		let newProduct = {
			id: lastId + 1,
			name,
			price,
			discount,
			category,
			description,
			image: "default-image.png"
		}
		products.push(newProduct)

		writeJSON(products);
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product => product.id === +req.params.id);

		res.render('product-edit-form', {
			product,
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magici
		let {
			name,
			price,
			discount,
			category,
			description
		} = req.body;
		products.forEach(product => {
			if(product.id === +req.params.id){
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.category = category,
				product.description = description
			}
		})
		writeJSON(products);
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let product = products.find(product => product.id === +req.params.id);
		
		products.forEach(product => {
			if(product.id === +req.params.id){
				let productDestroy = products.indexOf(product);
				products.splice(productDestroy, 1)
			}
		})
		writeJSON(products);
		res.redirect('/products')
	}
};

module.exports = controller;