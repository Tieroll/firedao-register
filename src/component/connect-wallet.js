import styled from "styled-components";
import {Component, useReducer} from "react";
import {Button} from "antd"
import {useConnect,connect} from "../api/contracts";
import {
    WalletOutlined
} from '@ant-design/icons';
const ConnectWallet = () => {
    const ConnectBox = styled.div`
    `
    let {state, dispatch} = useConnect();
    const connectWallet = async () => {

        await connect(state,dispatch)
        console.log(state)
    }
    return (
        <ConnectBox>
            <Button type="primary" onClick={() => connectWallet()} className="" icon={<WalletOutlined />}>
                {
                    state.account ? state.account.substr(0,5) + "..."+ state.account.substr(state.account.length-5,state.account.length) : " Connect Wallet"
                }
            </Button>
        </ConnectBox>
    )

}
export default ConnectWallet
