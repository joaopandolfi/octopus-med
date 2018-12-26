package business

import (
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type PatientBusiness interface {
	ListByHospital(idHospital string) (patients []models.Patient)
	New(patient models.Patient) (err error)
	Del(idPatient string) (err error)
	GetById(idPatient string) models.Patient
	GetByRestId(idRest string) models.Patient
}

type Patient struct {
	Logger      logs.Log
	UtiDAO      dao.UtiDAO
	PatientDAO  dao.PatientDAO
	HospitalDAO dao.HospitalDAO
}

func (cc Patient) ListByHospital(idHospital string) (patients []models.Patient) {
	return cc.PatientDAO.ListByHospital(idHospital)
}

func (cc Patient) New(patient models.Patient) (err error) {
	_, err = cc.PatientDAO.Save(patient)
	return
}

func (cc Patient) Del(idPatient string) (err error) {
	return cc.PatientDAO.Del(models.Patient{Uid: idPatient})
}

func (cc Patient) GetById(idPatient string) models.Patient {
	return cc.PatientDAO.GetPatientById(idPatient)
}

func (cc Patient) GetByRestId(id string) models.Patient {
	return cc.PatientDAO.GetPatientByRest(id)
}
