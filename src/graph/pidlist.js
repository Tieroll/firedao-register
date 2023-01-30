import {fetchQuery} from "./index";

export function getPidList() {
    return fetchQuery({
        text: `{
                  registers (first: 50) {
                    id
                    pid
                    account
                    email
                   username
                   information  
                  }
        }`
    }, "")
}
