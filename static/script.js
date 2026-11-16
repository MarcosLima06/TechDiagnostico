

const botao = document.getElementById("btnDiagnostico");
const resultado = document.getElementById("resultadoDiagnostico");

botao.addEventListener("click", async function () {
    botao.disabled = true;
    botao.textContent = "Aguarde...";

    resultado.style.color = "#38bdf8";
    resultado.textContent = "Analisando o computador...";

    try {
        const resposta = await fetch("/api/sistema");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o sistema.");
        }

        const dados = await resposta.json();

        
resultado.style.color = "#f8fafc";

resultado.innerHTML = `
    <div class="painel-diagnostico">
        <h3>Resultado do Diagnóstico</h3>

        
        <div class="informacao">
            <strong>Sistema operacional:</strong>
            <span class="status-sucesso">${dados.sistema}</span></div>


        <div class="informacao">
            <strong>Versão:</strong>
            <span>${dados.versao}</span>
        </div>

        <div class="informacao">
            <strong>Arquitetura:</strong>
            <span>${dados.arquitetura}</span>
        </div>

        <div class="informacao">
            <strong>Processador:</strong>
            <span>${dados.processador}</span>
        </div>
    </div>
`;


    } catch (erro) {
        resultado.style.color = "#f87171";
        resultado.textContent =
            "Não foi possível realizar o diagnóstico.";
        console.error(erro);

    } finally {
        botao.disabled = false;
        botao.textContent = "Iniciar Diagnóstico";
    }
});



const botaoRede = document.getElementById("btnRede");
const resultadoRede = document.getElementById("resultadoRede");

botaoRede.addEventListener("click", async function () {
    botaoRede.disabled = true;
    botaoRede.textContent = "Aguarde...";

    resultadoRede.textContent = "Verificando conexão de rede...";
    resultadoRede.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/rede");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a rede.");
        }

        const dados = await resposta.json();

        resultadoRede.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Resultado do Diagnóstico de Rede";
        painel.appendChild(titulo);

        const informacoes = [
            ["Status", dados.status],
            ["Servidor", dados.servidor],
            ["Porta", dados.porta],
            ["Tempo de conexão", dados.tempo_ms === null
                ? "Indisponível"
                : dados.tempo_ms + " ms"]
        ];

        informacoes.forEach(function ([nome, valor]) {
            const linha = document.createElement("div");
            linha.className = "informacao";

            const rotulo = document.createElement("strong");
            rotulo.textContent = nome + ":";

            const conteudo = document.createElement("span");
            conteudo.textContent = valor;


            if (nome === "Status" && dados.status === "Conectado") {
                conteudo.classList.add("status-sucesso");
            }


            linha.append(rotulo, conteudo);
            painel.appendChild(linha);
        });

        resultadoRede.replaceChildren(painel);

    } catch (erro) {
        resultadoRede.style.color = "#f87171";
        resultadoRede.textContent =
            "Não foi possível realizar o diagnóstico de rede.";

        console.error(erro);

    } finally {
        botaoRede.disabled = false;
        botaoRede.textContent = "Diagnosticar Rede";
    }
});



const botaoDNS = document.getElementById("btnDNS");
const resultadoDNS = document.getElementById("resultadoDNS");

botaoDNS.addEventListener("click", async function () {
    botaoDNS.disabled = true;
    botaoDNS.textContent = "Aguarde...";

    resultadoDNS.textContent = "Verificando resolução DNS...";
    resultadoDNS.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/dns");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o DNS.");
        }

        const dados = await resposta.json();

        resultadoDNS.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Resultado do Diagnóstico DNS";
        painel.appendChild(titulo);

        const informacoes = [
            ["Status", dados.status],
            ["Domínio", dados.dominio],
            ["Endereço IP", dados.endereco_ip ?? "Indisponível"],
            ["Tempo da consulta", dados.tempo_ms === null
                ? "Indisponível"
                : dados.tempo_ms + " ms"]
        ];

        informacoes.forEach(function ([nome, valor]) {
            const linha = document.createElement("div");
            linha.className = "informacao";

            const rotulo = document.createElement("strong");
            rotulo.textContent = nome + ":";

            const conteudo = document.createElement("span");
            conteudo.textContent = valor;

            
                    
            
            if (nome === "Status" && dados.status === "DNS funcionando") {
            conteudo.classList.add("status-sucesso");
        }


            linha.append(rotulo, conteudo);
            painel.appendChild(linha);
        });

        resultadoDNS.replaceChildren(painel);

    } catch (erro) {
        resultadoDNS.style.color = "#f87171";
        resultadoDNS.textContent =
            "Não foi possível realizar o diagnóstico DNS.";

        console.error(erro);

    } finally {
        botaoDNS.disabled = false;
        botaoDNS.textContent = "Diagnosticar DNS";
    }
});



