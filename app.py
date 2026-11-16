
import os
import psutil
import socket
import time
import platform
from flask import Flask, render_template, jsonify

app = Flask(__name__)



MODO_DEMO = os.environ.get("MODO_DEMO", "false").lower() == "true"



@app.before_request
def proteger_diagnosticos():
    from flask import request

    if MODO_DEMO and request.path.startswith("/api/"):
        if request.path == "/api/relatorio":
            return None

        return jsonify({
            "modo_demo": True,
            "mensagem": "Diagnóstico real disponível apenas na versão local."
        }), 403




@app.route("/")
def inicio():
    return render_template("index.html")

@app.route("/api/sistema")
def diagnosticar_sistema():
    informacoes = {
        "sistema": platform.system(),
        "versao": platform.release(),
        "arquitetura": platform.machine(),
        "processador": platform.processor()
    }

    return jsonify(informacoes)


@app.route("/api/rede")
def diagnosticar_rede():
    servidor = "1.1.1.1"
    porta = 443

    inicio = time.perf_counter()

    try:
        with socket.create_connection(
            (servidor, porta), timeout=5
        ):
            tempo = (time.perf_counter() - inicio) * 1000

            resultado = {
                "status": "Conectado",
                "servidor": servidor,
                "porta": porta,
                "tempo_ms": round(tempo, 2)
            }

    except OSError:
        resultado = {
            "status": "Falha na conexão",
            "servidor": servidor,
            "porta": porta,
            "tempo_ms": None
        }

    return jsonify(resultado)



@app.route("/api/dns")
def diagnosticar_dns():
    dominio = "www.google.com"

    try:
        inicio = time.perf_counter()

        endereco_ip = socket.gethostbyname(dominio)

        tempo = (time.perf_counter() - inicio) * 1000

        resultado = {
            "status": "DNS funcionando",
            "dominio": dominio,
            "endereco_ip": endereco_ip,
            "tempo_ms": round(tempo, 2)
        }

    except socket.gaierror:
        resultado = {
            "status": "Falha na resolução DNS",
            "dominio": dominio,
            "endereco_ip": None,
            "tempo_ms": None
        }

    return jsonify(resultado)



@app.route("/api/memoria")
def diagnosticar_memoria():
    memoria = psutil.virtual_memory()

    resultado = {
        "total_gb": round(memoria.total / (1024 ** 3), 2),
        "utilizada_gb": round(memoria.used / (1024 ** 3), 2),
        "disponivel_gb": round(memoria.available / (1024 ** 3), 2),
        "porcentagem_uso": memoria.percent
    }

    return jsonify(resultado)



@app.route("/api/cpu")
def diagnosticar_cpu():
    uso_cpu = psutil.cpu_percent(interval=1)

    resultado = {
        "uso_percentual": uso_cpu,
        "nucleos_fisicos": psutil.cpu_count(logical=False),
        "processadores_logicos": psutil.cpu_count(logical=True)
    }

    return jsonify(resultado)




@app.route("/api/disco")
def diagnosticar_disco():
    disco = psutil.disk_usage("C:\\")

    resultado = {
        "total_gb": round(disco.total / (1024 ** 3), 2),
        "utilizado_gb": round(disco.used / (1024 ** 3), 2),
        "disponivel_gb": round(disco.free / (1024 ** 3), 2),
        "porcentagem_uso": disco.percent
    }

    return jsonify(resultado)


@app.route("/api/processos")
def diagnosticar_processos():
    processos = []

    for processo in psutil.process_iter(
        ["pid", "name", "memory_info"]
    ):
        try:
            info = processo.info

            memoria = info["memory_info"]
            if memoria is None:
                continue

            processos.append({
                "pid": info["pid"],
                "nome": info["name"],
                "memoria_mb": round(
                    memoria.rss / (1024 ** 2), 2
                )
            })

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    processos.sort(
        key=lambda item: item["memoria_mb"],
        reverse=True
    )

    return jsonify(processos[:5])




@app.route("/api/servicos")
def diagnosticar_servicos():
    nomes_servicos = {
        "Spooler": "Impressão",
        "wuauserv": "Windows Update",
        "WinDefend": "Microsoft Defender",
        "Dhcp": "Cliente DHCP",
        "Dnscache": "Cliente DNS"
    }

    resultados = []

    for nome, descricao in nomes_servicos.items():
        try:
            servico = psutil.win_service_get(nome)
            info = servico.as_dict()

            resultados.append({
                "nome": descricao,
                "servico": nome,
                "status": info["status"]
            })

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            resultados.append({
                "nome": descricao,
                "servico": nome,
                "status": "Indisponível"
            })

    return jsonify(resultados)



@app.route("/api/uptime")
def diagnosticar_uptime():
    tempo_inicializacao = psutil.boot_time()
    segundos_ativos = int(time.time() - tempo_inicializacao)

    dias = segundos_ativos // 86400
    horas = (segundos_ativos % 86400) // 3600
    minutos = (segundos_ativos % 3600) // 60

    resultado = {
        "dias": dias,
        "horas": horas,
        "minutos": minutos,
        "tempo_formatado": f"{dias} dias, {horas} horas e {minutos} minutos"
    }

    return jsonify(resultado)



@app.route("/api/rede-local")
def diagnosticar_rede_local():
    nome_computador = socket.gethostname()
    interfaces = []

    for nome, enderecos in psutil.net_if_addrs().items():
        for endereco in enderecos:
            if endereco.family == socket.AF_INET:
                interfaces.append({
                    "interface": nome,
                    "endereco_ip": endereco.address,
                    "mascara": endereco.netmask
                })

    resultado = {
        "nome_computador": nome_computador,
        "interfaces": interfaces
    }

    return jsonify(resultado)


@app.route("/api/relatorio")
def gerar_relatorio():
    
    
    if MODO_DEMO:
        return jsonify({
            "sistema_operacional": "Windows 11 (simulação)",
            "versao": "Demonstração",
            "arquitetura": "64 bits",
            "nome_computador": "PC-DEMO",
            "processador": {
                "uso_percentual": 25,
                "nucleos_fisicos": 4,
                "processadores_logicos": 8
            },
            "memoria_ram": {
                "total_gb": 16,
                "disponivel_gb": 10,
                "uso_percentual": 37.5
            },
            "armazenamento": {
                "total_gb": 512,
                "disponivel_gb": 320,
                "uso_percentual": 37.5
            }
        })

    
    memoria = psutil.virtual_memory()
    disco = psutil.disk_usage("C:\\")
    cpu = psutil.cpu_percent(interval=1)

    relatorio = {
        "sistema_operacional": platform.system(),
        "versao": platform.release(),
        "arquitetura": platform.machine(),
        "nome_computador": socket.gethostname(),

        "processador": {
            "uso_percentual": cpu,
            "nucleos_fisicos": psutil.cpu_count(logical=False),
            "processadores_logicos": psutil.cpu_count(logical=True)
        },

        "memoria_ram": {
            "total_gb": round(memoria.total / (1024 ** 3), 2),
            "disponivel_gb": round(memoria.available / (1024 ** 3), 2),
            "uso_percentual": memoria.percent
        },

        "armazenamento": {
            "total_gb": round(disco.total / (1024 ** 3), 2),
            "disponivel_gb": round(disco.free / (1024 ** 3), 2),
            "uso_percentual": disco.percent
        }
    }

    return jsonify(relatorio)



if __name__ == "__main__":
    app.run(debug=True)

