import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../../api/contracts";
import {Card, Select, Button,InputNumber, Descriptions, message, Form, List, Input, notification, Switch, Radio} from 'antd';
import {getContractByName, getContractByContract} from "../../api/connectContract";
import {dealPayMethod,dealMethod, viewMethod} from "../../utils/contractUtil"
import {useNavigate} from "react-router-dom";
import FireSeed from "../../imgs/FireSeed@2x.webp"

const MintFireSeed = (props) => {
    const [form] = Form.useForm();

    const MintFireSeed = styled.div`
      width: 100%;
      overflow: hidden;
      flex-shrink: 0;
      flex-grow: 0;
      display: flex;
      .flex-box{
        padding:2em 0;
      }
      .left-content {
        width: 50%;
        padding-right: 5%;
        .img-box{
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
      .right{
        width: 50%;
        max-width: 500px;
        display: flex;
      }
      .form {
        margin-top: 3em;
        .mint-fee{
          padding: 0 1em;
        }
        .subBtn {
          padding: 0 3em;
          border-radius: 10px;
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
    `

    let {state, dispatch} = useConnect();
    const [contract, setContract] = useState(null)
    const [fee, setFee] = useState(0.1)
    const [feeStatus, setStatus] = useState(false)
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("MintFireSeed", state.api,)
        if (!contractTemp) {
            notification.error("Please connect")
        }
        if(feeStatus){
            dealPayMethod(contractTemp, state.account, name, params, state.api.utils.toWei(fee.toString()))
        }else{
            dealMethod(contractTemp, state.account, name, params,)
        }

    }

    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("MintFireSeed", state.api,)
        if (!contractTemp) {
            notification.error("Please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const onChooseAmount = (e) =>{
        const value = parseInt(e.target.value)
        setFee(0.1*value)
        if(value>=10){
            setFee(0.1 * 1000 * 0.9 * value / 1000)
        }
        if(value>=20){
            setFee(0.1 * 1000 * 0.8 * value / 1000)
        }
        if(value>=30){
            setFee(0.1 * 1000 * 0.7 * value / 1000)
        }
        if(value>=40){
            setFee(0.1 * 1000 * 0.6 * value / 1000)
        }
        if(value>=50){
            setFee(0.1 * 1000 * 0.5 * value / 1000)
        }
    }
    const Mint = async (item) => {
        // params _token
        if(!form.getFieldValue().mintAmount){
            form.getFieldValue().mintAmount = 1
        }
        if (form.getFieldValue().mintAmount < 1 || form.getFieldValue().mintAmount > 100) {
            notification.error("please input right mintAmount")
        }
        handleDealMethod("mintWithETH", [ form.getFieldValue().mintAmount])
    }
    const FeeStatus = async ()=>{
        let status = await  handleViewMethod("FeeStatus",[])
        setStatus(status)
    }
    useEffect(() => {
        FeeStatus()
    }, [state.account]);
    return (
        <MintFireSeed>
            <div className="panel-box">
                <div className="panel-container">
                    <h2 className="panel-title">
                        Create FireSeed
                    </h2>
                    <div className="flex-box">
                        <div className="left-content">
                            <div className="img-box">
                                <img className="img" src={FireSeed} alt=""/>
                            </div>
                        </div>
                        <div className="right">
                            <Form form={form} name="control-hooks" className="form">

                                <Form.Item
                                    name="mintAmount"
                                    label="Mint Amount "
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <InputNumber className="inputNumber" min={1} max={100} defaultValue={1}  onBlur={onChooseAmount}/>
                                </Form.Item>

                                <Form.Item
                                    label="Minting Fee"
                                >
                                    <div className="mint-fee">
                                        {fee}
                                    </div>
                                </Form.Item>
                                <div className="tip">
                                    <p>
                                        1.Every time you cast a FireSeed, you need todonate 0.1ETH.Ordinary users can cast up to 100pieces
                                        at a time and the official white list can castup to 1.000 pieces at a time:
                                    </p>
                                    <p>
                                        2.lt has a casting
                                        discount function, a single castingz10 pieces will get 10% off,z20 pieces will get 20%off, z30
                                        pieces will get 30% off, z40 pieces will get40% off.z50 pieces will get 50% off.
                                    </p>
                                </div>
                                <Form.Item className="button-box" >
                                    <Button className="subBtn" htmlType="submit" type="primary"
                                            size="large"
                                            onClick={() => Mint()}>Mint</Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        </MintFireSeed>
    )
}
export default MintFireSeed