const botaoMemoria = document.getElementById("btnMemoria");
const resultadoMemoria = document.getElementById("resultadoMemoria");

botaoMemoria.addEventListener("click", async function () {
    botaoMemoria.disabled = true;
    botaoMemoria.textContent = "Aguarde...";

    resultadoMemoria.textContent = "Analisando memória RAM...";
    resultadoMemoria.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/memoria");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a memória RAM.");
        }

        const dados = await resposta.json();

        resultadoMemoria.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Resultado do Diagnóstico de Memória RAM";
        painel.appendChild(titulo);

        const informacoes = [
            ["Memória total", dados.total_gb + " GB"],
            ["Memória utilizada", dados.utilizada_gb + " GB"],
            ["Memória disponível", dados.disponivel_gb + " GB"],
            ["Porcentagem de uso", dados.porcentagem_uso + "%"],
            ["Situação da memória", dados.porcentagem_uso >= 85
                ? "Uso elevado"
                : dados.porcentagem_uso >= 70
                    ? "Atenção"
                    : "Uso normal"]

        ];

        informacoes.forEach(function ([nome, valor]) {
            const linha = document.createElement("div");
            linha.className = "informacao";

            const rotulo = document.createElement("strong");
            rotulo.textContent = nome + ":";

            const conteudo = document.createElement("span");
            conteudo.textContent = valor;


            if (nome === "Situação da memória") {
                if (dados.porcentagem_uso >= 85) {
                    conteudo.classList.add("memoria-elevada");
                } else if (dados.porcentagem_uso >= 70) {
                    conteudo.classList.add("memoria-atencao");
                } else {
                    conteudo.classList.add("memoria-normal");
                }
            }


            linha.append(rotulo, conteudo);
            painel.appendChild(linha);
        });

        resultadoMemoria.replaceChildren(painel);

    } catch (erro) {
        resultadoMemoria.style.color = "#f87171";
        resultadoMemoria.textContent =
            "Não foi possível diagnosticar a memória RAM.";

        console.error(erro);

    } finally {
        botaoMemoria.disabled = false;
        botaoMemoria.textContent = "Diagnosticar Memória RAM";
    }
});




const botaoCPU = document.getElementById("btnCPU");
const resultadoCPU = document.getElementById("resultadoCPU");

botaoCPU.addEventListener("click", async function () {
    botaoCPU.disabled = true;
    botaoCPU.textContent = "Aguarde...";

    resultadoCPU.textContent = "Analisando processador...";
    resultadoCPU.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/cpu");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a CPU.");
        }

        const dados = await resposta.json();

        resultadoCPU.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Resultado do Diagnóstico da CPU";
        painel.appendChild(titulo);

        const situacao = dados.uso_percentual >= 85
            ? "Uso elevado"
            : dados.uso_percentual >= 70
                ? "Atenção"
                : "Uso normal";

        const informacoes = [
            ["Uso da CPU", dados.uso_percentual + "%"],
            ["Núcleos físicos", dados.nucleos_fisicos ?? "Indisponível"],
            ["Processadores lógicos", dados.processadores_logicos],
            ["Situação da CPU", situacao]
        ];

        informacoes.forEach(function ([nome, valor]) {
            const linha = document.createElement("div");
            linha.className = "informacao";

            const rotulo = document.createElement("strong");
            rotulo.textContent = nome + ":";

            const conteudo = document.createElement("span");
            conteudo.textContent = valor;


        if (nome === "Situação da CPU") {
            if (dados.uso_percentual >= 85) {
                conteudo.classList.add("cpu-elevada");
            } else if (dados.uso_percentual >= 70) {
                conteudo.classList.add("cpu-atencao");
            } else {
                conteudo.classList.add("cpu-normal");
            }
        }


            linha.append(rotulo, conteudo);
            painel.appendChild(linha);
        });

        resultadoCPU.replaceChildren(painel);

    } catch (erro) {
        resultadoCPU.style.color = "#f87171";
        resultadoCPU.textContent =
            "Não foi possível diagnosticar o processador.";

        console.error(erro);

    } finally {
        botaoCPU.disabled = false;
        botaoCPU.textContent = "Diagnosticar Processador (CPU)";
    }
});



