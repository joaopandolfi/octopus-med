package controllers

import (
	"bitbucket.org/base/framework/handlers"
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/business"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type StaticsController struct{}

func (cc StaticsController) ListConductByType(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {

	bCond := NewStaticsBusiness(logger)

	response.Success(bCond.ListByTypeConduct(request.Parameters("type")))
	return
}

func (cc StaticsController) DelConduct(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {

	bCond := NewStaticsBusiness(logger)

	err = bCond.DelConduct(models.Conductes{Uid: request.Parameters("idCond")})
	response.Success(err == nil)
	return
}

func (cc StaticsController) NewConduct(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var cond models.Conductes
	bCond := NewStaticsBusiness(logger)
	request.Content(&cond)

	err = bCond.NewConduct(cond)
	response.Success(err == nil)
	return
}

func (cc StaticsController) UpdateConductById(request handlers.Request, logger logs.Log) (response handlers.Response, err error) {
	var cond models.Conductes
	idCond := request.Parameters("idCond")
	bCond := NewStaticsBusiness(logger)
	request.Content(&cond)
	cond.Uid = idCond

	err = bCond.UpdateConduct(cond)
	response.Success(err == nil)
	return
}

// -- Local

func NewStaticsBusiness(logger logs.Log) business.StaticsBusiness {
	return business.Statics{
		Logger: logger,
		ConductesDAO: dao.Conductes{
			Logger: logger,
		},
	}
}
