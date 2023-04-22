import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../../api/contracts";
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
import {getContractByName, getContractByContract} from "../../api/connectContract";
import {dealPayMethod, dealMethod, viewMethod} from "../../utils/contractUtil"
import {useNavigate} from "react-router-dom";
import FireSoul from "../../imgs/FireSoul@2x.webp"

const MintFireSoul = (props) => {

    const MintFireSoul = styled.div`
      width: 100%;
      overflow: hidden;
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;

      .content-box {
        display: flex;
        padding: 2em 0;
      }

      .left-content {
        width: 50%;
        padding-right: 5%;

        .img-box {
          border-radius: 5%;
          box-shadow: 0px 0 10px 1px #d84a1b;
          padding: 2px;

          img {
            border-radius: 20px;
            width: 100%;
            margin: 0 auto;
          }
        }
      }

      .right {
        width: 50%;
        display: flex;
        max-width: 500px;
        .form { 
          margin-top: 3em;
          .balance{
            padding: 0 1em;
          }
          .subBtn {
            margin-top: 1em;
            padding: 0 3em;
          }
          .choose-id{
            display: flex;
            justify-content: space-between;
            padding: 0 1em;
          }
          .flex-box{
            position: relative;;
            align-items: flex-end;
            .ant-form-item{
              flex-grow: 1;
            }
            .go-btn{
              margin-bottom: 10px;
              margin-left: 10px;
            }
          }
          .tip{
            margin-top: 2em;
            font-size: 16px;
            font-family: PingFangSCSemibold-, PingFangSCSemibold,sans-serif;
            font-weight: normal;
            color: #AC8989;
            line-height: 25px;
          }
        }
      }

      .select-box {
        width: 300px;
        position: absolute;
        top: calc(100% - 10px);
        left: 10px;
        z-index: 3;
        .select-content {
          border: 1px solid #434343;
          padding: 3px 12px;
          color: #999;
          background: none;
        }

        .select-list {
          position: absolute;
          width: 100%;
          max-height: 300px;
          overflow: auto;
          z-index: 1;
        }

        .select-item {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 30px;
          border: 1px solid #434343;
          padding: 3px 12px;
          background: #000;

          &:nth-child(n+1) {
            border-top: none;
          }
        }
      }
    `
    const history = useNavigate();
    const [form] = Form.useForm();

    let {state, dispatch} = useConnect();
    const [fee, setFee] = useState(0.1)
    const [list, setList] = useState([])
    const [isFocusSelect, setFocusSelect] = useState(false)
    const [balance, setBalance] = useState([])
    const [chooseId, setId] = useState(undefined)
    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("MintFireSeed", state.api,)
        if (!contractTemp) {
            notification.error("Please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("mintFireSoul", state.api,)
        if (!contractTemp) {
            notification.error("Please connect")
        }
        dealMethod(contractTemp, state.account, name, params)
        // dealMethod(contractTemp, state.account, name, params,)
    }

    const goPath = (url) => {
        history(url);
    }
    const Mint = async () => {
        handleDealMethod("burnToMint", [chooseId])
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

    const focusSelect = () => {
        setFocusSelect(true)
    }
    const chooseSelect = (item) => {
        setFocusSelect(false)
        console.log(item)
        setId(item.label)
        setBalance(item.balance)
    }
    return (
        <MintFireSoul>
            <div className="panel-box ">
                <div className="panel-container">
                    <h2 className="panel-title">
                        Mint FireSoul
                    </h2>
                    <div className="content-box">
                        <div className="left-content">
                            <div className="img-box">
                                <img className="img" src={FireSoul} alt=""/>
                            </div>
                        </div>
                        <div className="right">
                            <Form form={form} name="control-hooks" className="form">
                                <div className="flex-box">

                                    <Form.Item
                                        name="pid"
                                        label="Your PID"
                                        validateTrigger="onBlur"
                                        validateFirst={true}

                                    >
                                        <InputNumber className="inputNumber"/>
                                    </Form.Item>
                                    <Button type="primary" className="go-btn" onClick={() => {
                                        goPath('/MintPassport')
                                    }}>
                                        Mint Passport
                                    </Button>
                                </div>

                                <div className="flex-box">
                                    <Form.Item
                                        label="Your FireSeedID:"
                                    >
                                        <div className="choose-id" onClick={focusSelect}>
                                            {chooseId}
                                            <div className="cur-amount">
                                                ×{balance}
                                            </div>
                                        </div>

                                    </Form.Item>
                                    <div className="select-box">
                                        {isFocusSelect && (
                                            <div className="select-list">
                                                {list.map(item => {
                                                    return (
                                                        <div onClick={() => {
                                                            chooseSelect(item)
                                                        }} className="select-item" value={item.value}>
                                                            <div>{item.label}</div>
                                                            <div>×{item.balance}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <Button type="primary" className="go-btn" onClick={() => {
                                        goPath('/MintFireSeed')
                                    }}>
                                        Mint FireSeed
                                    </Button>
                                </div>

                                <div className="tip">
                                    <p>
                                        1.FireSoul: ERC721, each user can only mint one, non-transferable, is the soul
                                        account
                                        of FireDAO official members, used to store various types of SBT and SBB.
                                        Generate a
                                        unique FID and FID-based on-chain reputation.
                                    </p>
                                    <p>
                                        2.You must have a FirePassport and burn a FireSeed to create a FireSoul account.
                                        If you
                                        don't have one, please mint a FirePassport and FireSeed first.
                                    </p>
                                </div>
                                <Form.Item className="button-box">
                                    <Button className="subBtn" htmlType="submit" type="primary"
                                            size="large"
                                            onClick={() => Mint()}>Mint</Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        </MintFireSoul>
    )
}
export default MintFireSoul
