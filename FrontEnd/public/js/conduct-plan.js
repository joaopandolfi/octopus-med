var _conduct = {}
var _aux = {
    diag: document.getElementById("tb-diagnose").innerHTML, 
    disp:document.getElementById("tb-dispositive").innerHTML,
    cult:document.getElementById("tb-culture").innerHTML,
    micr:document.getElementById("tb-microbials").innerHTML
}


// ------ CONDUCT PLAN -------

function initInterv(){
    _conduct = {diagnose:[], dispositive:[], culture: [], micr:[], exam:[], others:[], all:[], today:[], conduct:[], impression:"", lock:false}
    document.getElementById("tb-diagnose").innerHTML = _aux.diag
    document.getElementById("tb-dispositive").innerHTML = _aux.disp
    document.getElementById("tb-culture").innerHTML = _aux.cult
    document.getElementById("tb-microbials").innerHTML = _aux.micr
    document.getElementById("btn-patient-add").disabled = false
}

// --- Impression

function saveImpression(){
    elem = document.getElementById("ipt-impression")
    _conduct.impression = elem.value

    c = {impression:elem.value, done:true}
    particularity = {impression:elem.value}
    extra = { name: elem.value, patientId: _patientId , particularity: [], type: "impression"}
    newIntervention(_idUti,_idLeito,extra,(d)=>{})
}

// --- Exams

function saveExam(){
    elem = document.getElementById("ipt-exam-name")
    elem.disabled = true

    c = {name:elem.value, done:false}
    _conduct.exam.push(c)
    _conduct.today.push(c)
    extra = { name: elem.value, patientId: _patientId , particularity: [], type: "exames"}
    
    newIntervention(_idUti,_idLeito,extra,(d)=>{
        elem.disabled = false
        tb = document.getElementById("tb-exam")
        tb.innerHTML+=  `<li>${elem.value}</li>`
    })
}


function getExam(lock=false){
    tb = document.getElementById("tb-exam")
    
    if(_conduct.exam.length != 0){    
        auxHtml = ""
        _conduct.exam.map((d)=>{
            auxHtml+=  `<li>${d.name}</li>`
        })
        tb.innerHTML = auxHtml
    }else if(lock){
        console.log("Locked")
        return
    }
    else{
        getAndParseInterventions(()=>{
            getExam(lock=true)
        })
    }
}


// --- Today
function getToday(){
    //eFinished = document.getElementById("tb-today-finished")
    eOpen = document.getElementById("tb-today-open")

    //auxF = ""
    auxO = ""
    _conduct.conduct.map((r)=>{
        auxO +=`<li class="rw btwn act"><input type="checkbox"><h5>${r.name}</h5><button><i class="fas fa-comments"></i></button></li>`
    })

    //eFinished.innerHTML = auxF
    eOpen.innerHTML = auxO
}

function getConducts(div){

}

function saveConduct(){
    name = document.getElementById("ipt-conduct-name").value
    contin = document.getElementById("ckb-conduct-continue").checked
    interv = document.getElementById("ipt-conduct-interval").value
    fisio = document.getElementById("ckb-conduct-fisio").checked
    enf = document.getElementById("ckb-conduct-enf").checked
    doctor = document.getElementById("ipt-conduct-doctor").value
    
    d = new Date()
    date = d.toLocaleDateString()
    hour = d.toLocaleTimeString()

    particularity= {continue: contin, interval: interv, date:date, hour: hour, doctor: doctor, profs:{fisio:fisio, enferm:enf}}
    c = {name: name, done:false, particularity:[particularity]}
    _conduct.conduct.push(c)
    _conduct.today.push(c)
    extra = { name: name, patientId: _patientId , particularity: [particularity], type: "conduct-plan"}
    
    newIntervention(_idUti,_idLeito,extra,(d)=>{
       // document.getElementById("tb-today-open").innerHTML += `<li class="rw btwn act"><input type="checkbox"><h5>${name}</h5><button><i class="fas fa-comments"></i></button></li>`
    })
}


// -- Pendent Conducts -- 
function getPendents(){
    if(_conduct.lock) return
    _conduct.lock = true

    eFinished = document.getElementById("tb-routine-finished")
    eOpen = document.getElementById("tb-routine-open")

    auxF = ""
    auxO = ""
    _conduct.all.map((r)=>{
        if(r.done != "false") auxF +=`<li class="rw btwn act"><input type="checkbox"><h5>${r.name}</h5><button><i class="fas fa-comments"></i></button></li>`
        else auxO +=`<li class="rw btwn act"><input type="checkbox"><h5>${r.name}</h5><button><i class="fas fa-comments"></i></button></li>`
    })

    eFinished.innerHTML = auxF
    eOpen.innerHTML = auxO
}


// -- Anti microbials --

function saveAntimicrobials(){
    name = document.getElementById("ipt-micr-name").value
    date = document.getElementById("ipt-micr-date")
    days = document.getElementById("ipt-micr-days")
    date.disabled = days.disabled = true

    particularity= {date: date.value, days: days.value}
    c = {name: name, done:false, particularity:[particularity]}
    _conduct.micr.push(c)
    _conduct.today.push(c)
    extra = { name: name, patientId: _patientId , particularity: [particularity], type: "microbials"}
    
    newIntervention(_idUti,_idLeito,extra,(d)=>{
        date.disabled = days.disabled = true
        tb = document.getElementById("tb-microbials")
        tb.innerHTML+=  `<li><div><label> ${days.value} dia(s) </label><p>${name}</p></div><div class="rw btwn"><span>Inclusão em ${date.value}</span><div><button><i class="fas fa-times"></i></button><button><i class="fas fa-edit"></i></button></div></div></li>`
    })
    
}

