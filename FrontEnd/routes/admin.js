const router = require('express').Router();

// TODO: Colocar sistema de checagem do nível de permissao
router.get('/admin', (req, res) => {
    res.render('back-office.html')
})


module.exports = router