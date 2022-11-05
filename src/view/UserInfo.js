import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import ConnectWallet from "../component/connect-wallet";
import { Descriptions } from 'antd';
import {getContractByName} from "../api/connectContract";
const UserInfo = ()=>{
    const UserInfo = styled.div`
    .info-box{
      width: 1200px;
      margin: 3em auto;
      border-radius: 30px;
      .connect{
        margin: 3em 0;
      }
    }
    `
    let {state, dispatch} = useConnect();

    let userInfo = async () => {
        let contract = await getContractByName("user", state.api)
        return contract.methods.users(state.account).call({
            from: state.account,
        })
    }
    let res =  userInfo()
    console.log(res)
    return(
        <UserInfo>

            <div className="info-box">
                <div className="connect">
                    <ConnectWallet/>
                </div>
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName"></Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>

                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">

                    </Descriptions.Item>
                </Descriptions>
            </div>
        </UserInfo>
    )
}
export default UserInfo
