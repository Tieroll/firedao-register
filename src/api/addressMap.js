import erc20Abi from "../abi/erc20.json";
import USERABI from "../abi/USERABI.json";
import firelockFactory from "../abi/firelockFactory.json";
import fireLock from "../abi/fireLock.json";
import mintFireSeed from "../abi/mintFireSeed.json";
import mintFireSoul from "../abi/mintFireSoul.json";
const CONTRACTS = {
    erc20:{address:"0x46B85F2E50BFB50F4F78d29e98E679a859d5F839",abi:erc20Abi},
    user:{address:"0x9C15C2Ca363aC29A3c74bBF6787230E6Fb5a01F5",abi:USERABI},
    fireLockFactory:{address:"0x315ED6Ce2A015f211Db9B834f25Ed1788cbC239f",abi:firelockFactory},
    fireLock:{address:"0x87f76e152889e487f07aA737581d3D7522AA65CE",abi:fireLock},
    mintFireSeed:{address:"0x64f1729C3b0520cc5aceDCfEBbf3a7F84f40CF2c",abi:mintFireSeed},
    mintFireSoul:{address:"0x957fbccE72A01Ded9733f8D10a2a9456A0C376db",abi:mintFireSoul}
};
export default CONTRACTS
