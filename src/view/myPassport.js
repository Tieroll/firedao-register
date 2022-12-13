import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import {Card, Button, Descriptions, message, Form, List, Input, notification} from 'antd';
import {SendOutlined, TwitterOutlined, UserOutlined} from "@ant-design/icons";
import {getContractByName, getContractByContract} from "../api/connectContract";
import {dealMethod, viewMethod} from "../utils/contractUtil"
import {getIpfs} from "../utils/ipfsApi";

const MyPassport = (props) => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const MyPassport = styled.div`
      width: 100%;

      .card {
        width: 100%;
      }

      .img {
        width: 10em;
      }

      .input {
        width: 16em;
      }
      .nav-list-box{
        margin: 2em 0;
        display: flex;
      }
      
      .nav-list{
        
        display: flex;
        background: #3F3535;
        border-radius: 10px;
        border: 1px solid #333333;
        padding: 3px;
        .nav-item{
          cursor: pointer;
          padding: 10px 30px;
          border-radius: 10px;
          margin-right: 10px;
          font-size: 16px;
          font-weight: bold;
          &.active{
            background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
            box-shadow: 0px 3px 6px 0px rgba(128,4,149,0.3);
          }
          &:nth-last-child(1){
            margin-right: 0;
          }
        }
      }
    `
    let {state, dispatch} = useConnect();
    const [userInfo, setUserInfo] = useState({})
    const [userData, setUserData] = useState({})
    const [myClassAddress, setMyClass] = useState([])
    const [myPassport, setPassport] = useState("")
    const [fid, setFid] = useState(undefined)
    const openNotification = (message) => {
        notification.error({
            message: message,
            description:
                "",
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("mintFireSeed", state.api,)
        if (!contractTemp) {
            openNotification("please connect")
        }
        dealMethod(contractTemp, state.account, name, params)
    }
    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("mintFireSoul", state.api,)
        if (!contractTemp) {
            openNotification("please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleSeedViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("mintFireSeed", state.api,)
        if (!contractTemp) {
            openNotification("please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleUserViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("user", state.api,)
        if (!contractTemp) {
            openNotification("please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const getSoulAccount = async () => {
        const address = await handleViewMethod("getSoulAccount", [state.account])
        console.log(address)
        setPassport(address)
    }

    const myClass = async () => {
        const address = await handleSeedViewMethod("upclass", [state.account])
        setMyClass(address)
    }
    const myInfo = async ()=>{
        const fidData = await handleViewMethod("FID", [])
        console.log(fidData)
        const userInfoData = await handleUserViewMethod("userInfo", [state.account])
        console.log(userInfoData)
        let info = await getIpfs(userInfoData.information)
        setUserInfo(userInfoData)
        setUserData(info)
        setFid(fidData)

    }
    useEffect(() => {
        getSoulAccount()
        myClass()
        myInfo()
    }, [state.account]);


    return (
        <MyPassport>
            <h1>
                My Passport
            </h1>
            <div className="panel-box">
                <div className="header">
                    <div className="img">

                    </div>
                    <div className="name">
                        {userInfo.username}
                    </div>
                </div>
                <div className="bio flex-box">
                    <strong>BIO:</strong>
                    <div className="name">
                        {userData.BIO}
                    </div>
                </div>
                <div className="flex-box">
                    <div className="telegram">
                        <a href={"https://t.me" + userData.telegram}>
                            <svg t="1670917511236" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="3133" width="20" height="20">
                                <path
                                    d="M679.424 746.862l84.005-395.996c7.424-34.852-12.581-48.567-35.438-40.009L234.277 501.138c-33.72 13.13-33.134 32-5.706 40.558l126.282 39.424 293.156-184.576c13.714-9.143 26.295-3.986 16.018 5.157L426.898 615.973l-9.143 130.304c13.13 0 18.871-5.706 25.71-12.581l61.696-59.429 128 94.282c23.442 13.129 40.01 6.29 46.3-21.724zM1024 512c0 282.843-229.157 512-512 512S0 794.843 0 512 229.157 0 512 0s512 229.157 512 512z"
                                    fill="#1296DB" p-id="3134"></path>
                            </svg>
                            {
                                userData.telegram
                            }
                        </a>
                    </div>
                    <div className="twitter">
                        <a href={"https://twitter.com/" + userData.Twitter} target="_blank">
                            <svg t="1670916997988" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="2144" width="20" height="20">
                                <path
                                    d="M295.2 338c120.2 61 221.7 57.4 221.7 57.4s-38.5-134.8 80.5-194.6 200.9 41 200.9 41 20.8-5.7 36.2-11.4c15.5-5.7 37.8-15.9 37.8-15.9l-36.7 65.8 56.5-6s-7 10.2-29.6 31-31.9 31.6-31.9 31.6 8.1 162.3-77 287.2C668.5 749 558.6 824 398.9 839.8c-159.7 15.8-263.7-49.2-263.7-49.2s69.8-4 114.3-21.1S358 707.4 358 707.4s-91-28.1-123.7-59.8c-32.7-31.6-40.8-50.4-40.8-50.4l89.8-1.2s-94.5-50.4-121.3-90.3-30.3-78.5-30.3-78.5l69.1 28s-57.4-78.4-65.6-139.4c-8.2-61 10.5-93.8 10.5-93.8s29.3 55 149.5 116z"
                                    fill="#5DD7FC" p-id="2145"></path>
                            </svg>
                            {userData.Twitter}
                        </a>
                    </div>
                </div>
                <div>
                    SoulAccount:
                    {
                        myPassport
                    }

                </div>
                <div>
                    MyClass:
                    {
                        myClassAddress
                    }
                </div>

            </div>
            <div className="panel-box">
                <div className="panel-title">
                    My Web3 Id
                </div>
                <div>
                    fid:
                    {fid}
                </div>
            </div>
        </MyPassport>
    )
}
export default MyPassport
