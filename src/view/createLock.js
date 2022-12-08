import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import {Card, Button,Radio,Switch , message, Form, Input, notification} from 'antd';
import {SendOutlined, TwitterOutlined, UserOutlined} from "@ant-design/icons";
import {getContractByContract, getContractByName} from "../api/connectContract";
import {dealMethod, viewMethod} from "../utils/contractUtil"
import {useNavigate} from "react-router-dom";

const CreatePage = (props) => {
    const [form] = Form.useForm();
    const history = useNavigate();
    const goPage = (url) => {
        history(url);
    }
    const CreatePage = styled.div`
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

    const [coinInfo, setCoinInfo] = useState({})
    const [isTerminatePermission, setIsTP] = useState(false)
    const [isChooseManage, setIsCM] = useState(1)
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
    const handleDealMethod = async (name,params)=>{
        let contractTemp = await getContractByName("fireLockFactory", state.api,)
        if(!contractTemp){
            openNotification("please connect")
        }
        return dealMethod(contractTemp,state.account,name,params)
    }
    const handleDealCoinMethod = async (name,address,params)=>{
        let contractTemp = await getContractByContract("erc20", address,state.api,)
        return dealMethod(contractTemp,state.account,name,params)
    }
    const handleViewMethod = async (name, params) => {
        if (!contract) {
            let contractTemp = await getContractByName("fireLockFactory", state.api,)
            if (!contractTemp) {
                openNotification("please connect")
            }
            await setContract(contractTemp)
        }
        return await viewMethod(contract, state.account, name, params)
    }
    const handleDealMethod2 = async (name,address, params) => {
        let contractTemp = await getContractByContract("fireLock",address, state.api,)
        if (!contractTemp) {
            openNotification("please connect")
        }
        dealMethod(contractTemp, state.account, name, params)
    }
    const createLock = async () => {
        await handleDealMethod("createLock", [])

    }
    const approve =async ()=>{
        const listLength = await handleViewMethod("getOwnerLockLenglength",[])
        const address = await handleViewMethod("ownerLock", [state.account, listLength-1])
        /*eslint-disable*/
        handleDealCoinMethod("approve",form.getFieldValue().TokenAddress,[address,BigInt(10**24)])
    }
    const lock = async ()=>{

        const listLength = await handleViewMethod("getOwnerLockLenglength",[])
        const address = await handleViewMethod("ownerLock", [state.account, listLength-1])
        const {TokenAddress,CliffPeriod,UnlockCycle,UnlockRound,Amount ,Title} = form.getFieldValue()
        console.log(address)
        /*params
            address _token,uint256 _unlockCycle,uint256 _unlockRound ,uint256 _amount,uint256 _cliffPeriod ,string memory _titile
        * */
        "0xF748bA67Da97673f3312fE718ABc653f080eC75e"
        await handleDealMethod2("lock", address,[TokenAddress,UnlockCycle,UnlockRound,Amount,CliffPeriod,Title,isTerminatePermission])
    }

    const checkAddress = async (value)=>{
        console.log(value)
        let contractTemp = await getContractByContract("erc20", value,state.api,)
        const decimal = await viewMethod(contractTemp,state.account,"decimals",[])
        const name = await viewMethod(contractTemp,state.account,"name",[])
        const symbol = await viewMethod(contractTemp,state.account,"symbol",[])
        let balance = await viewMethod(contractTemp,state.account,"balanceOf",[state.account])
        balance = balance / (10**parseInt(decimal))
        setCoinInfo({
            name,
            symbol,
            decimal,
            balance
        })
    }

    return (
        <CreatePage>
            <Card title="Create your lock" extra={<a href="#"></a>} style={{width: "100vw"}}>
                <Form form={form} name="control-hooks">
                    <div className="input-box">
                        <Form.Item
                            name="Title"
                            label="Title"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Title!'},
                            ]}

                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className="input-box">
                        <Form.Item
                            name="TokenAddress"
                            label="TokenAddress"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input TokenAddress!'},
                                {
                                    validator: (rule, value, fn) => {
                                        checkAddress(value, fn)
                                    }
                                }
                            ]}

                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className="input-box">
                        <Form.Item
                            name="Name"
                            label="Name"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Name!'},
                            ]}
                        >
                            {coinInfo.name}
                        </Form.Item>
                    </div>
                    <div className="input-box">
                        <Form.Item
                            name="Symbol"
                            label="Symbol"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Symbol!'},
                            ]}

                        >
                            {coinInfo.symbol}
                        </Form.Item>
                    </div>
                    <div className="input-box">
                        <Form.Item
                            name="Decimals"
                            label="Decimals"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Decimals!'},
                            ]}

                        >{coinInfo.decimal}
                        </Form.Item>
                    </div>
                    <div className="input-box">
                        <Form.Item
                            name="Balance"
                            label="Balance"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Balance!'},
                            ]}

                        >{coinInfo.balance}
                        </Form.Item>
                    </div>

                        <Form.Item
                            name="Amount"
                            label="Amount"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Amount!'},
                            ]}

                        >
                            <Input/>
                        </Form.Item>
                    <Form.Item
                        name="Terminate permission"
                        label="Terminate permission"
                        validateTrigger="onBlur"
                        validateFirst={true}
                        rules={[
                            {required: true, message: 'Please input Amount!'},
                        ]}

                    >
                        <Switch checked={isTerminatePermission} onChange={(value)=>{
                            setIsTP(value)}} />
                    </Form.Item>
                    <Form.Item
                        name="Contract Manager"
                        label="Contract Manage"
                        validateTrigger="onBlur"
                        validateFirst={true}
                        rules={[
                            {required: true, message: 'Please input Amount!'},
                        ]}

                    >
                        <Radio.Group value={isChooseManage} onChange={(e)=>{
                            setIsCM(e.target.value)
                        }}>
                            <Radio value={1}>itSelf</Radio>
                            <Radio value={2}>other</Radio>

                        </Radio.Group>
                    </Form.Item>
                    {(isChooseManage==2)&&(
                        <Form.Item
                            name="Manage Address"
                            label="Manage Address"
                            validateTrigger="onBlur"
                            validateFirst={true}
                            rules={[
                                {required: true, message: 'Please input Manage!'},
                            ]}

                        >
                            <Input/>
                        </Form.Item>
                    )}
                    <h2>Lock Parameters</h2>
                    <Form.Item
                        name="CliffPeriod"
                        label="Cliff Period"
                        validateTrigger="onBlur"
                        validateFirst={true}
                        rules={[
                            {required: true, message: 'Please input Cliff Period!'},
                        ]}

                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="UnlockCycle"
                        label="Unlock Cycle"
                        validateTrigger="onBlur"
                        validateFirst={true}
                        rules={[
                            {required: true, message: 'Please input Unlock Cycle!'},
                        ]}

                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="UnlockRound"
                        label="Unlock Round"
                        validateTrigger="onBlur"
                        validateFirst={true}
                        rules={[
                            {required: true, message: 'Please input Unlock Round!'},
                        ]}

                    >
                        <Input/>
                    </Form.Item>
                </Form>


                <Button onClick={() => {
                    createLock()
                }}>初始化(createLock)</Button>
                <Button onClick={() => {
                    approve()
                }}>授权(approve)</Button>
                <Button onClick={() => {
                    lock()
                }}>创建(lock)</Button>
                <Button onClick={()=>{
                    goPage("/LockList")
                }}>
                    查看列表
                </Button>
            </Card>

        </CreatePage>
    )
}
export default CreatePage
