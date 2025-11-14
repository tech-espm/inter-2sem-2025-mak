const express = require("express");
const wrap = require("express-async-error-wrapper");
const sql = require("../data/sql");

const router = express.Router();

router.get("/", wrap(async (req, res) => {
	res.render("index/index");
}));

router.get("/sobre", wrap(async (req, res) => {
	let opcoes = {
		titulo: "Sobre"
	};

	res.render("index/sobre", opcoes);
}));

router.get("/blog", wrap(async (req, res) => {
	let lista;

	await sql.connect(async sql => {
		lista = await sql.query("select id, titulo, tags, autor, date_format(data, '%d/%m/%Y') data from post order by id desc limit 12");
	});

	let opcoes = {
		titulo: "Blog",
		posts: lista
	};

	res.render("index/blog", opcoes);
}));

module.exports = router;
