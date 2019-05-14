# Backend Santa Data
Backend Santa Data

## Doc
Documentação do backend

### Config
Configurações do servidor

#### Instalação das dependências
Para instalação das dependências dos sistema
```
 npm install
```

#### Database
Para configurar os acessos aos bancos de dados, edite o arquivo de configuração
* /constants/databases.js

#### SSL
Para configurar os certificados *SSL* para o funcionamento correto do *https*
1. Acesse a pasta /constants/sslcert
2. Subistitua os arquivos

#### Iniciar o sistema
Para iniciar o sistema em modo serviço
1. Instale o módulo *pm2*
```
 npm install pm2
```
2. Inicialize
```
 pm2 start
``` 

### Rotas
