const express = require("express");
const wrap = require("express-async-error-wrapper");
const sql = require("../data/sql");

const router = express.Router();

router.get("/", wrap(async (req, res) => {
	let lista;

	await sql.connect(async sql => {
		lista = sql.query("select id, titulo, tags, autor from post order by id desc limit 12");
	});

	let opcoes = {
		posts: lista
	};

	res.render("index/index", opcoes);
}));

router.get("/sobre", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Sobre"
	};

	res.render("index/sobre", opcoes);
}));

router.get("/produtos", wrap(async (req, res) => {
	let produtoA = {
		id: 1,
		nome: "Produto A",
		valor: 25
	};

	let produtoB = {
		id: 2,
		nome: "Produto B",
		valor: 15
	};

	let produtoC = {
		id: 3,
		nome: "Produto C",
		valor: 100
	};

	let produtosVindosDoBanco = [ produtoA, produtoB, produtoC ];

	let opcoes = {
		titulo: "Listagem de Produtos",
		produtos: produtosVindosDoBanco
	};

	res.render("index/produtos", opcoes);
}));

module.exports = router;
