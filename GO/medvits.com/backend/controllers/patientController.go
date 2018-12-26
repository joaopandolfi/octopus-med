package controllers

import (
	"bitbucket.org/base/framework/handlers"
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/business"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type PatientController struct{}

func (cc PatientController) ListByHospital(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	idHospital := request.Parameters("idHospital")

	pBusiness := newPatientBusiness(logger)

	response.Success(pBusiness.ListByHospital(idHospital))

	return
}

func (cc PatientController) New(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var patient models.Patient

	request.Content(&patient)

	pBusiness := newPatientBusiness(logger)

	response.Success(pBusiness.New(patient))

	return
}

func (cc PatientController) Del(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var PatientBusiness business.PatientBusiness

	idPatient := request.Parameters("patientID")

	response.Success(PatientBusiness.Del(idPatient))

	return
}

func (cc PatientController) GetById(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	idPatient := request.Parameters("patientID")

	pBusiness := newPatientBusiness(logger)

	response.Success(pBusiness.GetById(idPatient))

	return
}

func (cc PatientController) GetByRestId(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	idRest := request.Parameters("idRest")

	pBusiness := newPatientBusiness(logger)

	response.Success(pBusiness.GetByRestId(idRest))

	return
}

// ---- PRIVATE ----
func newPatientBusiness(logger logs.Log) (PatientBusiness business.PatientBusiness) {
	PatientBusiness = business.Patient{
		Logger: logger,
		UtiDAO: dao.UTI{
			Logger: logger,
		},
		PatientDAO: dao.Patient{
			Logger: logger,
		},
		HospitalDAO: dao.Hospital{
			Logger: logger,
		},
	}
	return
}