const botaoDisco = document.getElementById("btnDisco");
const resultadoDisco = document.getElementById("resultadoDisco");

botaoDisco.addEventListener("click", async function () {
    botaoDisco.disabled = true;
    botaoDisco.textContent = "Aguarde...";

    resultadoDisco.textContent = "Analisando armazenamento...";
    resultadoDisco.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/disco");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o disco.");
        }

        const dados = await resposta.json();

        resultadoDisco.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Resultado do Diagnóstico de Armazenamento";
        painel.appendChild(titulo);

        const situacao = dados.porcentagem_uso >= 90
            ? "Espaço crítico"
            : dados.porcentagem_uso >= 80
                ? "Atenção"
                : "Espaço disponível";

        const informacoes = [
            ["Capacidade total", dados.total_gb + " GB"],
            ["Espaço utilizado", dados.utilizado_gb + " GB"],
            ["Espaço disponível", dados.disponivel_gb + " GB"],
            ["Porcentagem de uso", dados.porcentagem_uso + "%"],
            ["Situação do disco", situacao]
        ];

        informacoes.forEach(function ([nome, valor]) {
            const linha = document.createElement("div");
            linha.className = "informacao";

            const rotulo = document.createElement("strong");
            rotulo.textContent = nome + ":";

            const conteudo = document.createElement("span");
            conteudo.textContent = valor;

            if (nome === "Situação do disco") {
                if (dados.porcentagem_uso >= 90) {
                    conteudo.classList.add("disco-critico");
                } else if (dados.porcentagem_uso >= 80) {
                    conteudo.classList.add("disco-atencao");
                } else {
                    conteudo.classList.add("disco-normal");
                }
            }


            linha.append(rotulo, conteudo);
            painel.appendChild(linha);
        });

        resultadoDisco.replaceChildren(painel);

    } catch (erro) {
        resultadoDisco.style.color = "#f87171";
        resultadoDisco.textContent =
            "Não foi possível diagnosticar o armazenamento.";

        console.error(erro);

    } finally {
        botaoDisco.disabled = false;
        botaoDisco.textContent = "Diagnosticar Armazenamento";
    }
});



const botaoProcessos = document.getElementById("btnProcessos");
const resultadoProcessos = document.getElementById("resultadoProcessos");

botaoProcessos.addEventListener("click", async function () {
    botaoProcessos.disabled = true;
    botaoProcessos.textContent = "Aguarde...";

    resultadoProcessos.textContent = "Analisando processos...";
    resultadoProcessos.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/processos");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar processos.");
        }

        const processos = await resposta.json();

        resultadoProcessos.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Processos com Maior Consumo de RAM";
        painel.appendChild(titulo);

        if (processos.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhum processo encontrado.";
            painel.appendChild(mensagem);
        }

        processos.forEach(function (processo, indice) {
            const bloco = document.createElement("div");
            bloco.className = "processo-item";

            const informacoes = [
                ["Processo", (indice + 1) + ". " + (processo.nome ?? "Desconhecido")],
                ["PID", processo.pid],
                ["Memória utilizada", processo.memoria_mb + " MB"]
            ];

            informacoes.forEach(function ([nome, valor]) {
                const linha = document.createElement("div");
                linha.className = "informacao";

                const rotulo = document.createElement("strong");
                rotulo.textContent = nome + ":";

                const conteudo = document.createElement("span");
                conteudo.textContent = valor;

                linha.append(rotulo, conteudo);
                bloco.appendChild(linha);
            });

            painel.appendChild(bloco);
        });

        resultadoProcessos.replaceChildren(painel);

    } catch (erro) {
        resultadoProcessos.style.color = "#f87171";
        resultadoProcessos.textContent =
            "Não foi possível diagnosticar os processos.";

        console.error(erro);

    } finally {
        botaoProcessos.disabled = false;
        botaoProcessos.textContent = "Diagnosticar Processos";
    }
});



