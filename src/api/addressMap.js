import erc20Abi from "../abi/erc20.json";
import USERABI from "../abi/USERABI.json";
import firelockFactory from "../abi/firelockFactory.json";
import fireLock from "../abi/fireLock.json";
import mintFireSeed from "../abi/mintFireSeed.json";
import mintFireSoul from "../abi/mintFireSoul.json";
import Reputation from "../abi/Reputation.json";
const CONTRACTS = {
    erc20:{address:"0x46B85F2E50BFB50F4F78d29e98E679a859d5F839",abi:erc20Abi},
    user:{address:"0x02433aA39ce05EA771fD3c30369De11B94864a80",abi:USERABI},
    fireLockFactory:{address:"0x315ED6Ce2A015f211Db9B834f25Ed1788cbC239f",abi:firelockFactory},
    fireLock:{address:"0x87f76e152889e487f07aA737581d3D7522AA65CE",abi:fireLock},
    mintFireSeed:{address:"0x64f1729C3b0520cc5aceDCfEBbf3a7F84f40CF2c",abi:mintFireSeed},
    mintFireSoul:{address:"0x6fcd24B6d562f3A2f81e74B1a17FF227D468c938",abi:mintFireSoul},
    Reputation:{address:"0xe34D37Dbc21987E5C49E9ac7B32ee2A560293ABb",abi:Reputation}
};
export default CONTRACTS
