var _conduct = {open:[],done:[]}
function newConduct(){
    return {open:[],done:[]}
}

function initConducts(callback){
    getAndParseInterventions(()=>{
        done = ""
        open = ""
        _conduct.done.map(m=>{
            done += `<li class="cl">
                            <p>${m.name}</p>
                            <ul class="card-just">
                            <li><i class="fas fa-caret-right"></i> ${m.name} - ${m.nameUserDone} às ${m.doneDateTime}</li>
                            </ul>
                        </li>`

                // Checar se vai ser usado
                a = ` <div class="rw card-check">
                <label class="checks"><input type="checkbox" checked="checked" onchange="toggle(this,${m.Id})"><span class="checkmark"></span></label>
                <a href="#" onclick="edit(${m.Id})"><i class="far fa-edit"></i></a>
                <a href="#"><i class="fas fa-comments"></i></a>
                </div>`
        })

        _conduct.open.map(m=>{
            
            // TIPO 2
            open2 = `<li class="cl">
                        <p>${m.name}</p>
                        <ul class="card-just">
                            <li><i class="fas fa-caret-right"></i> Paciente com falência de acesso vascular - medico1 às 13:40h</li>
                        </ul>
                        <div class="rw mgt10 mgb10">
                            <input type="text" placeholder="Justificar conduta (ao clicar no ícone de edição)"><a class="bt rw mgl10" href="#">Adicionar <i class="fas fa-plus"></i></a>
                        </div>
                        <div class="rw card-check">
                            <label class="checks"><input type="checkbox" checked="checked"><span class="checkmark"></span></label>
                            <a href="#"><i class="far fa-edit"></i></a>
                            <a href="#"><i class="fas fa-comments"></i></a>
                        </div>
                    </li>`

            open += `<li class="cl">
                            <p>${m.name}</p>
                            <ul class="card-just">
                            <li><i class="fas fa-caret-right"></i> ${m.name} - ${m.nameUserDone} às ${m.doneDateTime}</li>
                            </ul>
                            <div class="rw card-check">
                                <label class="checks"><input type="checkbox" style="width:28px" checked="checked" onchange="toggle(this,${m.Id})"><span class="checkmark"></span></label>
                                <a href="#" onclick="edit('${m.Id}')"><i class="far fa-edit"></i></a>
                                <a href="#"><i class="fas fa-comments"></i></a>
                            </div>
                        </li>`
        })
        callback(open,done)
    })
}

function formateDate(date){
    if(date == "")  return ""
    return `${date.substring(6,8)}/${date.substring(4,6)}/${date.substring(0,4)} às ${date.substring(8,10)}:${date.substring(10,12)}h`
}

function getAndParseInterventions(callBack){
    getInterventions((data)=>{
        _conduct = newConduct()
        if(data == null) data = []
        data.map(m =>{
            if(m.archived == "false"){
                m.CreateDateTime = formateDate(m.CreateDateTime)
                m.DoneDateTime = formateDate(m.DoneDateTime)

                if(m.done == "true") _conduct.done.push(m)
                else _conduct.open.push(m)
            }
        })
        callBack()
    })
}