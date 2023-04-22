import {fetchQueryBase} from "./index";

export function getFireLockList() {
    return fetchQueryBase("henry-maker-commits/ffda", {
        text: `{
              allLockItems(first: 1000,orderBy: id,orderDirection: desc) {
                id
                lockAddr
                admin
                title
                token
               lockAmount
                lockTime
                cliffPeriod
                unlockCycle
                unlockRound
                ddl
              }
        }`
    }, "")
}
export function getSearchData() {
    return fetchQueryBase("henry-maker-commits/new", {
        text: `{
              allLockItems(first: 1000) {
                id
                lockAddr
                title
                token
               lockAmount
                lockTime
                cliffPeriod
                unlockCycle
                unlockRound
                ddl
              }
        }`
    }, "")
}
