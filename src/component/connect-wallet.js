import styled from "styled-components";
import {Component} from "react";
import {Button} from "antd"
import {useConnect,connect} from "../api/contracts";
const ConnectWallet = () => {
    let {state, dispatch} = useConnect();
    const ConnectBox = styled.div`
    `
    const connectWallet = async () => {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: '0x5'}],
        });
        await connect(state)
    }
    return (
        <ConnectBox>
            <Button onClick={() => connectWallet()} className="">
                {
                    state.account ? state.account : " Connect Wallet"
                }
            </Button>
        </ConnectBox>
    )

}
export default ConnectWallet
