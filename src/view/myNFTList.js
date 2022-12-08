import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import {Card, Button, Descriptions, message, Form, List, Input, notification} from 'antd';
import {SendOutlined, TwitterOutlined, UserOutlined} from "@ant-design/icons";
import {getContractByName, getContractByContract} from "../api/connectContract";
import {dealMethod, viewMethod} from "../utils/contractUtil"
import {useNavigate} from "react-router-dom";
import fireseed from "../imgs/FireSeed@2x.png"

const LockList = (props) => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const LockList = styled.div`
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
    `
    let {state, dispatch} = useConnect();
    const [contract, setContract] = useState(null)
    const [list, setList] = useState([])
    const [myClassAddress, setMyClass] = useState("")
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
        let contractTemp = await getContractByName("mintFireSeed", state.api,)
        if (!contractTemp) {
            openNotification("please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }

    const myClass = async () => {
        const address = await handleViewMethod("upclass", [state.account])
        console.log(address)
        setMyClass(address)
    }

    const ownerNFT = async () => {
        const listLength = await handleViewMethod("getOwnerIdlength", [])
        console.log(listLength)
        let list = []
        if (listLength <= 0) {
            return
        }
        for (let i = 0; i < listLength; i++) {
            const id = await handleViewMethod("ownerOfId", [state.account, i])
            const balance = await handleViewMethod("balanceOf", [state.account, id])
            list.push({
                id,
                balance,
            })
        }

        console.log(listLength, list)
        setList(list)
    }
    useEffect(() => {
        ownerNFT()
        myClass()
    }, [state.account]);
    const transfer = async (item) => {
        const {toAddress, amount} = form.getFieldValue()
        // params _token
        handleDealMethod("safeTransferFrom", [state.account, toAddress, item.id, amount, "0x00"])
    }

    return (
        <LockList>
            <h2>upClass:{myClassAddress}</h2>
            <Card className="card" title="NFT List" extra={<a onClick={() => {
                ownerNFT()
            }} href="#">Check</a>}>
                <List
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={'id:'+item.id}>
                                <Descriptions className="card-item" title="NFT Info"
                                >
                                    <Descriptions.Item label="nft">

                                        <div>
                                            balance: {item.balance}
                                        </div>
                                        <img className="img" src={fireseed} alt=""/>
                                    </Descriptions.Item>

                                    <Descriptions.Item label="transfer">
                                        <Form form={form}>
                                            <Form.Item
                                                name="toAddress"
                                                label="Transfer Address"
                                                validateTrigger="onBlur"
                                                validateFirst={true}
                                                rules={[
                                                    {required: true, message: 'Please input Title!'},
                                                ]}

                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name="amount"
                                                label="Transfer Amount"
                                                validateTrigger="onBlur"
                                                validateFirst={true}
                                                rules={[
                                                    {required: true, message: 'Please input Title!'},
                                                ]}

                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" onClick={() => {
                                                    transfer(item)
                                                }}>
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Form>


                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </List.Item>
                    )}
                />
                {/*{list.map(item=>{*/}
                {/*    return(*/}
                {/*        <div>*/}

                {/*            {item.address}*/}
                {/*            {item.LockInfo.LockTitle}*/}
                {/*            {item.LockInfo.amount}*/}
                {/*            {item.LockInfo.token}*/}
                {/*            {item.LockInfo.cliffPeriod}*/}
                {/*            {item.LockInfo.ddl}*/}
                {/*            {item.LockInfo.unlockCycle}*/}
                {/*            {item.LockInfo.unlockRound}*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*})}*/}

            </Card>

        </LockList>
    )
}
export default LockList
