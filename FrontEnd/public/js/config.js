var _conf = {}
var _aux = {
    diag: document.getElementById("tb-diagnose").innerHTML, 
    disp_name:document.getElementById("tb-disp-name").innerHTML,
    disp_local:document.getElementById("tb-disp-local").innerHTML,
    //cult_name:document.getElementById("tb-cult-name").innerHTML,
    cult_meio:document.getElementById("tb-cult-meio").innerHTML,
    cult_germe:document.getElementById("tb-cult-germe").innerHTML,
    micr_name:document.getElementById("tb-micr-name").innerHTML,
    pkg_safe_name:document.getElementById("tb-pkg-safe-name").innerHTML,
    exam_name:document.getElementById("tb-exam-name").innerHTML
}

function initConfig(){
    _conf =  {diagnose:[], disp_name:[], disp_local:[], cul_name: [], cult_meio:[], cult_germe:[], micr_name:[], pkg_safe_name:[], exam_name: []}
    genericList2("tb-diagnose","diag-name",'diagnose',_aux.diag)
    genericList("tb-disp-name", "device-name",'disp_name',_aux.disp_name)
    genericList("tb-disp-local", "device-local",'disp_local',_aux.disp_local)
    //genericList("tb-cult-name","cult-name",'cult_name',_aux.cult_name)
    genericList("tb-cult-meio","cult-meio",'cult_meio',_aux.cult_meio)
    genericList("tb-cult-germe","cult-germe",'cult_germe',_aux.cult_germe)
    genericList("tb-micr-name","micr-name",'micr_name',_aux.micr_name)
    genericList("tb-pkg-safe-name","pkg-safe-name",'pkg_safe_name',_aux.pkg_safe_name)
    genericList("tb-exam-name","exam-name",'exam_name',_aux.exam_name)
}

function newDiagnose(){
    name = document.getElementById("ipt-diag-name").value
    cod = document.getElementById("ipt-diag-cod").value

    genericSave2("tb-diagnose",'exam',"diag-name",cod,name)
}

function newDisp(){
    name = document.getElementById("ipt-disp-name").value
    genericSave("tb-disp-name",'disp_name',"device-name","0",name)
}

function newGen(ipt,elem,list,type){
    name = document.getElementById(ipt).value
    genericSave(elem,list,type,"",name)
}

function genericSave(elem,list,type,cod,name){
    newConduct(name,cod,type,()=>{
        tb = document.getElementById(elem)
        _conf[list].push({
            code: cod,
            name: name,
            type:type
        })
        
        tb.innerHTML += `<tr><td>${name}</td><td><a href="#"><i class="far fa-trash-alt red"></i></a></td></tr>` //`<tr><td>${cod}</td><td>${name}</td><td><a href="#"><i class="far fa-trash-alt red"></i></a></td></tr>`
    })
}

//genericList("tb-diagnose",_conf.exam,_aux.diag)

// -- Lists --
function genericList(elem,type,list,aux,lock=false){
    tb = document.getElementById(elem)
    if(_conf[list].length != 0){    
        auxHtml = ""
        _conf[list].map((d)=>{
            auxHtml+=  `<tr><td>${d.name}</td><td><a href="#${d.Id}"><i class="far fa-trash-alt red"></i></a></td></tr>`//`<tr><td>${d.code}</td><td>${d.name}</td><td><a href="#${d.Id}"><i class="far fa-trash-alt red"></i></a></td></tr>`
        })
        tb.innerHTML = aux+auxHtml
    }else if(lock){
        console.log("Locked")
        return
    }
    else{
        getConductList(type,(d)=>{
            _conf[list] = (d!= null)? d: [] 
            genericList(elem,type,list,aux,lock=true)
        })
    }
}

function genericList2(elem,type,list,aux,lock=false){
    tb = document.getElementById(elem)
    if(_conf[list].length != 0){    
        auxHtml = ""
        _conf[list].map((d)=>{
            auxHtml+=  `<tr><td>${d.code}</td><td>${d.name}</td><td><a href="#${d.Id}"><i class="far fa-trash-alt red"></i></a></td></tr>`
        })
        tb.innerHTML = aux+auxHtml
    }else if(lock){
        console.log("Locked")
        return
    }
    else{
        getConductList(type,(d)=>{
            _conf[list] = (d!= null)? d: [] 
            genericList(elem,type,list,aux,lock=true)
        })
    }
}


function genericSave2(elem,list,type,cod,name){
    newConduct(name,cod,type,()=>{
        tb = document.getElementById(elem)
        _conf[list].push({
            code: cod,
            name: name,
            type:type
        })
        
        tb.innerHTML += `<tr><td>${cod}</td><td>${name}</td><td><a href="#"><i class="far fa-trash-alt red"></i></a></td></tr>`
    })
}

initConfig()