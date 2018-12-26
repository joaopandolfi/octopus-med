package business

import (
	"bitbucket.org/base/framework/logs"
	"medvits.com/backend/dao"
	"medvits.com/backend/models"
)

type HospitalBusiness interface {
	// == GET
	ListAll() (hospitals []models.Hospital)
	ListAllComplete() (allData map[string]interface{})
	ListUtis(idHospital string) (utis []models.UTI)
	ListRests(idHospital string) (rests []models.Rest)
	ListRestsByHospitalAndUti(idHospital string, idUti string) (rests []models.Rest)
	// == Insert
	NewHospital(hosp models.Hospital) error
	NewUti(uti models.UTI) error
	NewRest(rest models.Rest) error
	// == Update
	UpdateRest(rest models.Rest) error
	UpdateUti(uti models.UTI) error
	UpdateHospital(hosp models.Hospital) error
	// == Delete
	DeleteRest(rest models.Rest) error
	DeleteUti(uti models.UTI) error
	DeleteHospital(hosp models.Hospital) error
}

type Hospital struct {
	Logger      logs.Log
	UtiDAO      dao.UtiDAO
	PatientDAO  dao.PatientDAO
	HospitalDAO dao.HospitalDAO
	RestDao     dao.RestDAO
}

func (cc Hospital) ListAll() (hospitals []models.Hospital) {
	return cc.HospitalDAO.List()
}

func (cc Hospital) ListAllComplete() (allData map[string]interface{}) {
	return
}

func (cc Hospital) ListUtis(idHospital string) (utis []models.UTI) {
	return cc.UtiDAO.ListByHospital(idHospital)
}

func (cc Hospital) ListRests(idHospital string) (rests []models.Rest) {
	return cc.RestDao.ListByHospital(idHospital)
}

func (cc Hospital) ListRestsByHospitalAndUti(idHospital string, idUti string) (rests []models.Rest) {
	return cc.RestDao.ListByHospitalAndUti(idHospital, idUti)
}

// -- New

func (cc Hospital) NewHospital(hosp models.Hospital) error {
	return cc.HospitalDAO.Save(hosp)
}

func (cc Hospital) NewRest(rest models.Rest) error {
	return cc.RestDao.Save(rest)
}

func (cc Hospital) NewUti(uti models.UTI) error {
	return cc.UtiDAO.Save(uti)
}

// -- Update

func (cc Hospital) UpdateRest(rest models.Rest) error {
	return cc.RestDao.Update(rest)
}

func (cc Hospital) UpdateUti(uti models.UTI) error {
	return cc.UtiDAO.Update(uti)
}

func (cc Hospital) UpdateHospital(hosp models.Hospital) error {
	return cc.HospitalDAO.Update(hosp)
}

// -- Delete

func (cc Hospital) DeleteRest(rest models.Rest) error {
	return cc.RestDao.Del(rest)
}

func (cc Hospital) DeleteUti(uti models.UTI) error {
	return cc.UtiDAO.Del(uti)
}

func (cc Hospital) DeleteHospital(hosp models.Hospital) error {
	return cc.HospitalDAO.Del(hosp)
}
