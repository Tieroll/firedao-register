
export function dealError(e){
   return e.message.substr(0,e.message.indexOf('{'))
}
