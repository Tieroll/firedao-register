import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import {Card, Button, Switch, message, Form, Input, notification} from 'antd';
import {getContractByName} from "../api/connectContract";
import {dealMethod,viewMethod } from "../utils/contractUtil"

const AdminPage = (props) => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [form3] = Form.useForm();
    const [form4] = Form.useForm();
    const [form5] = Form.useForm();
    const [form6] = Form.useForm();
    const [form7] = Form.useForm();
    const AdminPage = styled.div`
      .info-box {
        width: 1200px;
        margin: 3em auto;
        border-radius: 30px;

        .connect {
          margin: 3em 0;
        }
      }
    `
    let {state, dispatch} = useConnect();
    const [contract, setContract] = useState(null)
    const [feeOn, setFeeOn] = useState(false)

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
        let contractTemp = await getContractByName("user", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        await setContract(contractTemp)
        dealMethod(contractTemp, state.account, name, params)
    }
    const handleDealReputationMethod = async (name, params) => {
        let contractTemp = await getContractByName("Reputation", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        await setContract(contractTemp)
        dealMethod(contractTemp, state.account, name, params)
    }
    const handleViewReputationMethod = async (name, params) => {
        let contractTemp = await getContractByName("Reputation", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        await setContract(contractTemp)
       return  viewMethod(contractTemp, state.account, name, params)
    }
    const handleSetFee = async () => {
        if (!contract) {
            let contractTemp = await getContractByName("user", state.api,)
            if (!contractTemp) {
                openNotification("Please connect")
            }
            await setContract(contractTemp)
        }
        console.log(contract)
        let {Fee} = {...(form.getFieldsValue())}
        handleDealMethod("setFee", [Fee])
    }
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setFeeOn(checked)
    };
    const handleSetFeeOn = async () => {
        if (!contract) {
            let contractTemp = await getContractByName("user", state.api,)
            await setContract(contractTemp)
        }

        handleDealMethod("setFeeOn", [feeOn])
    }
    const changeFeeReceiver = async () => {
        if (!contract) {
            let contractTemp = await getContractByName("user", state.api,)
            await setContract(contractTemp)
        }

        let {Address} = {...(form2.getFieldsValue())}
        handleDealMethod("changeFeeReceiver", [Address])

    }
    const addSBTAddress = async () => {
        handleDealReputationMethod("addSBTAddress", [form3.getFieldValue()._sbt, form3.getFieldValue()._coefficient])
    }
    const setSBTAddress = async () => {
        handleDealReputationMethod("setSBTAddress", [form4.getFieldValue().num, form4.getFieldValue()._sbt])
    }
    const setCoefficient= async () => {
        handleDealReputationMethod("setCoefficient", [form5.getFieldValue().num, form5.getFieldValue()._coefficient])
    }
    const checkReputation= async () => {
        let res = await handleViewReputationMethod("checkReputation", [form6.getFieldValue().user, ])
        alert(res)
    }
    return (
        <AdminPage>

            <h2>User</h2>
            <Card title="setFee修改费用" extra={<a href="#"></a>} style={{width: "50vw"}}>
                <Form form={form} name="control-hooks">
                    <div className="input-box">
                        <Form.Item
                            name="Fee"
                            label="Fee"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Fee!'},
                            ]}

                        >
                            <Input/>
                        </Form.Item>
                    </div>
                </Form>
                <Button onClick={() => {
                    handleSetFee()
                }}>修改</Button>
            </Card>
            <Card title="setFeeOn费用开关" extra={<a href="#"></a>} style={{width: "50vw"}}>
                <Switch defaultChecked onChange={onChange}/>
                <Button onClick={() => {
                    handleSetFeeOn()
                }}>打开/关闭</Button>
            </Card>

            <Card title="changeFeeReceiver修改费用接收地址" extra={<a href="#"></a>} style={{width: "50vw"}}>
                <Form form={form2} name="control-hooks">
                    <div className="input-box">
                        <Form.Item
                            name="Address"
                            label="Address"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Address!'},
                            ]}

                        >
                            <Input/>
                        </Form.Item>
                    </div>
                </Form>
                <Button onClick={() => {
                    changeFeeReceiver()
                }}>修改</Button>
            </Card>
        </AdminPage>
    )
}
export default AdminPage