const botaoServicos = document.getElementById("btnServicos");
const resultadoServicos = document.getElementById("resultadoServicos");

botaoServicos.addEventListener("click", async function () {
    botaoServicos.disabled = true;
    botaoServicos.textContent = "Aguarde...";

    resultadoServicos.textContent = "Consultando serviços do Windows...";
    resultadoServicos.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/servicos");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar os serviços.");
        }

        const servicos = await resposta.json();

        resultadoServicos.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Diagnóstico de Serviços do Windows";
        painel.appendChild(titulo);

        servicos.forEach(function (servico) {
            const bloco = document.createElement("div");
            bloco.className = "processo-item";

            const statusTraduzido = {
                running: "Em execução",
                stopped: "Parado",
                paused: "Pausado"
            };

            const informacoes = [
                ["Serviço", servico.nome],
                ["Nome técnico", servico.servico],
                ["Status", statusTraduzido[servico.status] ?? servico.status]
            ];

            informacoes.forEach(function ([nome, valor]) {
                const linha = document.createElement("div");
                linha.className = "informacao";

                const rotulo = document.createElement("strong");
                rotulo.textContent = nome + ":";

                const conteudo = document.createElement("span");
                conteudo.textContent = valor;

            if (nome === "Status") {
                if (servico.status === "running") {
                    conteudo.classList.add("servico-ativo");
                } else if (
                    servico.status === "stopped" ||
                    servico.status === "paused"
                ) {
                    conteudo.classList.add("servico-parado");
                } else {
                    conteudo.classList.add("servico-indisponivel");
                }
            }


                linha.append(rotulo, conteudo);
                bloco.appendChild(linha);
            });

            painel.appendChild(bloco);
        });

        resultadoServicos.replaceChildren(painel);

    } catch (erro) {
        resultadoServicos.style.color = "#f87171";
        resultadoServicos.textContent =
            "Não foi possível consultar os serviços do Windows.";

        console.error(erro);

    } finally {
        botaoServicos.disabled = false;
        botaoServicos.textContent = "Diagnosticar Serviços do Windows";
    }
});



const botaoUptime = document.getElementById("btnUptime");
const resultadoUptime = document.getElementById("resultadoUptime");

botaoUptime.addEventListener("click", async function () {
    botaoUptime.disabled = true;
    botaoUptime.textContent = "Aguarde...";

    resultadoUptime.textContent = "Verificando tempo de atividade...";
    resultadoUptime.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/uptime");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o tempo de atividade.");
        }

        const dados = await resposta.json();

        resultadoUptime.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Tempo de Atividade do Computador";
        painel.appendChild(titulo);

        const informacoes = [
            ["Dias", dados.dias],
            ["Horas", dados.horas],
            ["Minutos", dados.minutos],
            ["Tempo total", dados.tempo_formatado]
        ];

        informacoes.forEach(function ([nome, valor]) {
            const linha = document.createElement("div");
            linha.className = "informacao";

            const rotulo = document.createElement("strong");
            rotulo.textContent = nome + ":";

            const conteudo = document.createElement("span");
            conteudo.textContent = valor;

            linha.append(rotulo, conteudo);
            painel.appendChild(linha);
        });

        resultadoUptime.replaceChildren(painel);

    } catch (erro) {
        resultadoUptime.style.color = "#f87171";
        resultadoUptime.textContent =
            "Não foi possível verificar o tempo de atividade.";

        console.error(erro);

    } finally {
        botaoUptime.disabled = false;
        botaoUptime.textContent = "Verificar Tempo de Atividade";
    }
});



const botaoRedeLocal = document.getElementById("btnRedeLocal");
const resultadoRedeLocal = document.getElementById("resultadoRedeLocal");

