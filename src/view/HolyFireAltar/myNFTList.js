import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../../api/contracts";
import {Card, Button, Descriptions, message, Form, List, Input, notification} from 'antd';
import {SendOutlined, TwitterOutlined, UserOutlined} from "@ant-design/icons";
import {getContractByName, getContractByContract} from "../../api/connectContract";
import {dealMethod, viewMethod} from "../../utils/contractUtil"
import {useNavigate} from "react-router-dom";
import fireseed from "../../imgs/FireSeed@2x.png"

const LockList = (props) => {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const LockList = styled.div`
      width: 100%;

      .card {
        width: 100%;
      }


      .input {
        width: 16em;
      }

      .nav-list-box {
        margin: 2em 0;
        display: flex;
      }

      .nav-list {

        display: flex;
        background: #3F3535;
        border-radius: 10px;
        border: 1px solid #333333;
        padding: 3px;

        .nav-item {
          cursor: pointer;
          padding: 10px 30px;
          border-radius: 10px;
          margin-right: 10px;
          font-size: 16px;
          font-weight: bold;

          &.active {
            background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
            box-shadow: 0px 3px 6px 0px rgba(128, 4, 149, 0.3);
          }

          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .list-item {
          cursor: pointer;
          padding: 10px;
          margin-top: 2em;
          margin-right: 2.5%;
          background: #3F3535;
          border-radius: 10px;
          border: 1px solid #7F6868;
          width: 23%;
          &:nth-child(4n){
            margin-right: 0;
          }
          .img {
            width: 100%;
          }

          .item-info {
            margin-top: 1em;
            display: flex;
            justify-content: space-between;

            .id {
              font-size: 16px;
              font-family: Helvetica-Bold, Helvetica;
              font-weight: bold;
              color: #FFFFFF;
              line-height: 19px;
            }

            .number-box {
              background: rgba(#DD3642, 0.5);

              .number {
                text-align: center;
                width: 60px;
                height: 24px;
                box-shadow: 0px 3px 6px 0px rgba(128, 4, 149, 0.3);
                border-radius: 10px;
                border: 1px solid;
                border-image: linear-gradient(316deg, rgba(221, 54, 66, 1), rgba(255, 192, 44, 1)) 1 1;
              }
            }

          }
        }
      }

      .content2 {
        width: 60%;
        margin: 2em auto;

        .box-title {
          margin-top: 2em;
          color: #999;
          font-weight: bold;
        }

        .flex-box {
          margin-top: 1em;
          justify-content: space-between;

          .value {
            flex: 1;
          }

          .name {
            width: 10em;
            line-height: 40px;
          }
        }

        .value {
          height: 40px;
          background: #3F3535;
          border-radius: 10px;
          border: 1px solid #342727;
          line-height: 40px;
          padding: 0 20px;
        }
       
      }
      .content2-part2{
        .list-box{
          margin: 2em 0 1em;
          .col{
            &:nth-child(1){
              width: 5%;
            }
            &:nth-child(2){
              width: 5%;
            }
            &:nth-child(3){
              width: 30%;
            }
            &:nth-child(4){
              width: 30%;
            }
          }
          .list-header{
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: bold;
            padding: 0.5em 1em;
          }
          .list-item{
            padding: 0.5em 1em;
            display: flex;
            justify-content: space-between;
            background: #3F3535;
            border-radius: 10px;
            margin: 0.5em 0;
          }
        }
      }
    `
    let {state, dispatch} = useConnect();

    const [list, setList] = useState([])
    const [curId, setID] = useState([])
    const [logArr, setLogArr] = useState([])
    const [level2Arr, setLevel2Arr] = useState([])
    const [level3Arr, setLevel3Arr] = useState([])
    const [myClassAddress, setMyClass] = useState("")
    const [total, setTotal] = useState(0)
    const [level1, setLevel1] = useState(0)
    const [level2, setLevel2] = useState(0)
    const [level3, setLevel3] = useState(0)
    const [activeNav, setNav] = useState(1)
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
        const recommenderLength = await handleViewMethod("recommenderNumber", [state.account])
        let recommenderInfoArr = [], total = 0, level2TotalLength = 0, level3TotalLength = 0
        total = parseInt(recommenderLength)
        for (let i = 0; i < recommenderLength; i++) {
            const level1Address = await handleViewMethod("recommenderInfo", [state.account, i])
            recommenderInfoArr.push(level1Address)
            const level2Length = await handleViewMethod("recommenderNumber", [level1Address])
            console.log("level2Length" + level2Length)
            total += parseInt(level2Length)
            level2TotalLength += parseInt(level2Length)
            for (let j = 0; j < level2Length; j++) {
                const level2Address = await handleViewMethod("recommenderInfo", [level1Address, i])
                const level3Length = await handleViewMethod("recommenderNumber", [level2Address])
                level3TotalLength += parseInt(level3Length)
                total += parseInt(level3Length)

            }
        }
        console.log(recommenderLength, recommenderInfoArr, address)
        setMyClass(address)
        setLevel1(recommenderInfoArr)
        setLevel2(level2TotalLength)
        setLevel3(level3TotalLength)
        setTotal(total)
    }

    const ownerNFT = async () => {
        const listLength = await handleViewMethod("getOwnerIdlength", [])
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
        setList(list)
    }

    const transfer = async () => {
        const {toAddress, amount} = form.getFieldValue()
        // params _token
        handleDealMethod("safeTransferFrom", [state.account, toAddress, curId, amount, "0x00"])
    }
    const check = async () => {

    }
    let logs =[]
    const getLevel2 = async(address)=>{

        console.log(address)
        let arr=[]
        for (let i = 0; i < logs.length; i++) {
            try {
                let address1=state.api.eth.abi.decodeParameter("address",logs[i].topics[1])
                let address2 = state.api.eth.abi.decodeParameter("address",logs[i].topics[2])
                let address3 =state.api.eth.abi.decodeParameter("address",logs[i].topics[3])
                console.log(address1,address2,address3)
                if(address1.toString().toLowerCase()==address2.toString().toLowerCase()&&address2.toString().toLowerCase()==address.toLowerCase()){
                    arr.push({
                        blockNumber:logs[i].blockNumber,
                        from:address2,
                        to:address3
                    })
                    getLevel3(address3)
                }

            } catch (e) {
            }
        }
        setLevel2Arr(arr)
    }
    const getLevel3 = async(address)=>{
        let arr=[]
        for (let i = 0; i < logs.length; i++) {
            try {
                let address1=state.api.eth.abi.decodeParameter("address",logs[i].topics[1])
                let address2 = state.api.eth.abi.decodeParameter("address",logs[i].topics[2])
                let address3 =state.api.eth.abi.decodeParameter("address",logs[i].topics[3])
                console.log(address1,address2,address3)
                if(address1.toString().toLowerCase()==address2.toString().toLowerCase()&&address2.toString().toLowerCase()==address.toLowerCase()){
                    arr.push({
                        blockNumber:logs[i].blockNumber,
                        from:address2,
                        to:address3
                    })
                }

            } catch (e) {
            }
        }
        setLevel3Arr(arr)
    }
    const getTransfer = async () => {
        logs= await state.api.eth.getPastLogs({
            fromBlock:  0 , toBlock: "pending",
            address: "0xc06c0d7f3d85064cdbc185cf76ccaeea8af90f59",
            topics: ["0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62"]
        })
        console.log(logs)
        let arr=[]
        for (let i = 0; i < logs.length; i++) {
            try {
                let address1=state.api.eth.abi.decodeParameter("address",logs[i].topics[1])
                let address2 = state.api.eth.abi.decodeParameter("address",logs[i].topics[2])
                let address3 =state.api.eth.abi.decodeParameter("address",logs[i].topics[3])
                console.log(address1,address2,address3)
                if(address1.toString().toLowerCase()==address2.toString().toLowerCase()&&address2.toString().toLowerCase()==state.account.toLowerCase()){
                    arr.push({
                        blockNumber:logs[i].blockNumber,
                        from:address2,
                        to:address3
                    })
                    getLevel2(address3)
                }

            } catch (e) {
            }
        }
        setLogArr(arr)
    }
    useEffect(() => {
        ownerNFT()
        myClass()
        getTransfer()
    }, [state.account]);
    return (
        <LockList>
            <div>
                <div className="panel-box">
                    <div className="panel-title">
                        Pass FireSeed
                    </div>
                    <div className="nav-list-box">
                        <div className="nav-list">
                            <div className={"nav-item " + (activeNav == 1 ? "active" : "")} onClick={() => {
                                setNav(1)
                            }}>
                                My FireSeed
                            </div>
                            <div className={"nav-item " + (activeNav == 2 ? "active" : "")} onClick={() => {
                                setNav(2)
                            }}>
                                My FireList
                            </div>
                        </div>
                    </div>

                    {
                        activeNav == 1 && (
                            <div className="content1">

                                <div className="list">
                                    {
                                        list.map(item => (
                                            <div className="list-item" onClick={() => {
                                                setID(item.id)
                                            }}>
                                                <img className="img" src={fireseed} alt=""/>
                                                <div className="item-info">
                                                    <div className="id">
                                                        FireSeed # {item.id}
                                                    </div>
                                                    <div className="number-box">
                                                        <div className="number">
                                                            ×{item.balance}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        activeNav == 2 && (
                            <div className="content2">
                                <div className="box-title">
                                    My Recommender:
                                </div>
                                <div className="value">
                                    {myClassAddress}
                                </div>
                                <div className="box-title">
                                    My Team Size:
                                </div>
                                <div className="flex-box">
                                    <div className="name">
                                        Level 1:
                                    </div>
                                    <div className="value">
                                        {level1.length}
                                    </div>
                                </div>
                                <div className="flex-box">
                                    <div className="name">
                                        Level 2:
                                    </div>
                                    <div className="value">
                                        {level2}
                                    </div>
                                </div>
                                <div className="flex-box">
                                    <div className="name">
                                        Level 3:
                                    </div>
                                    <div className="value">
                                        {level3}
                                    </div>
                                </div>
                                <div className="flex-box">
                                    <div className="name">
                                        Total:
                                    </div>
                                    <div className="value">
                                        {total}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                {
                    activeNav == 1 && (
                        <div className="panel-box">
                            <Descriptions.Item label="transfer">
                                <Form form={form}>
                                    <Form.Item
                                        name="FireSeed ID:"
                                        label="FireSeed ID:"

                                    >
                                        {curId}
                                    </Form.Item>
                                    <Form.Item
                                        name="toAddress"
                                        label="Transfer Address"
                                        validateTrigger="onBlur"
                                        validateFirst={true}
                                        rules={[
                                            {required: true, message: 'Please input Title!'},
                                        ]}
                                    >
                                        <div className="flex-box">
                                            <Input/>
                                            <Button type="primary" htmlType="submit" onClick={() => {
                                                check()
                                            }}>
                                                Check
                                            </Button>
                                        </div>
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
                                        <div className="flex-box">
                                            <Input/>

                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" onClick={() => {
                                            transfer()
                                        }}>
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Descriptions.Item>
                        </div>
                    )
                }
                {
                    activeNav == 2 && (
                        <div className="panel-box content2-part2">
                            <div className="panel-title">
                                Pass FireSeed
                            </div>
                            <div className="list-box">
                                <div className="list-header flex-box">
                                    <div className="col">
                                        Level
                                    </div>
                                    <div className="col">
                                        blockNumber
                                    </div>
                                    <div className="col">
                                        From
                                    </div>
                                    <div className="col">
                                        To
                                    </div>
                                </div>
                                {
                                    logArr.map(item=>(
                                        <div className="list-item ">
                                            <div className="col">
                                                1
                                            </div>
                                            <div className="col">
                                                {item.blockNumber}
                                            </div>
                                            <div className="col">
                                                {item.from}
                                            </div>
                                            <div className="col">
                                                {item.to}
                                            </div>
                                        </div>
                                    ))

                                }
                                {
                                    level2Arr.map(item=>(
                                        <div className="list-item ">
                                            <div className="col">
                                                2
                                            </div>
                                            <div className="col">
                                                {item.blockNumber}
                                            </div>
                                            <div className="col">
                                                {item.from}
                                            </div>
                                            <div className="col">
                                                {item.to}
                                            </div>
                                        </div>
                                    ))

                                }
                                {
                                    level3Arr.map(item=>(
                                        <div className="list-item ">
                                            <div className="col">
                                                3
                                            </div>
                                            <div className="col">
                                                {item.blockNumber}
                                            </div>
                                            <div className="col">
                                                {item.from}
                                            </div>
                                            <div className="col">
                                                {item.to}
                                            </div>
                                        </div>
                                    ))

                                }
                            </div>
                        </div>

                    )
                }

            </div>

        </LockList>
    )
}
export default LockList
