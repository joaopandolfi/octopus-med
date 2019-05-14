// Get interventions and popule _conduct
function getAndParseInterventions(callback){
    getInterventions((result)=>{
        if(result != null){
            result.map((r)=>{
                switch (r.type){
                    case "diagnose":
                    _conduct.diagnose.push(r)
                    break;
        
                    case "dispositive":
                    _conduct.dispositive.push(r)
                    break;

                    case "culture":
                    _conduct.culture.push(r)
                    break;

                    case "microbials":
                    _conduct.micr.push(r)
                    break

                    case "exames":
                    _conduct.exam.push(r)
                    break
        
                    case "conduct-plan-name":
                    case "conduct-plan":
                    _conduct.conduct.push(r)
                    break

                    default:
                    _conduct.others.push(r)
                }
            })
            _conduct.all = result
        }
        callback()
    })
}