botaoRedeLocal.addEventListener("click", async function () {
    botaoRedeLocal.disabled = true;
    botaoRedeLocal.textContent = "Aguarde...";

    resultadoRedeLocal.textContent = "Analisando rede local...";
    resultadoRedeLocal.style.color = "#38bdf8";

    try {
        const resposta = await fetch("/api/rede-local");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a rede local.");
        }

        const dados = await resposta.json();

        resultadoRedeLocal.style.color = "#f8fafc";

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Diagnóstico da Rede Local";
        painel.appendChild(titulo);

        const computador = document.createElement("div");
        computador.className = "informacao";

        const rotulo = document.createElement("strong");
        rotulo.textContent = "Nome do computador:";

        const valor = document.createElement("span");
        valor.textContent = dados.nome_computador;

        computador.append(rotulo, valor);
        painel.appendChild(computador);

        if (dados.interfaces.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhuma interface IPv4 encontrada.";
            painel.appendChild(mensagem);
        }

        dados.interfaces.forEach(function (interfaceRede) {
            const bloco = document.createElement("div");
            bloco.className = "processo-item";

            const informacoes = [
                ["Interface", interfaceRede.interface],
                ["Endereço IP", interfaceRede.endereco_ip],
                ["Máscara de sub-rede", interfaceRede.mascara ?? "Indisponível"]
            ];

            informacoes.forEach(function ([nome, valor]) {
                const linha = document.createElement("div");
                linha.className = "informacao";

                const rotulo = document.createElement("strong");
                rotulo.textContent = nome + ":";

                const conteudo = document.createElement("span");
                conteudo.textContent = valor;

                linha.append(rotulo, conteudo);
                bloco.appendChild(linha);
            });

            painel.appendChild(bloco);
        });

        resultadoRedeLocal.replaceChildren(painel);

    } catch (erro) {
        resultadoRedeLocal.style.color = "#f87171";
        resultadoRedeLocal.textContent =
            "Não foi possível diagnosticar a rede local.";

        console.error(erro);

    } finally {
        botaoRedeLocal.disabled = false;
        botaoRedeLocal.textContent = "Diagnosticar Rede Local";
    }
});




const btnRelatorio = document.getElementById("btnRelatorio");
const resultadoRelatorio = document.getElementById("resultadoRelatorio");

