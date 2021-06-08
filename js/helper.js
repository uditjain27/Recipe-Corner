import { TIME_OUT } from "./config";

const timeout = async function(s){
    return new Promise(function(_,reject){
        setTimeout(function(){
            reject(new Error(`Request took too long to respond!! Try Again!!`));
        },1000*s);
    });
};

export const fetchJSON = async function(URL, uploadData = undefined){
    try{
        const fetchURL = uploadData ? fetch(URL,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(uploadData),
        }) : fetch(URL);
        const rec = await Promise.race([fetchURL , timeout(TIME_OUT)]);
        const data = await rec.json();
        if(!rec.ok) throw new Error(`${data.message} (${rec.status})`);
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}
