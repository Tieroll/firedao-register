import erc20Abi from '../abi/erc20.json';
import USERABI from '../abi/USERABI.json';
const CONTRACTS = {
    erc20:{address:"0x46B85F2E50BFB50F4F78d29e98E679a859d5F839",abi:erc20Abi},
    user:{address:"0x7f42ACC216155EA0444bEb0eB07A9dA270F83663",abi:USERABI},
};

function getContractByName(name, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, CONTRACTS[name].address, {});
}

function getContractByContract(name, address, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, address, {});
}

function getContractAddress(name) {
    return CONTRACTS[name].address;
}

export  {
    CONTRACTS,
    getContractByName,
    getContractByContract,
    getContractAddress
};

