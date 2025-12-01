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

router.post("/cadastrarOrcamento", wrap(async (req, res) => {
	let orcamento = req.body;

	if (!orcamento.nome) {
		res.status(400).json("Nome inválido");
		return;
	}

	if (!orcamento.celular) {
		res.status(400).json("Celular inválido");
		return;
	}

	const parametros = [
		orcamento.nome,
		orcamento.celular
	];

	await sql.connect(async sql => {
		lista = await sql.query("insert into cadastro (nome, telefone) values (?, ?)", parametros);
	});

	res.json(true);
}));

module.exports = router;
