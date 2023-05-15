import React, {useEffect, useRef, useState} from 'react';
import {useConnect} from "../../../../api/contracts";
import TransferOwnerStyle from "./TransferOwnerStyle";
import {Button, Card, Form, Input, notification, Radio, Switch} from "antd";
import {getContractByName} from "../../../../api/connectContract";
import {dealMethod} from "../../../../utils/contractUtil";
import {UserAddOutlined, UserDeleteOutlined} from "@ant-design/icons";

const TransferOwner = (props) => {
    const {closeDialog,id, myScore,updateData,obj} = props

    let {state, dispatch} = useConnect();
    const [form] = Form.useForm();


    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("Guild", state.api,)
        if (!contractTemp) {
        }
        return dealMethod(contractTemp, state.account, name, params)
    }


    const handleSetAddress = async () => {
        await handleDealMethod("submitApplication", [id,form.getFieldValue().link])
        updateData()
        closeDialog()
    }
    useEffect(() => {
    }, []);

    return (
        <TransferOwnerStyle>
            <div className="mask">

            </div>
            <div className="dialog-content">
                <div className="header">
                    <div className="title">
                        Apply
                    </div>
                    <div className="close" onClick={closeDialog}>
                        <svg t="1681179633627" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="2615" width="26" height="26">
                            <path
                                d="M753.365333 843.861333a64 64 0 0 0 90.496-90.496L602.496 512l241.365333-241.365333a64 64 0 0 0-90.496-90.496L512 421.504 270.634667 180.138667a64 64 0 1 0-90.496 90.496L421.504 512l-241.365333 241.365333a64 64 0 0 0 90.496 90.496L512 602.496l241.365333 241.365333z"
                                fill="#ffffff" p-id="2616"></path>
                        </svg>
                    </div>
                </div>
                <div className="flex-box">
                    <div className="name">
                        Current FID Score Limit
                    </div>
                    <div className="value">
                        {obj.scoreLimit}
                    </div>
                </div>
                <div className="flex-box">
                    <div className="name">
                        My Score
                    </div>
                    <div className="value">
                        {myScore}
                    </div>
                </div>
                <Form form={form} name="control-hooks">
                    <div className="address-item">
                        <Form.Item
                            name="link"
                            label="Apply Link"
                            className="address"
                        >
                            <div className="flex-box">
                                <Input/>
                            </div>
                        </Form.Item>
                    </div>

                </Form>
                <Button className="sub-btn" onClick={handleSetAddress} type="primary">
                    Mint & Submit
                </Button>
            </div>
        </TransferOwnerStyle>
    )
}
export default TransferOwner
