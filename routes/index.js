const express = require("express");
const wrap = require("express-async-error-wrapper");
const sql = require("../data/sql");

const router = express.Router();

router.get("/", wrap(async (req, res) => {
	let lista;

	await sql.connect(async sql => {
		lista = await sql.query("select id, titulo, descricao from post order by id desc limit 10");
	});

	let opcoes = {
		posts: lista
	};

	res.render("index/index", opcoes);
}));

router.get("/post", wrap(async (req, res) => {
	let lista;

	let id = req.query["id"];

	await sql.connect(async sql => {
		lista = await sql.query("select id, titulo, descricao, conteudo, tags, autor, date_format(dia, '%d/%m/%y') dia from post where id = ?", [id]);
	});

	if (lista.length) {
		res.json(lista[0]);
	} else {
		res.status(404).json("Post não encontrado");
	}
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
		lista = await sql.query("select id, titulo, tags, autor, date_format(dia, '%d/%m/%Y') data from post order by id desc limit 12");
	});

	let opcoes = {
		titulo: "Blog",
		posts: lista
	};

	res.render("index/blog", opcoes);
}));

router.post("/cadastrarOrcamento", wrap(async (req, res) => {
	const orcamento = req.body;

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
		await sql.query(
			"insert into cadastro (nome, telefone) values (?, ?)",
			parametros
		);
	});

	res.json(true);
}));

router.post("/criarPost", wrap(async (req, res) => {
	const post = req.body;

	if (!post.titulo) {
		res.status(400).json("Título inválido");
		return;
	}

	if (!post.tags) {
		res.status(400).json("Tags inválidas");
		return;
	}

	if (!post.autor) {
		res.status(400).json("Autor inválido");
		return;
	}

	if (!post.dia) {
		res.status(400).json("Dia inválido");
		return;
	}

	if (!post.descricao) {
		res.status(400).json("Descrição inválida");
		return;
	}

	if (!post.conteudo) {
		res.status(400).json("Conteúdo inválido");
		return;
	}

	const parametros = [
		post.titulo,
		post.tags,
		post.autor,
		post.dia,
		post.descricao,
		post.conteudo
	];

	await sql.connect(async sql => {
		await sql.query(
			"insert into post (titulo, tags, autor, dia, descricao, conteudo) values (?, ?, ?, ?, ?, ?)",
			parametros
		);
	});

	res.json(true);
}));

module.exports = router;


