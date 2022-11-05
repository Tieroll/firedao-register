import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import {getContractByName} from "../api/connectContract"
import ConnectWallet from "../component/connect-wallet"
import {Button, Form, message ,Input,Tooltip, notification} from 'antd';
import {uploadJson} from "../utils/ipfsApi"
import { getSign,daoRegister} from "../api/userApi";

import {useNavigate} from 'react-router-dom'
import {
TwitterOutlined,
    SendOutlined,
UserOutlined
} from '@ant-design/icons';
const DaoHome = (props) => {

    const DaoHome = styled.div`
      .content-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2em;
      }

      .connect {
        margin: 1em auto;
      }
      
      .subBtn{
        padding: 0 2em;
        height: 2em;
        width: 12em;
        font-size: 1.5em;
      }
    `

    let {state, dispatch} = useConnect();
    const history = useNavigate();

    const goUserInfo =()=>{
        history("/UserInfo");
    }
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
    const openNotificationSuccess = (message) => {
        notification.success({
            message: message,
            description:
                "",
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    let usernameExists = async () => {
        let contract = await getContractByName("user", state.api,)
        return contract.methods.usernameExists(userName).call({
            from: state.account,
        })
    }
    let handlePost = async () => {
        if (userName.length > 20) {
            openNotification("length need < 20")
            return
        }
        if (!userName) {
            openNotification("Please input userName")
            return
        }
        if (!BIO) {
            openNotification("Please input BIO")
            return
        }
        if (!password || !subpassword) {
            openNotification("Please input password and Sub Password")
            return
        }

        if(!Email.match(/^\w+@\w+\.\w+$/i)){
            openNotification("Incorrect email format")
            return
        }
        if (!Twitter ) {
            openNotification("Please input Twitter")
            return
        }
        if (!telegram ) {
            openNotification("Please input telegram")
            return
        }

        const isExist = await usernameExists(userName)
        if (isExist) {
            openNotification("userName is exist")
            return
        }
        let contract = await getContractByName("user", state.api,)
        const hide1 = message.loading('Upload User Info', 0);
        let jsonUrl = await uploadJson({
            name: userName,
            BIO,
            Email,
            Twitter,
            telegram,
            Website
        })
        setTimeout(hide1, 1000);
        const hide2 = message.loading('wait sign', 0);
        let rightnow = (Date.now() / 1000).toFixed(0)
        let sortanow = rightnow - (rightnow % 600)
        let signRes =await state.api.eth.personal.sign('Signning in to firedao' + 'at' + sortanow, state.account, password)
        console.log(signRes)
        setTimeout(hide2, 1000);

        const hide3 = message.loading('wait sign', 0);
        contract.methods.register(userName, jsonUrl.IpfsHash).estimateGas({from: state.account}).then(gas => {
            contract.methods.register(userName, jsonUrl.IpfsHash).send({
                from: state.account,
                gas: parseInt(gas * 1.2)
            }).then(async res => {
                console.log(res)
                openNotificationSuccess("solidity register success")
                let reigsRes = await daoRegister({
                    sign:signRes,
                    address:state.account,
                    verify:1,
                    user: userName,
                    passwrd1:password,
                    passwrd2:subpassword,
                    email:Email
                })

                if(JSON.parse(reigsRes).status==1){
                    openNotificationSuccess(JSON.parse(reigsRes).error)
                }else{
                    openNotification("already this user")
                }
                setTimeout(hide3, 1000);
            })
        }).catch(e => {
            console.log(e)
            openNotification("already this user")
            setTimeout(hide3, 1000);
        })

    };
    const [userName, setUserName] = useState('');
    const [BIO, setBIO] = useState('');
    const [Email, setEmail] = useState('');
    const [Twitter, setTwitter] = useState('');
    const [telegram, setTelegram] = useState('');
    const [Website, setWebsite] = useState('');
    const [password, setPassword] = useState('');
    const [subpassword, setSubpassword] = useState('');
    const Table = () => {
        const [form] = Form.useForm();
        const { TextArea } = Input;
        return (
            <Form form={form} name="control-hooks">
                <div className="input-box">
                    <Form.Item
                        name="User Name"
                        label="User Name"
                    >
                        <Input defaultValue={userName}
                               value={userName}
                               onBlur={e => setUserName(e.target.value)}
                               prefix={<UserOutlined/>}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        label="Password"
                    >
                        <Input.Password defaultValue={password}
                                        value={password}
                                        onBlur={e => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Sub Password"
                        label="Sub Password"
                    >
                        <Input.Password defaultValue={subpassword}
                                        value={subpassword}
                                        onBlur={e => setSubpassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="BIO"
                        label="BIO"
                    >
                        <TextArea defaultValue={BIO}
                                  allowClear
                               value={BIO}
                               onBlur={e => setBIO(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Email"
                        label="Email"
                    >
                        <Input defaultValue={Email}
                               value={Email}
                               onBlur={e => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Twitter"
                        label="Twitter"
                    >
                        <Input defaultValue={Twitter}
                               value={Twitter}
                               onBlur={e => setTwitter(e.target.value)}
                               prefix={<TwitterOutlined/>}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Telegram"
                        label="Telegram"
                    >
                        <Input defaultValue={telegram}
                               value={telegram}
                               onBlur={e => setTelegram(e.target.value)}
                               prefix={<SendOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Website"
                        label="Website"
                    >
                        <Input defaultValue={Website}
                               value={Website}
                               onBlur={e => setWebsite(e.target.value)}
                        />
                    </Form.Item>


                </div>
            </Form>
        )
    }
    return (
        <DaoHome className='daoHome daoContentBg'>
            <div className="content-box">
                <div className="connect">
                    <ConnectWallet/>
                </div>
                <div>
                    {Table()}
                </div>
                <Button className="subBtn" type="primary" onClick={() => handlePost()}>Regist</Button>
                <Button onClick={()=>{
                    goUserInfo()
                }}> goUserInfo </Button>
            </div>

        </DaoHome>
    )
}

export default DaoHome
