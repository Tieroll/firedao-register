import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import {getContractByName} from "../api/connectContract"
import {Button, Form, message, Input, Tooltip, notification} from 'antd';
import {uploadJson, uploadFile} from "../utils/ipfsApi"
import firepassport from "../imgs/passport@2x.png"
import {useNavigate} from 'react-router-dom'
import {
    TwitterOutlined,
    SendOutlined,
    UserOutlined
} from '@ant-design/icons';

const Register = (props) => {
    const [form] = Form.useForm();
    const DaoHome = styled.div`
      .tip {
        padding: 1em 0;
        text-align: center;
        margin-top: -20px;
        color: orangered;
      }

      .content-box {
        display: flex;
        padding: 2em;

        .left {
          width: 40%;

          img {
            width: 80%;
            margin: 0 auto;
          }
        }
      }

      .connect {
        margin: 1em auto;
      }

      .subBtn {
        padding: 0 2em;
        height: 2em;
        width: 12em;
        font-size: 1.5em;
        margin-top: 1em;
      }
    `

    let {state, dispatch} = useConnect();
    const history = useNavigate();
    const [isExist, setIsExist] = useState(false)
    const [contract, setContract] = useState(null)
    const [solName, setSolname] = useState(undefined)
    const goUserInfo = () => {
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
    let usernameExists = async (value) => {
        if (!contract) {
            let contractTemp = await getContractByName("user", state.api,)
            await setContract(contractTemp)
        }
        return contract.methods.usernameExists(value).call({
            from: state.account,
        })
    }
    const feeOn = async () => {
        if (!contract) {
            let contractTemp = await getContractByName("user", state.api,)
            await setContract(contractTemp)
        }
        return contract.methods.feeOn().call({
            from: state.account,
        })
    }
    const fee = async (value) => {
        if (!contract) {
            let contractTemp = await getContractByName("user", state.api,)
            await setContract(contractTemp)
        }
        return contract.methods.fee().call({
            from: state.account,
        })
    }
    const checkUserName = async (value, fn) => {
        let name = value ? value.toString().toLowerCase() : ""
        setSolname(value.toString().toLowerCase())
        const isExist = await usernameExists(name)

        if (isExist) {
            openNotification("userName is exist")
            fn("userName is exist")
        } else {
            fn()
        }
        setIsExist(isExist)
        return isExist
    }
    const checkPassword = async (value, fn) => {
        if (value != form.getFieldValue("password")) {
            fn("Confirm password error ")
        } else {
            fn()
        }
    }
    let handlePost = async () => {
        let {userName, BIO, Email, Twitter, telegram, Website} = {...(form.getFieldsValue())}

        let errList = form.getFieldsError()
        let isPass = true
        for (let i = 0; i < errList.length; i++) {
            if (errList[i].errors.length > 0) {
                errList[i].errors.forEach(err => {
                    openNotification(err)
                })
                isPass = false
            }
        }
        if (!isPass) {
            return
        }
        if (!userName || userName.length < 4) {
            return
        }

        if (!Email ) {
            openNotification("Please input Email")
            return
        }
        let exist = await checkUserName(userName, () => {
        })
        if (exist) {
            openNotification("username is exist")
            return
        }

        const isOpenFeeOn = await feeOn()
        let feeValue = 0
        if (isOpenFeeOn) {
            feeValue = await fee()
            console.log(feeValue / 10 ** 18)
        }
        if (!contract) {
            let contractTemp = await getContractByName("user", state.api,)
            await setContract(contractTemp)
        }
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

        const hide3 = message.loading('wait sign', 0);
        contract.methods.register(userName, Email, jsonUrl.IpfsHash).estimateGas({
            from: state.account,
            value: feeValue
        }).then(gas => {
            contract.methods.register(userName, Email, jsonUrl.IpfsHash).send({
                from: state.account,
                gas: parseInt(gas * 1.2),
                value: state.api.utils.toBN(feeValue)
            }).then(async res => {
                console.log(res)
                openNotificationSuccess("register success")
                setTimeout(hide3, 1000);
            }).catch(e => {
                console.log(e)
                setTimeout(hide3, 1000);
            })
        }).catch(e => {
            console.log(e)
            openNotification(e.message)
            setTimeout(hide3, 1000);
        })

    };
    const getFile = (e) => {
        console.log(e.target.files)
        uploadFile(e.target.files[0])
    }
    const Table = () => {

        const {TextArea} = Input;
        return (
            <Form form={form} name="control-hooks">
                <Form.Item
                    name="userName"
                    label="Forum usename"
                    validateTrigger="onBlur"
                    validateFirst={true}
                    rules={[
                        {required: true, message: 'Please input your username!'},
                        {min: 4, message: "name length need > 4"},
                        {max: 20, message: "name length need < 20"},
                        {
                            pattern: new RegExp('^[0-9a-zA-Z_]{1,}$', 'g'),
                            message: 'The value can contain only digits, letters, and underscores'
                        },
                        {
                            validator: (rule, value, fn) => {
                                checkUserName(value, fn)
                            }
                        },
                    ]}

                >
                    <Input
                        prefix={<UserOutlined/>}
                    />
                </Form.Item>
                <Form.Item
                    name="userName"
                    label="FireDAO usename">
                    {solName}
                </Form.Item>
                {/*<Form.Item*/}
                {/*    name="password"*/}
                {/*    label="Password"*/}
                {/*    rules={[{required: true, message: 'Please input your password!'},*/}
                {/*        {min: 8, message: "password length need > 8"},*/}
                {/*        {*/}
                {/*            pattern: new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$"),*/}
                {/*            message: ' must include letters and numbers Or special characters'*/}
                {/*        },]}*/}
                {/*>*/}
                {/*    <Input.Password*/}

                {/*    />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item*/}
                {/*    name="subpassword"*/}
                {/*    label="Sub Password"*/}
                {/*    validateTrigger="onBlur"*/}
                {/*    rules={[{required: true, message: 'Please input your sub password!'},*/}
                {/*        {*/}
                {/*            validator: (rule, value, fn) => {*/}
                {/*                checkPassword(value, fn)*/}
                {/*            }*/}
                {/*        },]}*/}
                {/*>*/}
                {/*    <Input.Password*/}
                {/*    />*/}
                {/*</Form.Item>*/}
                <Form.Item
                    name="BIO"
                    label="BIO"
                    rules={[
                        {max: 200, message: "BIO length need < 200"},]}
                >
                    <TextArea
                        allowClear

                    />
                </Form.Item>
                <Form.Item
                    name="Email"
                    label=" Email"
                    rules={[{required: true, message: 'Please input your Email!'},
                        {max: 50, message: "Email length need < 50"},

                        {
                            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                            message: "Email error"
                        }
                    ]}
                >
                    <Input
                    />
                </Form.Item>
                <Form.Item
                    name="Twitter"
                    label="Twitter"
                    rules={[
                        {max: 50, message: "Twitter length need < 50"},]}
                >
                    <Input
                        prefix={<TwitterOutlined/>}
                    />
                </Form.Item>
                <Form.Item
                    name="telegram"
                    label="Telegram"
                    rules={[
                        {max: 50, message: "Telegram length need < 50"},]}
                >
                    <Input
                        prefix={<SendOutlined/>}
                    />
                </Form.Item>
                <Form.Item
                    name="Website"
                    label="Website"
                    rules={[
                        {max: 50, message: "Website length need < 50"},]}
                >
                    <Input
                    />
                </Form.Item>
                <Form.Item wrapperCol={{offset: 2, span: 16}}>
                    <Button className="subBtn" htmlType="submit" type="primary"
                            onClick={() => handlePost()}>Regist</Button>
                </Form.Item>
                <div className="tip">Minting Fee: 0.005ETH</div>

                <Form.Item wrapperCol={{offset: 2, span: 16}}>
                    <Button className="subBtn" onClick={() => {
                        goUserInfo()
                    }}> checkUserInfo </Button>
                </Form.Item>
            </Form>
        )
    }
    return (
        <DaoHome className='daoHome daoContentBg'>
            <div className=" panel-box">
                <h2 className="title">
                    Create Passport
                </h2>
                <div className="content-box ">
                    <div className="left">
                        <img src={firepassport} alt=""/>
                    </div>
                    <div>
                        {Table()}
                    </div>
                    {/*<input type="file" onChange={(file)=>{*/}
                    {/*    getFile(file)*/}
                    {/*}}/>*/}
                </div>
            </div>

        </DaoHome>
    )
}

export default Register
