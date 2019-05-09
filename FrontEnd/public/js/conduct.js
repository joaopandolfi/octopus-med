var _conduct = []
function initConducts(){
   // _conduct = {diagnose:[], dispositive:[], culture: [], micr:[], exam:[], others:[], all:[], today:[], conduct:[], impression:"", lock:false}
    getAndParseInterventions(()=>{
        //tb = document.getElementById()
        aux = ""
        _conduct.map(m=>{
            aux += `<li class="cl">
                            <p>${m.name}</p>
                            <ul class="card-just">
                            <li><i class="fas fa-caret-right"></i> ${m.name} - ${m.particularity[0].doctor} às ${m.particularity[0].hour}</li>
                                   <--! <li><i class="fas fa-caret-right"></i> Solicitar avaliação da cirurgia vascular - Priscilla Aquino às 16:30h</li> -->
                            </ul>
                            <div class="rw card-check">
                                <label class="checks"><input type="checkbox" checked="checked" onchange="toggle(this,${m.Id})"><span class="checkmark"></span></label>
                                <a href="#" onclick="edit(${m.Id})"><i class="far fa-edit"></i></a>
                                <a href="#"><i class="fas fa-comments"></i></a>
                            </div>
                        </li>`
                        
        console.log(aux)
        })
        //tb.innerHTML = aux
    })
}

function getAndParseInterventions(callBack){
    getInterventions((data)=>{
        if(data == null) data = []
        _conduct = data
    })
    callBack()
}