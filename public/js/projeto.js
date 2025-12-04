"use strict";

function waitSwal() {
	Swal.fire({
		html: "Por favor, aguarde...",
		allowOutsideClick: false,
		allowEscapeKey: false,
		allowEnterKey: false,
		didOpen: () => {
			Swal.showLoading();
		}
	});
}

async function exibirErro(response) {
	let r = await response.text();

	let json = null;
	try {
		json = JSON.parse(r);
	} catch (ex) {
		// Apenas ignora o erro de parse
	}

	if (json) {
		if (typeof json === "string") {
			r = json;
		} else if (json.message) {
			r = json.message;
		}
	}

	return Swal.fire("Erro", r, "error");
}

async function cadastrarOrcamento() {
	const nomeInput = document.getElementById("nomeSlide");
	const celularInput = document.getElementById("celularSlide");
	const msg = document.getElementById("mensagemEnvio");

	const nome = nomeInput.value.trim();
	const celular = celularInput.value.trim();

	// limpa mensagem anterior
	msg.textContent = "";
	msg.className = "msg-envio";

	// validações simples no front
	if (!nome) {
		msg.textContent = "Por favor, preencha seu nome.";
		msg.classList.add("erro");
		return;
	}

	if (!celular) {
		msg.textContent = "Por favor, preencha seu celular.";
		msg.classList.add("erro");
		return;
	}

	//----------------------------------------------------------
	// 🔥 NOVO COMPORTAMENTO: FECHAR POPUP LOGO NO CLIQUE
	//----------------------------------------------------------
	if (typeof fecharPopupSlide === "function") {
		fecharPopupSlide();
	}
	//----------------------------------------------------------

	try {
		// mostra loading
		waitSwal();

		const response = await fetch("/cadastrarOrcamento", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				nome: nome,
				celular: celular
			})
		});

		if (!response.ok) {
			Swal.close();
			await exibirErro(response);
			return;
		}

		const resultado = await response.json();

		if (resultado === true) {
			Swal.close();

			Swal.fire(
				"Pronto!",
				"Cadastro realizado com sucesso. Em até 24h úteis entraremos em contato.",
				"success"
			);

			// limpa campos
			nomeInput.value = "";
			celularInput.value = "";

		} else {
			Swal.close();
			Swal.fire(
				"Ops!",
				"Não foi possível concluir o cadastro. Tente novamente.",
				"warning"
			);
		}

	} catch (e) {
		Swal.close();
        console.error(e);
		Swal.fire(
			"Erro",
			"Erro inesperado ao enviar o cadastro. Tente novamente mais tarde.",
			"error"
		);
	}
}
