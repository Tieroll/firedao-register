import {fetchQuery} from "./index";

export function getPasslist() {
    return fetchQuery({
        text: `{
                  passFireSeeds (first: 5) {
                    id
                    from
                    to
                    tokenId
                    amount
                    transferTime
                  }
        }`
    }, "")
}
