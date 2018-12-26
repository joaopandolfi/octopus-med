package controllers

import (
	"bitbucket.org/base/framework/handlers"
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/business"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type HospitalController struct{}

func (cc HospitalController) List(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	//request.Content(&msg)

	Hbusiness := newHospitalBusiness(logger)
	//logger.Debug("BODY: [%#v]", msg)

	response.Success(Hbusiness.ListAll())

	return
}

func (cc HospitalController) ListUtis(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	idHospital := request.Parameters("idHospital")
	Hbusiness := newHospitalBusiness(logger)

	response.Success(Hbusiness.ListUtis(idHospital))

	return
}

func (cc HospitalController) ListAllData(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	Hbusiness := newHospitalBusiness(logger)

	response.Success(Hbusiness.ListAllComplete())

	return
}

// ===== NEW

func (cc HospitalController) NewHospital(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var nHosp models.Hospital
	Hbusiness := newHospitalBusiness(logger)

	request.Content(&nHosp)

	response.Success(Hbusiness.NewHospital(nHosp))
	return
}

func (cc HospitalController) NewUti(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var nUti models.UTI
	idHospital := request.Parameters("idHospital")
	Hbusiness := newHospitalBusiness(logger)

	request.Content(&nUti)

	nUti.Hospital = idHospital

	err = Hbusiness.NewUti(nUti)
	response.Success(err == nil)
	return
}

func (cc HospitalController) NewRest(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var rest models.Rest
	idHospital := request.Parameters("idHospital")
	idUti := request.Parameters("idUti")
	Hbusiness := newHospitalBusiness(logger)

	request.Content(&rest)

	rest.Hospital = idHospital
	rest.UTI = idUti
	err = Hbusiness.NewRest(rest)
	response.Success(err == nil)
	return
}

// === LIST

func (cc HospitalController) ListHospital(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	Hbusiness := newHospitalBusiness(logger)

	response.Success(Hbusiness.ListAll())

	return
}

func (cc HospitalController) ListRestByHospital(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	idHospital := request.Parameters("idHospital")
	Hbusiness := newHospitalBusiness(logger)

	response.Success(Hbusiness.ListRests(idHospital))
	return
}

func (cc HospitalController) ListRestByHospitalAndUti(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	idHospital := request.Parameters("idHospital")
	idUti := request.Parameters("idUti")
	Hbusiness := newHospitalBusiness(logger)

	response.Success(Hbusiness.ListRestsByHospitalAndUti(idHospital, idUti))

	return
}

// -- UPDATES

func (cc HospitalController) UpdateRest(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var rest models.Rest
	idHospital := request.Parameters("idHospital")
	idRest := request.Parameters("idRest")
	Hbusiness := newHospitalBusiness(logger)

	request.Content(&rest)

	rest.Hospital = idHospital
	rest.Uid = idRest
	err = Hbusiness.UpdateRest(rest)
	response.Success(err == nil)
	return
}

func (cc HospitalController) UpdateHospital(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var hosp models.Hospital
	idHospital := request.Parameters("idHospital")
	Hbusiness := newHospitalBusiness(logger)

	request.Content(&hosp)

	hosp.Uid = idHospital
	err = Hbusiness.UpdateHospital(hosp)
	response.Success(err == nil)

	return
}

func (cc HospitalController) UpdateUti(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var uti models.UTI
	idHospital := request.Parameters("idHospital")
	idUti := request.Parameters("idRest")
	Hbusiness := newHospitalBusiness(logger)

	request.Content(&uti)

	uti.Hospital = idHospital
	uti.Uid = idUti
	err = Hbusiness.UpdateUti(uti)
	response.Success(err == nil)

	return
}

// -- DELETES

func (cc HospitalController) DeleteUti(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	uti := models.UTI{}
	idHospital := request.Parameters("idHospital")
	idUti := request.Parameters("idUti")
	Hbusiness := newHospitalBusiness(logger)

	uti.Hospital = idHospital
	uti.Uid = idUti
	err = Hbusiness.DeleteUti(uti)
	response.Success(err == nil)

	return
}

func (cc HospitalController) DeleteRest(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	rest := models.Rest{}
	idHospital := request.Parameters("idHospital")
	idRest := request.Parameters("idRest")
	Hbusiness := newHospitalBusiness(logger)

	rest.Hospital = idHospital
	rest.Uid = idRest
	err = Hbusiness.DeleteRest(rest)
	response.Success(err == nil)
	return
}

func (cc HospitalController) DeleteHospital(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	hosp := models.Hospital{}
	idHospital := request.Parameters("idHospital")
	Hbusiness := newHospitalBusiness(logger)

	hosp.Uid = idHospital
	err = Hbusiness.DeleteHospital(hosp)
	response.Success(err == nil)
	return
}

// -- LOCAL METHODS --

func newHospitalBusiness(logger logs.Log) business.HospitalBusiness {
	var HospitalBusiness business.HospitalBusiness

	HospitalBusiness = business.Hospital{
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
		RestDao: dao.REST{
			Logger: logger,
		},
	}
	return HospitalBusiness
}
