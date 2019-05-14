package controllers

import (
	"bitbucket.org/base/framework/handlers"
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/business"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type InterventionController struct{}

func (cc InterventionController) ListByRest(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {

	idIntervention := request.Parameters("idRest")
	bIntervent := newIntervertionBusiness(logger)

	response.Success(bIntervent.ListByRestId(idIntervention))
	return
}

func (cc InterventionController) New(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var interv models.Interventions
	idHospital := request.Parameters("idHospital")
	bIntervent := newIntervertionBusiness(logger)
	request.Content(&interv)
	interv.HospitalId = idHospital

	err = bIntervent.New(interv)
	response.Success(err == nil)
	return
}

func (cc InterventionController) UpdateById(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var interv models.Interventions
	idHospital := request.Parameters("idHospital")
	idIntervention := request.Parameters("idIntervention")
	bIntervent := newIntervertionBusiness(logger)
	request.Content(&interv)
	interv.HospitalId = idHospital
	interv.Uid = idIntervention

	err = bIntervent.Update(interv)
	response.Success(err == nil)
	return
}

func (cc InterventionController) Done(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var interv models.ShortIntervention
	idIntervention := request.Parameters("idIntervention")
	bIntervent := newIntervertionBusiness(logger)

	request.Content(&interv)
	interv.Uid = idIntervention

	err = bIntervent.SetDone(interv)
	response.Success(err == nil)

	return
}

func (cc InterventionController) Archive(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	return
}

// -- Local

func newIntervertionBusiness(logger logs.Log) business.InterventionBusiness {
	return business.Intervention{
		Logger: logger,
		InterventionDAO: dao.Interventions{
			Logger: logger,
		},
	}
}