btnRelatorio.addEventListener("click", async function () {


    const statusSelecionado = document.getElementById("statusAtendimento").value;
    const dataSelecionada = document.getElementById("dataConclusao").value;

    if (statusSelecionado === "Concluído" && !dataSelecionada) {
        alert("Informe a data de conclusão do atendimento.");
        return;
    }

    btnRelatorio.disabled = true;
    btnRelatorio.textContent = "Gerando relatório...";

    resultadoRelatorio.textContent = "Coletando informações...";

    try {
        const resposta = await fetch("/api/relatorio");

        if (!resposta.ok) {
            throw new Error("Falha ao gerar relatório.");
        }

        const dados = await resposta.json();

        const painel = document.createElement("div");
        painel.className = "painel-diagnostico";

        const titulo = document.createElement("h3");
        titulo.textContent = "Relatório Técnico do Computador";
        painel.appendChild(titulo);



const dataRelatorio = document.createElement("p");

const agora = new Date();

dataRelatorio.textContent =
    "Data e horário: " + agora.toLocaleString("pt-BR");

dataRelatorio.className = "data-relatorio";

painel.appendChild(dataRelatorio);



const agoraProtocolo = new Date();

const dataProtocolo =
    agoraProtocolo.getFullYear().toString() +
    String(agoraProtocolo.getMonth() + 1).padStart(2, "0") +
    String(agoraProtocolo.getDate()).padStart(2, "0");

const identificadorProtocolo = crypto.randomUUID()
    .slice(0, 8)
    .toUpperCase();

const numeroProtocolo =
    "TD-" + dataProtocolo + "-" + identificadorProtocolo;

const protocoloRelatorio = document.createElement("p");

protocoloRelatorio.className = "protocolo-relatorio";

protocoloRelatorio.textContent =
    "Protocolo do atendimento: " + numeroProtocolo;

painel.appendChild(protocoloRelatorio);




const nomeTecnico = document.getElementById("nomeTecnico").value.trim();

const tecnicoRelatorio = document.createElement("p");
tecnicoRelatorio.className = "tecnico-relatorio";

tecnicoRelatorio.textContent =
    "Técnico responsável: " + (nomeTecnico || "Não informado");



const nomeCliente = document
    .getElementById("nomeCliente")
    .value.trim();

const clienteRelatorio = document.createElement("p");

clienteRelatorio.className = "cliente-relatorio";

clienteRelatorio.textContent =
    "Nome do cliente: " + (nomeCliente || "Não informado");

painel.appendChild(clienteRelatorio);


painel.appendChild(tecnicoRelatorio);


const problemaRelatado = document
    .getElementById("problemaRelatado")
    .value.trim();

const problemaRelatorio = document.createElement("p");

problemaRelatorio.className = "problema-relatorio";

problemaRelatorio.textContent =
    "Problema relatado: " +
    (problemaRelatado || "Não informado");

painel.appendChild(problemaRelatorio);



const solucaoAplicada = document
    .getElementById("solucaoAplicada")
    .value.trim();

const solucaoRelatorio = document.createElement("p");

solucaoRelatorio.className = "solucao-relatorio";

solucaoRelatorio.textContent =
    "Solução aplicada: " +
    (solucaoAplicada || "Não informada");

painel.appendChild(solucaoRelatorio);



const statusAtendimento = document
    .getElementById("statusAtendimento")
    .value;

const statusRelatorio = document.createElement("p");

statusRelatorio.className = "status-relatorio";


if (statusAtendimento === "Pendente") {
    statusRelatorio.classList.add("status-pendente");
} else if (statusAtendimento === "Em andamento") {
    statusRelatorio.classList.add("status-andamento");
} else if (statusAtendimento === "Concluído") {
    statusRelatorio.classList.add("status-concluido");
}


statusRelatorio.textContent =
    "Status do atendimento: " + statusAtendimento;

painel.appendChild(statusRelatorio);



const observacoesTecnicas = document
    .getElementById("observacoesTecnicas")
    .value.trim();

const observacoesRelatorio = document.createElement("p");

observacoesRelatorio.className = "observacoes-relatorio";

observacoesRelatorio.textContent =
    "Observações técnicas: " +
    (observacoesTecnicas || "Nenhuma observação registrada");


    painel.appendChild(observacoesRelatorio);


const dataConclusao = document
    .getElementById("dataConclusao")
    .value;




const conclusaoRelatorio = document.createElement("p");

conclusaoRelatorio.className = "conclusao-relatorio";

let dataFormatada = "Não informada";

if (dataConclusao) {
    const [ano, mes, dia] = dataConclusao.split("-");
    dataFormatada = `${dia}/${mes}/${ano}`;
}

conclusaoRelatorio.textContent =
    "Data de conclusão: " + dataFormatada;


if (statusAtendimento === "Concluído") {
    painel.appendChild(conclusaoRelatorio);
}





        const informacoes = [
            ["Nome do computador", dados.nome_computador],
            ["Sistema operacional", dados.sistema_operacional],
            ["Versão do sistema", dados.versao],
            ["Arquitetura", dados.arquitetura],
            ["Uso da CPU", dados.processador.uso_percentual + "%"],
            ["Núcleos físicos", dados.processador.nucleos_fisicos],
            ["Processadores lógicos", dados.processador.processadores_logicos],
            ["Memória RAM total", dados.memoria_ram.total_gb + " GB"],
            ["Memória disponível", dados.memoria_ram.disponivel_gb + " GB"],
            ["Uso da memória", dados.memoria_ram.uso_percentual + "%"],
            ["Armazenamento total", dados.armazenamento.total_gb + " GB"],
            ["Espaço disponível", dados.armazenamento.disponivel_gb + " GB"],
            ["Uso do disco", dados.armazenamento.uso_percentual + "%"]
        ];

        informacoes.forEach(function ([nome, valor]) {
            const linha = document.createElement("div");
            linha.className = "informacao";

            const rotulo = document.createElement("strong");
            rotulo.textContent = nome + ":";

            const conteudo = document.createElement("span");
            conteudo.textContent = valor;

            linha.append(rotulo, conteudo);
            painel.appendChild(linha);
        });

        
        resultadoRelatorio.replaceChildren(painel);

        document.getElementById("btnSalvarPDF").style.display = "block";



    } catch (erro) {
        resultadoRelatorio.textContent =
            "Não foi possível gerar o relatório técnico.";

        console.error(erro);

    } finally {
        btnRelatorio.disabled = false;
        btnRelatorio.textContent = "Gerar Relatório Técnico";
    }
});



const btnSalvarPDF = document.getElementById("btnSalvarPDF");

btnSalvarPDF.addEventListener("click", function () {
    window.print();
});





