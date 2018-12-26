package business

import (
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type StaticsBusiness interface {
	NewConduct(conduct models.Conductes) error
	UpdateConduct(conduct models.Conductes) error
	DelConduct(conduct models.Conductes) error
	ListByTypeConduct(cType string) []models.Conductes
}

type Statics struct {
	Logger       logs.Log
	ConductesDAO dao.ConductesDAO
}

func (cc Statics) NewConduct(conduct models.Conductes) error {
	return cc.ConductesDAO.Save(conduct)
}

func (cc Statics) UpdateConduct(conduct models.Conductes) error {
	return cc.ConductesDAO.Update(conduct)
}

func (cc Statics) DelConduct(conduct models.Conductes) error {
	return cc.ConductesDAO.Del(conduct)
}

func (cc Statics) ListByTypeConduct(cType string) []models.Conductes {
	return cc.ConductesDAO.ListByType(cType)
}
