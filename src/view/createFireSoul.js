import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../api/contracts";
import {
    Card,
    Select,
    Button,
    InputNumber,
    Descriptions,
    message,
    Form,
    List,
    Input,
    notification,
    Switch,
    Radio
} from 'antd';
import {getContractByName, getContractByContract} from "../api/connectContract";
import {dealPayMethod, dealMethod, viewMethod} from "../utils/contractUtil"
import {useNavigate} from "react-router-dom";
import FireSoul from "../imgs/FireSoul@2x.png"

const MintFireSoul = (props) => {
    const [form] = Form.useForm();

    const MintFireSoul = styled.div`
      width: 100%;
      overflow: hidden;
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;

      .left-content {
        width: 40%;
        text-align: center;

        .img {
          width: 80%;
          margin: 0 auto;
        }
      }

      .form {
        margin-top: 3em;
        width: 50%;

        .subBtn {
          margin-top: 3em;
          padding: 0 3em;
        }

        .inputNumber {
          width: 50%;
        }
      }
    `
    const history = useNavigate();

    let {state, dispatch} = useConnect();
    const [fee, setFee] = useState(0.1)
    const [list, setList] = useState([])
    const [balance, setBalance] = useState([])
    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("mintFireSeed", state.api,)
        if (!contractTemp) {
            notification.error("please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("mintFireSoul", state.api,)
        if (!contractTemp) {
            notification.error("please connect")
        }
        dealMethod(contractTemp, state.account, name, params)
        // dealMethod(contractTemp, state.account, name, params,)
    }


    const Mint = async () => {
        handleDealMethod("burnToMint", [form.getFieldValue().fireseedId])
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
                label: id,
                value: id,
                balance: balance
            })
            console.log(list)
        }

        setList(list)
    }
    useEffect(() => {
        ownerNFT()
    }, [state.account]);
    const onChange = async (value) => {
        list.forEach(item => {
            if (item.label == value) {
                setBalance(item.balance)
            }
        })
    };
    return (
        <MintFireSoul>
            <div className="panel-box ">
                <h2 className="title">
                    Mint FireSoul
                </h2>
                <div className="flex-box">
                    <div className="left-content">
                        <img className="img" src={FireSoul} alt=""/>
                    </div>
                    <Form form={form} name="control-hooks" className="form">

                        <Form.Item
                            name="pid"
                            label="Your PID"
                            validateTrigger="onBlur"
                            validateFirst={true}

                        >
                            <InputNumber className="inputNumber"/>
                        </Form.Item>

                        <Form.Item
                            name="fireseedId"
                            label="Your FireSeedID:"

                        >
                            <Select
                                showSearch
                                placeholder="Select a FireSeedID"
                                onChange={(e)=>{
                                    onChange(e)
                                }}
                                options={list}
                            />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            label="Amount:"
                            validateTrigger="onBlur"
                            validateFirst={true}

                        >
                            {balance}
                        </Form.Item>
                        <div className="tip">
                            <p>
                                1.FireSoul: ERC721, each user can only mint one, non-transferable, is the soul account
                                of FireDAO official members, used to store various types of SBT and SBB. Generate a
                                unique FID and FID-based on-chain reputation.
                            </p>
                            <p>
                                2.You must have a FirePassport and burn a FireSeed to create a FireSoul account. If you
                                don't have one, please mint a FirePassport and FireSeed first.
                            </p>
                        </div>
                        <Form.Item wrapperCol={{offset: 2, span: 16}}>
                            <Button className="subBtn" htmlType="submit" type="primary"
                                    size="large"
                                    onClick={() => Mint()}>Mint</Button>
                        </Form.Item>

                    </Form>
                </div>

            </div>
        </MintFireSoul>
    )
}
export default MintFireSoul
