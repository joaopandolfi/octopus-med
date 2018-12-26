package models

type SQLModels struct {
	SavePatient       string
	SaveHospital      string
	SaveInterventions string
	SaveUser          string
	SaveRest          string
	ListUtiByHospital string
	// == GET
	ListHospitals         string
	ListPatientByHospital string
	GetPatientByRest      string
	// == Del
	DelPatient  string
	DelHospital string
	// == Updata
	UpdateInterventions string
}

var SQL = SQLModels{
	//Insert
	SaveHospital:      "INSERT INTO hospital (name) VALUES (?);",
	SaveInterventions: "INSERT INTO intervencoes (idpaciente, idleito, dado, dtAlteracao) VALUES (?,?,?, NOW());",
	SavePatient:       "INSERT INTO paciente (name, cod, dtEntrance) VALUES (?,?,NOW());",
	SaveUser:          "INSERT INTO usuario (name, username, password) VALUES (?,?,?);",
	SaveRest:          "INSERT INTO leito () VALUES ()",
	// == Del
	DelPatient:  "",
	DelHospital: "",
	// == Search
	ListUtiByHospital:     "",
	ListPatientByHospital: "",
	ListHospitals:         "",
	GetPatientByRest:      "",
	// == Update
	UpdateInterventions: "",
}
