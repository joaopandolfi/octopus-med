# Backend
GOlang Medvits Backend 

## Executar
chmod +x backend
./backend


## ROTAS

#### Paciente
* Novo
```
/patient 
@POST
@data
{
    name,
    dtEntrance,
    rest, // ID LEITO
    hospital, // ID HOSPITAL
    uti, // ID DO HOSPITAL
}
```

* Buscar por ID
```
/patient/{patientID}
@GET
```

* Buscar Por Hospital
```
/hospital/{idHospital}/list/patient
@GET
```

* Buscar por Leito
```
/rest/{idRest}/list/patient
@GET
```

#### Hospital
* Novo
```
/hospital
@POST
@data
{
    name,
	modules,
	tel,
	country,
	city,
	district,
	logradouro,
	number,
	cep,
	cnpj,
	others,
    modules: ["string"],
}
```

* Listar todos
```
/hospital
@GET
```

* Deletar
```
/hospital/{idHospital}/del
@POST
```

* Atualizar
```
/hospital/{idHospital}/update
@POST
@data
{
    name,
	modules,
	tel,
	country,
	city,
	district,
	logradouro,
	number,
	cep,
	cnpj,
	others,
    modules: ["string"],
}
```


#### UTI
* Novo
```
/hospital/{idHospital}/new/uti
@POST
@data
{
    name,
    hospital, // ID HOSPITAL
    leitos: [
        {
            name,
            id, // ID Leito
        }
    ]

}
```

* Buscar por Hospital
```
/hospital/{idHospital}/list/uti
@GET
```

* Deletar
```
/hospital/{idHospital}/del/uti/{idUti}
@POST
```

* Atualizar
```
/hospital/{idHospital}/update/uti/{idUti}
@POST
@data
{
    name,
    hospital, // ID HOSPITAL
    leitos: [
        {
            name,
            id, // ID Leito
        }
    ]

}
```

#### LEITOS

* Novo
```
/hospital/{idHospital}/new/uti/{idUti}/rest
@POST
@data
{
	"name": "LEITO 1",
	"userId": "0",
	"status": "occuped",
	"patient": "0", // Id do paciente
	"number": "1"
}
```

* Update
```
/hospital/{idHospital}/update/rest/{restId}
@POST
@data
{
	"name": "LEITO 1",
	"userId": "0",
	"status": "occuped",
	"patient": "0", // Id do paciente
	"number": "1"
}
```

* Deletar
```
/hospital/{idHospital}/del/rest/{idRest}
@POST
```


* Buscar por Hospital
```
/hospital/{idHospital}/list/rest
@GET
```

* Buscar por Hospital e UTI
```
/hospital/{idHospital}/list/uti/{idUti}/rest
@GET
```

#### INTERVENTIONS
* New
```
/hospital/{idHospital}/new/intervention
@POST
@data
{
	"restId": "5ba457dc4cf8a6be65219ac1", // Id Leito
	"utiId": "5ba455f24cf8a6be65218bd4", // Id UTI
	"patientdId": "0", // ID do Paciente
	"name": "Intervenção TESTE", // Nome do Leito
	"datetime": "19/09/2018", // Data de criacao / update
	"done": "false", // Se terminou
	"current": "1", // Quantas feitas ate agora
	"total": "10", // Total a ser feita
	"archived": "false" // Arquivada
}
```

* Listar por Hospital e Leito 
```
@GET
/hospital/{idHospital}/list/rest/{idRest}/intervention
```


* Atualiza intervencao
```
/hospital/{idHospital}/update/intervention/{idIntervention}
@POST
@data
{
    "restId": "5ba457dc4cf8a6be65219ac1", // Id Leito
	"utiId": "5ba455f24cf8a6be65218bd4", // Id UTI
	"patientdId": "0", // ID do Paciente
	"name": "Intervenção TESTE", // Nome do Leito
	"CreateDateTime": "AAAAMMDDHHmmss", // Data de criacao / update
	"done": "false", // Se terminou
	"current": "1", // Quantas feitas ate agora
	"total": "10", // Total a ser feita
	"archived": "false", // Arquivada
	"particularity": [{object}] // Array de objetos (genéricos)
}
```

* Finaliza
```
/hospital/{idHospital}/done/intervention/{idIntervention}
@POST
@data
{
	nameUserDone,
	DoneDateTime,
}
```

#### DATALISTS
* Novo
```
/conducts
@POST
@data
{
    name,
    code,
	type
}
```

* Deletar
```
/conducts/{idCond}/del
@POST
```

* Listar por Tag
```
/conducts/{type}
@GET
```


* Atualizar
```
/conducts/{idCond}/update
@POST
@data
{
    name,
    code,
	type
}
```

#### USER
* Login
```
/login
@POST
@data
{
    username,
    password
}
```


## Bd Teste
https://mlab.com/databases/medvits-test1


# TODO
[] Adicionar rotinas
[] Adicionar Internação (Ligar paciente-leito-uti-intervencoes)