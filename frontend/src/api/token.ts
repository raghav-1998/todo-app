let accessToken:string|null=null;

//During session expired
let onSessionExpired:(()=>void)|null=null;

const getAccessToken=():string|null=>{
    return accessToken
}

const setAccessToken=(token:string|null):void=>{
    accessToken=token
}

const clearAccessToken=():void=>{
    accessToken=null
}

//"If the session expires, call this function."
const setSessionExpiredHandler=(
    handler:(()=>void)|null
):void=>{
    onSessionExpired=handler
}

//"The refresh token failed. Tell AuthContext."
const notifySessionExpired=():void=>{
    onSessionExpired?.();
}
export{
   getAccessToken,
   setAccessToken,
   clearAccessToken,
   setSessionExpiredHandler,
   notifySessionExpired
}