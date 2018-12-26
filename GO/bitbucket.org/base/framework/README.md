# Inicialização

## 1. A estrutura de projeto dentro do GOPATH

1. Criar a pasta, turbi.com.br, no src do GOPATH
2. Baixe o repositorio a ser usado dentro da pasta criada, ex.: GOPATH/src/turbi.com.br/meuservico
3. Faça o `Passo 2`
4. No terminal, execute o comando `go get` no mesmo nível do GOPATH/src/turbi.com.br/meuservico


> O resultado final da estrutura:

> GOPATH/src/turbi.com.br/meuservico

> GOPATH/src/bitbucket.oorg/framework


## 2. Criar um arquivo 'main.go' na raiz

```go
package main
import (
	"bitbucket.org/base/framework
	"bitbucket.org/base/framework/logs"
	"bitbucket.org/base/framework/repositories/mysql"
)
func main() {
	framework.Load() // Load all configurations
	mysql.Init() // Initialize mysql
	// routes.Register() // Register all routes, this file must be inside project
	framework.Main()  // Start framework and appengine
}
```

## 3. Criar um arquivo app.yaml na raiz

> Troque a chave {service_name} com o nome do serviço

```yaml
service: {service_name}
runtime: go
env: flex
api_version: go1

handlers:
- url: /{service_name}/.*
  script: {service_name}

manual_scaling:
  instances: 1

env_variables:
  PAYU_APILOGIN: ''
  PAYU_APIKEY: ''
  PAYU_MERCHAND_ID: ''
  PAYU_ACCOUNT_ID: ''
  PAYU_URL: ''
  PAYU_REPORT_URL: ''
  PAYU_TEST: ''
#Firebase
  FIREBASE_URL: ''
  FIREBASE_CREDENTIALS_FILE: ''
# MySQL 
  SQL_DSN: ''

beta_settings:
  cloud_sql_instances: turbi-dev:us-central1:sqltdev
```

## 4. Criar o arquivo de registro de rotas

1. Dentro da pasta raiz do seu projeto, criar uma pasta routes
2. Dentro da pasta routes, criar um arquivo de routes.go
3. Registrar as rotas, exemplo abaixo:

```golang
package routes

import (
	"bitbucket.org/base/framework/routers"
)

// Register routes in service
func Register() {
	routers.AddRoutes(routers.Routes{
		routers.Route{
			Path:    "/{service_name}/{resource}",
			Handler: controllers.MyController{}.Post,
			Methods: []string{"POST"},
		},
	})

	routers.Map()
}
```

## 5. Exemplo de um componente controller

```go
func Post(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {

	var body MyBody

	request.Content(&body) // It collect body to a model object

	var parameter = request.Parameters("id") // It read id from resource path

	err = errors.New("An error to throw") // It's a way to throw internal server error

	panic(err) // It's another way to throw a internal server error, but it end the request immediately

	response.Success(&SuccesObjectStruct{ // It's an example how to return success with response body
			Name: "My Name is Success",
			Description: "Yeah, it's success",
	})

	response.BadRequest(&BadRequestStruct{ // It's an example how to make a bad request as response
			Age: "No one has more than 130 years old",
	})

	return
}
```

# Modelos

## Exemplo

```go

	type InputModel struct {
		Name string `json:"nome" validate:"required,min=4,max=10"`
	}

```

## Documentação e mais exemplos de Validações

> https://godoc.org/gopkg.in/go-playground/validator.v9