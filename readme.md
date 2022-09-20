# Atividade - Frontend

- crie um campo para entrada de CEP
    - ao digitar o últmo número do cep carregue as informações do CEP pela API ViaCEP (https://viacep.com.br/ws/{CEP}/json/)
    - ao carregar as informações do CEP selecione o estado referente ao CEP
    - ao carregar as cidades, selecione a cidade referente ao CEP

# Comandos úteis

```sh
npm init -y
npm i -D typescript ts-node
npm i express express-session 
npm i sqlite sqlite3
npx tsc --init
npm i -D @types/express
npx ts-node src/index.ts
```