
export function dealError(e){
   if(e.message&&e.message.indexOf('{')>0){
      return e.message.substr(0,e.message.indexOf('{'))
   }else if(e.message.indexOf('(')>0){
      return e.message.substr(0,e.message.indexOf(' ('))
   }else{
      return e.message
   }

}
