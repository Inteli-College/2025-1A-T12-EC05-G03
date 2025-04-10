---
sidebar_position: 5
custom_edit_url: null
---

# Como inicializo o projeto?

&emsp;Neste documento iremos demonstrar como você pode inicializar o projeto NDC, esta etapa envolve o setup das seguintes partes do projeto:

- Front-end (Plataforma NDC)
- Back-end (Em flask)
- Firmware do Robô (feita para rodar localmente a partir de um raspberry pi)

## Back-end e Front-end

&emsp;Vamos aprender a inicializar a interface do usuário e meio de comunicação com o robô, o primeiro passo, claro, é clonar este repositório.

Vamos lá:
```bash
git clone https://github.com/Inteli-College/2025-1A-T12-EC05-G03
```

#### Após clonar é possível ver que os arquivos do repositório agora estão na sua pasta atual!

Agora que temos os arquivos necessários para iniciar vamos entrar nesta pasta e iniciar nossa venv.

```bash
cd 2025-1A-T12-EC05-G03/src
```

``` bash
python -m venv venv
source venv/bin/activate
```

#### Aqui vamos instalar todos os requerimentos da parte do back-end e front-end.

``` bash
pip install -r "requirements.txt"
```

### Agora é só iniciar o nosso back-end e front!

``` bash
python -m api.main
```

E pronto, agora temos a aplicação web rodando corretamente, vamos para a segunda parte destas etapas, agora no raspberry pi.

### Agora no Raspberry PI:

novamente vamos clonar o repositório, abrir um "venv" e instalar as dependências necessárias.

``` bash
cd 2025-1A-T12-EC05-G03/src/firmware
```

Vamos iniciar a venv e ativá-la:

``` bash
python -m venv venv
source venv/bin/activate
```
instalar as dependencias:
``` bash
pip install -r "requirements.txt"
```

### E finalmente iniciar o firmware no raspberry

``` bash
cd firmware/NDCbot
python main.py
```

## Conclusão

&emsp;Seguindo os passos acima, você terá todo o ambiente do projeto NDC funcionando: desde a interface web até a execução do firmware no Raspberry Pi. Essa estrutura integrada permite uma comunicação fluida entre o sistema e o robô, essencial para o desenvolvimento e testes da plataforma. Em caso de dúvidas, verifique se todos os passos foram seguidos corretamente e se as dependências estão instaladas nas versões indicadas.