function getAntimicrobials(){
    tb = document.getElementById("tb-microbials")
    
    if(_conduct.micr.length != 0){    
        auxHtml = ""
        _conduct.micr.map((d)=>{
            auxHtml+=  `<li><div><label> ${d.particularity[0].days} dia(s)</label><p>${d.name}</p></div><div class="rw btwn"><span>Inclusão em ${d.particularity[0].date}</span><div><button><i class="fas fa-times"></i></button><button><i class="fas fa-edit"></i></button></div></div></li>`
        })
        tb.innerHTML = auxHtml
    }else if(lock){
        console.log("Locked")
        return
    }
    else{
        getAndParseInterventions(()=>{
            getAntimicrobials(lock=true)
        })
    }
}

// --- Cultura ---

function saveCulture(){
    name = document.getElementById("ipt-cult-name").value
    date = document.getElementById("ipt-cult-date")
    meio = document.getElementById("ipt-cult-meio")
    germe = document.getElementById("ipt-cult-germe")
    date.disabled = meio.disabled = germe.disabled = true


    particularity= {date: date.value, meio: meio.value, germe: germe.value}
    c = {name: name, done:false, particularity:[particularity]}
    _conduct.culture.push(c)
    _conduct.today.push(c)
    extra = { name: name, patientId: _patientId , particularity: [particularity], type: "culture"}
    
    newIntervention(_idUti,_idLeito,extra,(d)=>{
        date.disabled = meio.disabled = germe.disabled = false
        tb = document.getElementById("tb-culture")
        tb.innerHTML+=  `<li class="rw"><textarea readonly>${name} \nMeio: ${meio.value} \nGerme: ${germe.value} \nData: ${date.value}</textarea><button class="edit-btn">Editar</button></li>`
    })
    
}

// Busca Culturas salvas
function getCulture(lock=false){
    tb = document.getElementById("tb-culture")
    
    if(_conduct.culture.length != 0){    
        auxHtml = ""
        _conduct.culture.map((d)=>{
            auxHtml+=  `<li class="rw"><textarea readonly>${d.name} \nMeio: ${d.particularity[0].meio} \nGerme: ${d.particularity[0].germe} \nData: ${d.particularity[0].date}</textarea><button class="edit-btn">Editar</button></li>`
        })
        tb.innerHTML = auxHtml
    }else if(lock){
        console.log("Locked")
        return
    }
    else{
        getAndParseInterventions(()=>{
            getCulture(lock=true)
        })
    }
}

// --- DISP ---

function saveDisp(){
    name = document.getElementById("ipt-disp-name").value
    local = document.getElementById("ipt-disp-local")
    date = document.getElementById("ipt-disp-date")
    local.disabled = name.disabled = true

    particularity = {local: local.value, date: date.value}
    c = {name: name, done:false, particularity:[particularity]}
    _conduct.dispositive.push(c)
    _conduct.today.push(c)
    extra = { name: name, patientId: _patientId , particularity: [particularity], type: "dispositive"}
    
    newIntervention(_idUti,_idLeito,extra,(d)=>{
        local.disabled = name.disabled = false
        tb = document.getElementById("tb-dispositive")
        tb.innerHTML+=  `<li><div><label>${name}</label><p>${local.value}</p></div><div class="rw btwn"><span>Inclusão em ${date.value}</span><button><i class="fas fa-edit"></i></button></div></li>`
    })    
}

// Busca Dispositivos salvos
function getDispositive(lock=false){
    tb = document.getElementById("tb-dispositive")
    
    if(_conduct.dispositive.length != 0){    
        auxHtml = ""
        _conduct.dispositive.map((d)=>{
            auxHtml+=  `<li><div><label>${d.name}</label><p>${d.particularity[0].local}</p></div><div class="rw btwn"><span>Inclusão em ${d.particularity[0].date}</span><button><i class="fas fa-edit"></i></button></div></li>`
        })
        tb.innerHTML = auxHtml
    }else if(lock){
        console.log("Locked")
        return
    }
    else{
        getAndParseInterventions(()=>{
            getDispositive(lock=true)
        })
    }
}


// --- DIAGNOSE ---

// Salva diagnostico
function saveDiagnose(){
    elem = document.getElementById("ipt-dianostics")
    elem.disabled = true

    c = {name:elem.value, done:false}
    _conduct.diagnose.push(c)
    _conduct.today.push(c)
    extra = { name: elem.value, patientId: _patientId , particularity: [], type: "diagnose"}
    
    newIntervention(_idUti,_idLeito,extra,(d)=>{
        elem.disabled = false
        tb = document.getElementById("tb-diagnose")
        tb.innerHTML+=  `<tr><td>${elem.value}</td><td><button><i class="fas fa-times-circle"></i></button></td></tr>`
    })
}


// Busca diagnosticos salvos
function getDiagnose(lock=false){
    tb = document.getElementById("tb-diagnose")
    
    if(_conduct.diagnose.length != 0){    
        auxHtml = ""
        _conduct.diagnose.map((d)=>{
            auxHtml+=  `<tr><td>${d.name}</td><td><button><i class="fas fa-times-circle"></i></button></td></tr>`
        })
        tb.innerHTML = auxHtml
    }else if(lock){
        console.log("Locked")
        return
    }
    else{
        getAndParseInterventions(()=>{
            getDiagnose(lock=true)
        })
    }
}
