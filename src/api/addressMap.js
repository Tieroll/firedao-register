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
    mintFireSeed:{address:"0xC06c0d7f3d85064CDbC185Cf76cCaeeA8Af90f59",abi:mintFireSeed},
    mintFireSoul:{address:"0x2dEE91d7e2A198160c7B1e0E94a1999Ed237A878",abi:mintFireSoul},
    Reputation:{address:"0xe34D37Dbc21987E5C49E9ac7B32ee2A560293ABb",abi:Reputation},
    SBT001:{address:"0xa6096Fb5541396e38bC86A0E6e912EBE9cB6f65a",abi:erc20Abi},
    SBT003:{address:"0x058C32ff6e93fd5d58598f6540063d7c00a2c49B",abi:erc20Abi}
};
export default CONTRACTS
