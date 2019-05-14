
module.exports = {
     getAsideData : (req) => {
        return { idHospital: req.session.hospital, idUti : req.session.uti }
    }
}