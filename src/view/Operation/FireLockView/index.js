import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../../../api/contracts";
import {Pagination, Button, Select, Descriptions, message, Form, List, Input, notification} from 'antd';
import {getContractByName, getContractByContract} from "../../../api/connectContract";
import {dealMethod, viewMethod} from "../../../utils/contractUtil"
import develop from "../../../env"
import {useNavigate, useLocation} from "react-router-dom";
import FireLockStyle from "./style";
import judgeStatus from "../../../utils/judgeStatus";
import {dealTime} from "../../../utils/timeUtil";
import ChangeReceiver from "../component/ChangeReceiver"
import FireLockClaim from "../component/FireLockClaim";
import {handleCopy} from "../../../utils/copyUtil";
import {numToDecimal2} from "../../../utils/publicJs"
import {FireLockDecimal} from "../../../utils/constants";

const FireLock = (props) => {
    let {state, dispatch} = useConnect();
    const [recordArr, setRecordArr] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)
    const [searchData, setSearchData] = useState("")
    const [coinInfo, setCoinInfo] = useState({})
    const [cliffDeadStr, setDeadStr] = useState("")
    const [nextUnlockDeadStr, setNextDeadStr] = useState("")

    const [total, setTotal] = useState(0)
    const [memberArr, setMemberArr] = useState([])
    const [lockInfo, setLockInfo] = useState({})
    const [isShowChange, setShowChange] = useState(false)
    const [isShowWithdraw, setShowWithdraw] = useState(false)
    const [curRec, setCurRec] = useState("")
    const [canWithdrawAmount, setCanW] = useState(0)
    const [curRecId, setCurRecId] = useState(0)
    const [curCanW, setCurCanW] = useState(0)
    const history = useNavigate();
    const location = useLocation()
    const [lockAddress, setLockAddress] = useState(location.state)

    const openNotification = (message) => {
        notification.error({
            message: message,
            description:
                "",
            onClick: () => {
            },
        });
    };
    const handleDealMethod = async (name, address, params) => {
        let contractTemp = await getContractByContract("fireLock", address, state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        dealMethod(contractTemp, state.account, name, params)
    }


    const handleViewMethod = async (name, address, params) => {
        let contractTemp = await getContractByContract("fireLock", address, state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }


    const getRecord = async () => {
        let length = await handleViewMethod("getRecordLength", lockAddress, [])
        let arr = []
        for (let i = 0; i < length; i++) {
            const item = await handleViewMethod("record", lockAddress, [i])
            arr.push(item)
        }
        setRecordArr(arr)
    }
    const getClaimNum = async (address) => {
        return await handleViewMethod("claimed", lockAddress, [address])
    }
    const getCanClaim = async (id) => {
        return handleViewMethod("isClaim", lockAddress, [id])
    }
    const getData = async (page) => {
        let info = await handleViewMethod("adminLockDetail", lockAddress, [])

        let memberArr = []
        let member = await handleViewMethod("getMember", lockAddress, [])
        let rate = await handleViewMethod("getMemberRate", lockAddress, [])
        for (let i = 0; i < member.length; i++) {
            memberArr.push({
                address: member[i],
                rate: rate[i]
            })
        }
        await setMemberArr(memberArr)
        getTokenInfo(info.token)
        const startTime = info.cliffPeriod * 1000
        const now = new Date().getTime()
        const amount = info.amount / FireLockDecimal
        let unLockRound = 0
        if (now > startTime) {
            let roundTime = now - startTime
            unLockRound = parseInt(roundTime / (info.unlockCycle * 86400000))
        }
        setLockInfo(info)
        console.log(info)
        let canW = 0
        memberArr.forEach(async (member, index) => {

            member.total = numToDecimal2(member.rate * amount / 100)
            member.unlocked = numToDecimal2(amount * unLockRound / info.unlockRound * member.rate / 100)
            member.locked = numToDecimal2(amount * member.rate / 100 - amount * unLockRound / info.unlockRound * member.rate / 100)
            member.withdraw = (dealNum(await getClaimNum(member.address) / FireLockDecimal))
            canW += member.withdraw
            member.canWithdraw = numToDecimal2(member.unlocked - member.withdraw)
            // member.canWithdraw = dealNum(await getCanClaim(index)/FireLockDecimal)
            if (state.account == member.address) {
                setCanW(numToDecimal2(amount * member.rate * unLockRound / info.unlockRound / 100 - member.withdraw))
            }
        })
        setCanW(canW)
        setMemberArr(memberArr)

        getRecord()
    }

    const dealNum = (num) => {
        return parseInt(num * 100) / 100
    }
    const getTokenInfo = async (value) => {
        let contractTemp = await getContractByContract("erc20", value.toString().trim(), state.api,)
        const decimal = await viewMethod(contractTemp, state.account, "decimals", [])
        const name = await viewMethod(contractTemp, state.account, "name", [])
        const symbol = await viewMethod(contractTemp, state.account, "symbol", [])
        const totalSupply = await viewMethod(contractTemp, state.account, "totalSupply", [])
        let balance = await viewMethod(contractTemp, state.account, "balanceOf", [state.account])
        balance = balance / (10 ** parseInt(decimal))
        balance = parseInt(balance * 100) / 100
        setCoinInfo({
            address: value,
            name,
            symbol,
            decimal,
            totalSupply: totalSupply / (10 ** parseInt(decimal)),
            balance
        })
    }
    const getDeadlineToCli = () => {
        if (lockInfo.amount) {
            let deadTime = ""
            const startTime = lockInfo.cliffPeriod * 1000
            const now = new Date().getTime()
            if (now < startTime) {
                deadTime = (startTime - now) / 1000
            } else {
                setDeadStr(undefined)
                return
            }

            const hour = parseInt(deadTime / 3600)
            deadTime = deadTime % 3600
            const min = parseInt(deadTime / 60)
            const sec = parseInt(deadTime % 60)
            const deadStr = hour + ":" + (min > 10 ? min : 0 + min) + ":" + (sec > 10 ? sec : 0 + sec)
            setDeadStr(deadStr)
        }
    }
    const getDeadlineToNext = () => {
        if (lockInfo.amount) {
            let deadTime = "", unLockRound = 0
            const startTime = lockInfo.cliffPeriod * 1000
            const now = new Date().getTime()
            if (now > startTime) {
                let deadTime = now - startTime
                unLockRound = parseInt(deadTime / (lockInfo.unlockCycle * 86400000))
            }
            if (unLockRound >= lockInfo.unlockRound) {
                setNextDeadStr(undefined)
                return
            }
            deadTime = (startTime + ((unLockRound+1)*86400000)  - now) / 1000
            deadTime = deadTime % 86400
            const hour = parseInt(deadTime / 3600)
            deadTime = deadTime % 3600
            const min = parseInt(deadTime / 60) > 10 ? parseInt(deadTime / 60) : "0" + parseInt(deadTime / 60)
            const sec = parseInt(deadTime % 60) > 10 ? parseInt(deadTime % 60) : "0" + parseInt(deadTime % 60)

            const deadStr = hour + ":" + min + ":" + sec
            console.log(deadStr)
            setNextDeadStr(deadStr)
        }
    }
    useEffect(() => {

        const timer = window.setInterval(() => {
            getDeadlineToCli()
            getDeadlineToNext()
        }, 1000);
        return () => {
            clearInterval(timer);
        };


    }, [])
    useEffect(async () => {
        let judgeRes = await judgeStatus(state)
        if (!judgeRes) {
            return
        }
        getData()

    }, [state.account]);

    return (
        <FireLockStyle>
            {
                isShowChange &&
                <ChangeReceiver address={lockAddress} id={curRecId} updateData={() => {
                    getData()
                }} closeDialog={() => {
                    setShowChange(false)
                }} curRec={curRec}/>
            }
            {
                isShowWithdraw &&
                <FireLockClaim address={lockAddress} canW={curCanW} updateData={() => {
                    getData()
                }} closeDialog={() => {
                    setShowWithdraw(false)
                }} curRec={curRec}/>
            }
            <h1 className="title">
                Lock Contract Info
            </h1>
            {lockInfo.admin != "0x0000000000000000000000000000000000000000"
            && <div className="contract-address">
                <div className="name">Contract Owner</div>
                <div className="value">
                    {lockInfo.admin}
                    <svg t="1680938753413" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="3578" width="20" height="20">
                        <path
                            d="M109.696 310.848v603.456h603.456V310.848H109.696zM76.16 243.84h670.528a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064V947.84a32.64 32.64 0 0 1-9.408 24.064 32.64 32.64 0 0 1-24.064 9.408H76.16a32.64 32.64 0 0 1-24.064-9.408 32.64 32.64 0 0 1-9.408-24.064V277.312a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.064-9.408z m905.152-167.68v737.536a32.64 32.64 0 0 1-9.408 24.128 32.64 32.64 0 0 1-24.064 9.408h-100.608V780.16h67.072V109.696H377.92v67.072H310.848V76.16a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.128-9.408h603.456a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064zM243.84 679.68h335.232v67.072H243.84v-67.072z m0-201.152h335.232v67.072H243.84V478.464z"
                            fill="#ffffff" p-id="3579"></path>
                    </svg>
                </div>

            </div>
            }
            <div className="panel-box">

                <div className="panel-container">
                    <div className="panel-title">
                        FireLock Information
                    </div>
                    <div className="sub-title">
                        Lock Contract Info
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Lock Contract Address
                        </div>
                        <div className="value">
                            {lockAddress}

                            <svg onClick={() => {
                                handleCopy(lockAddress)
                            }} t="1680938753413" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="3578" width="20" height="20">
                                <path
                                    d="M109.696 310.848v603.456h603.456V310.848H109.696zM76.16 243.84h670.528a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064V947.84a32.64 32.64 0 0 1-9.408 24.064 32.64 32.64 0 0 1-24.064 9.408H76.16a32.64 32.64 0 0 1-24.064-9.408 32.64 32.64 0 0 1-9.408-24.064V277.312a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.064-9.408z m905.152-167.68v737.536a32.64 32.64 0 0 1-9.408 24.128 32.64 32.64 0 0 1-24.064 9.408h-100.608V780.16h67.072V109.696H377.92v67.072H310.848V76.16a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.128-9.408h603.456a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064zM243.84 679.68h335.232v67.072H243.84v-67.072z m0-201.152h335.232v67.072H243.84V478.464z"
                                    fill="#ffffff" p-id="3579"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Creator Address
                        </div>
                        <div className="value">
                            {lockInfo ? lockInfo.admin : ""}
                            <svg onClick={() => {
                                handleCopy(lockInfo.admin)
                            }} t="1680938753413" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="3578" width="20" height="20">
                                <path
                                    d="M109.696 310.848v603.456h603.456V310.848H109.696zM76.16 243.84h670.528a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064V947.84a32.64 32.64 0 0 1-9.408 24.064 32.64 32.64 0 0 1-24.064 9.408H76.16a32.64 32.64 0 0 1-24.064-9.408 32.64 32.64 0 0 1-9.408-24.064V277.312a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.064-9.408z m905.152-167.68v737.536a32.64 32.64 0 0 1-9.408 24.128 32.64 32.64 0 0 1-24.064 9.408h-100.608V780.16h67.072V109.696H377.92v67.072H310.848V76.16a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.128-9.408h603.456a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064zM243.84 679.68h335.232v67.072H243.84v-67.072z m0-201.152h335.232v67.072H243.84V478.464z"
                                    fill="#ffffff" p-id="3579"></path>
                            </svg>
                        </div>
                    </div>
                    {/*<div className="info-row">*/}
                    {/*    <div className="name">*/}
                    {/*        Transaction Hash*/}
                    {/*    </div>*/}
                    {/*    <div className="value">*/}
                    {/*        0x4428648f8c61bc1d72c3486126DE20e755765fF7*/}
                    {/*        <svg t="1680938753413" className="icon" viewBox="0 0 1024 1024" version="1.1"*/}
                    {/*             xmlns="http://www.w3.org/2000/svg" p-id="3578" width="20" height="20">*/}
                    {/*            <path*/}
                    {/*                d="M109.696 310.848v603.456h603.456V310.848H109.696zM76.16 243.84h670.528a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064V947.84a32.64 32.64 0 0 1-9.408 24.064 32.64 32.64 0 0 1-24.064 9.408H76.16a32.64 32.64 0 0 1-24.064-9.408 32.64 32.64 0 0 1-9.408-24.064V277.312a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.064-9.408z m905.152-167.68v737.536a32.64 32.64 0 0 1-9.408 24.128 32.64 32.64 0 0 1-24.064 9.408h-100.608V780.16h67.072V109.696H377.92v67.072H310.848V76.16a32.64 32.64 0 0 1 9.408-24.064 32.64 32.64 0 0 1 24.128-9.408h603.456a32.64 32.64 0 0 1 24.064 9.408 32.64 32.64 0 0 1 9.408 24.064zM243.84 679.68h335.232v67.072H243.84v-67.072z m0-201.152h335.232v67.072H243.84V478.464z"*/}
                    {/*                fill="#ffffff" p-id="3579"></path>*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="sub-title">
                        Lock Token Info
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Token Address
                        </div>
                        <div className="value">
                            {coinInfo.address}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Token Name
                        </div>
                        <div className="value">
                            {coinInfo.name}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Token Symbol
                        </div>
                        <div className="value">
                            {coinInfo.symbol}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Token Decimals
                        </div>
                        <div className="value">
                            {coinInfo.decimal}
                        </div>
                    </div>


                    <div className="sub-title">
                        Amount
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Total Lock Amounts
                        </div>
                        <div className="value">
                            {numToDecimal2(lockInfo.amount / FireLockDecimal)}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Unlocked Amounts
                        </div>
                        <div className="value">
                            {canWithdrawAmount}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Lock Amounts
                        </div>
                        <div className="value">
                            {numToDecimal2(lockInfo.amount / FireLockDecimal)}
                        </div>
                    </div>
                    <div className="sub-title">
                        Lock Parameters
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Cliff Period
                        </div>
                        <div className="value">
                            {dealTime(lockInfo.cliffPeriod)}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Unlock Period
                        </div>
                        <div className="value">
                            {lockInfo.unlockCycle}
                            <span>Days</span>
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="name">
                            Unlock Round
                        </div>
                        <div className="value">
                            {lockInfo.unlockRound}
                        </div>
                    </div>
                    {cliffDeadStr && <div className="info-row">
                        <div className="name">
                            Deadline to Cliff Period
                        </div>
                        <div className="value">
                            {cliffDeadStr}
                        </div>
                    </div>}
                    {nextUnlockDeadStr && <div className="info-row">
                        <div className="name">
                            Deadline to Next Unlock
                        </div>
                        <div className="value">
                            {nextUnlockDeadStr}
                        </div>
                    </div>}
                </div>

            </div>
            <div className="panel-box">
                <div className="panel-container">
                    <div className="panel-title">
                        Allocation
                    </div>
                    <div className="fire-list-box">
                        <div className="list-header flex-box">
                            <div className="col">
                                No.
                            </div>
                            <div className="col">
                                Address
                            </div>
                            <div className="col">
                                Ratio
                            </div>
                            <div className="col">
                                Total
                            </div>
                            <div className="col">
                                Unlocked
                            </div>
                            <div className="col">
                                Withdrawn
                            </div>
                            <div className="col">
                                Withdraw pending
                            </div>
                            <div className="col">
                                Lock
                            </div>
                            <div className="col">
                                Operate
                            </div>


                        </div>

                        {
                            memberArr.map((item, index) => (
                                <div className="row list-item">
                                    <div className="col">
                                        {index + 1}
                                    </div>
                                    <div className="col">
                                        {item.address.substr(0, 6) + "..." + item.address.substr(item.address.length - 3, item.address.length)}

                                    </div>
                                    <div className="col">
                                        {item.rate}
                                    </div>
                                    <div className="col">
                                        {item.total}
                                    </div>
                                    <div className="col">
                                        {item.unlocked}
                                    </div>
                                    <div className="col">
                                        {item.withdraw}
                                    </div>
                                    <div className="col">
                                        {item.canWithdraw}
                                    </div>
                                    <div className="col">
                                        {item.locked}
                                    </div>
                                    <div className="col">
                                        {state.account && lockInfo.admin &&
                                        (state.account.toString().toLowerCase() == lockInfo.admin.toString().toLowerCase())
                                        && <Button className="operate-btn" type="primary" onClick={() => {
                                            setShowChange(true)
                                            setCurRec(item.address)
                                            setCurRecId(index)
                                        }}>Change</Button>}
                                        {state.account && lockInfo.admin &&
                                        (state.account.toString().toLowerCase() == item.address.toString().toLowerCase()) &&
                                        item.canWithdraw > 0 &&
                                        <Button type="primary" className="operate-btn" onClick={() => {
                                            setCurCanW(item.canWithdraw)
                                            setShowWithdraw(true)
                                        }}>Withdraw</Button>
                                        }
                                        {state.account && lockInfo.admin &&
                                        ((state.account.toString().toLowerCase() != item.address.toString().toLowerCase()) ||
                                            item.canWithdraw <= 0) &&
                                        <Button disabled={true} className="operate-btn">Withdraw</Button>
                                        }
                                    </div>
                                </div>

                            ))
                        }

                    </div>

                </div>
            </div>
            <div className="panel-box">
                <div className="panel-container">
                    <div className="panel-title">
                        Withdraw Records
                    </div>
                    <div className="fire-list-box">
                        <div className="list-header flex-box">
                            <div className="col">
                                No.
                            </div>
                            <div className="col">
                                Address
                            </div>
                            <div className="col">
                                Amounts
                            </div>
                            <div className="col">
                                Time(UTC)
                            </div>
                        </div>

                        {
                            recordArr.map((item, index) => (
                                index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                <div className="row list-item">
                                    <div className="col">
                                        {index + 1}
                                    </div>
                                    <div className="col">
                                        {item.user ? item.user.substr(0, 6) + "..." + item.user.substr(item.user.length - 3, item.user.length) : ""}

                                    </div>
                                    <div className="col">
                                        {numToDecimal2((item.amount / FireLockDecimal))}
                                    </div>
                                    <div className="col">
                                        {dealTime(item.time)}
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    {/*<div className="pagination">*/}
                    {/*    {*/}
                    {/*        <Pagination current={curPage} showSizeChanger onShowSizeChange={handleShowSizeChange}*/}
                    {/*                    onChange={onChangePage} total={total}*/}
                    {/*                    defaultPageSize={pageCount}/>*/}
                    {/*    }*/}
                    {/*</div>*/}
                </div>
            </div>

        </FireLockStyle>
    )
}
export default FireLock
