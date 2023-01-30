import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../../api/contracts";
import {Pagination, Button, Select, Descriptions, message, Form, List, Input, notification} from 'antd';
import {getContractByName, getContractByContract} from "../../api/connectContract";
import {dealMethod, viewMethod} from "../../utils/contractUtil"
import listIcon from "../../imgs/list-icon.webp"
import {SearchOutlined} from "@ant-design/icons";
import {getIpfs} from "../../utils/ipfsApi";
import {getPidList} from "../../graph/pidlist";

const PidList = (props) => {
    const [activeNav, setNav] = useState(1)
    const PidList = styled.div`
      .panel-container {

        .header-box {
          display: flex;
          width: 100%;
          align-items: center;

          .search-container {
            .search-box {
              display: flex;
              align-items: center;
              background: #3F3535;
              border-radius: 10px;
              border: 1px solid #333333;
              padding: 2px;

              .ant-select-selector {
                background: #1F1212;
                border-radius: 8px;
              }
            }
          }
        }
      }

      .nav-list-box {
        margin: 2em 0;
        display: flex;
        width: 100%;
      }

      .fire-list-box {
        .list-item, .list-header {
          justify-content: flex-start;
        }

        .col {
          text-align: left;

          &:nth-child(1) {
            min-width: 60px;
          }

          &:nth-child(2) {
            width: 8%;
            min-width: 60px;
          }

          &:nth-child(3) {
            width: 80px;
          }

          &:nth-child(4) {
            width: 110px;
          }

          &:nth-child(5) {
            width: 90px;
            padding-right: 5px;
          }

          &:nth-child(6) {
            width: 90px;
          }

          &:nth-child(7) {
            width: 80px;
            text-align: center;
          }

          &:nth-child(8) {
            width: 86px;
          }

          &:nth-child(9) {
            width: 80px;
            text-align: center;

          }

          &:nth-child(10) {
            width: 80px;
            text-align: center;
          }

          &:nth-child(11) {
            width: 80px;
          }
        }

        .list-item {
          .col {
            overflow: hidden;
            padding-left: 0.5%;
            //text-overflow: ellipsis;

          }

          .address {
            a {
              color: #FF9260;
            }
          }
        }
      }

      .pagination {
        text-align: center;
      }
    `
    let {state, dispatch} = useConnect();
    const [PIDARR, setPIDARR] = useState([])
    const [MYPIDARR, setMYPIDARR] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)
    const [searchData, setSearchData] = useState("")
    const [isShowSearch, setIsShowSearch] = useState(false)
    const openNotification = (message) => {
        notification.error({
            message: message,
            description:
                "",
            onClick: () => {
            },
        });
    };
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("MintFireSeed", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        dealMethod(contractTemp, state.account, name, params)
    }
    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("user", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleSeedViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("MintFireSeed", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleUserViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("user", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const Row = (item)=>{
        return <div className="list-item ">
            <div className="col id">
                {item.pid}
            </div>
            <div className="col">
                0
            </div>
            <div className="col">
                {item.username}
            </div>

            <div className="col address">
                <a href={"https://goerli.etherscan.io/address/" + item.account} target="_blank">
                    {item.account.substr(0, 6) + "..." + item.account.substr(item.account.length - 3, item.account.length)}
                </a>
            </div>
            <div className="col link">

                <a href={"https://twitter.com/" + (item.Twitter ? item.Twitter : "")}
                   target="_blank">
                    {item.Twitter ? item.Twitter : "——"}
                </a>
            </div>
            <div className="col link">
                <a href={"https://t.me/" + (item.telegram ? item.telegram : "")}
                   target="_blank">
                    {item.telegram ? item.telegram : "——"}
                </a>
            </div>

            <div className="col">
                <a href={"http://forumtest.firedao.co/index.php?action=profile;u=" + (item.PID ? item.PID : "0")}
                   target="_blank">
                    {item.PID}
                </a>
            </div>
            <div className="col">
                Only discuss
            </div>
            <div className="col">
                0
            </div>
            <div className="col">
                0
            </div>
            <div className="col">
                <Button type="primary">
                    View
                </Button>
            </div>
        </div>
    }
    const getData = async () => {
        let pidListRes = await getPidList()
        console.log(pidListRes)
        // const length = await handleUserViewMethod("getUserCount", [])
        // let arr = []
        // for (let i = 0; i < length; i++) {
        //     let user = await handleUserViewMethod("users", [i])
        //     arr.push({
        //         ...user
        //     })
        // }
        let arr =pidListRes.data.registers
        arr.sort((a, b) => {
            return b.pid - a.pid
        })
        setPIDARR(arr)
        let tempArr = [], myArr = []
        for (let i = 0; i < arr.length; i++) {
            let info = await getIpfs(arr[i].information)
            if (info) {
                tempArr.push({
                    ...arr[i],
                    ...info
                })
            } else {
                tempArr.push({
                    ...arr[i],
                })
            }
            if (arr[i].account.toLowerCase() == state.account.toLowerCase()) {
                if (info) {
                    myArr.push({
                        ...arr[i],
                        ...info
                    })
                } else {
                    myArr.push({
                        ...arr[i],
                    })
                }
            }

        }
        setPIDARR(tempArr)
        setMYPIDARR(myArr)
    }
    const handleSearchChange = async (e) => {
        console.log(e)

    }
    const onChangePage = async (page, count) => {
        setCurPage(page)
        setPageCount(count)
    }
    const handleSearch = async () => {
        setIsShowSearch(!isShowSearch)
    }
    useEffect(() => {
        getData()
    }, [state.account]);


    return (
        <PidList>
            <div className="panel-box">
                <div className="panel-container">
                    <div className="panel-title">
                        PID List
                    </div>
                    <div className="header-box">
                        <div className="nav-list-box">
                            <div className="nav-list">
                                <div className={"nav-item " + (activeNav == 1 ? "active" : "")} onClick={() => {
                                    setNav(1)
                                }}>
                                    All PID
                                </div>
                                <div className={"nav-item " + (activeNav == 2 ? "active" : "")} onClick={() => {
                                    setNav(2)
                                }}>
                                    My PID
                                </div>
                            </div>
                        </div>
                        <div className="search-container">
                            <div className="search-box">
                                <Select
                                    defaultValue="PID"
                                    style={{width: 120}}
                                    onChange={handleSearchChange}
                                    options={[
                                        {
                                            value: '1',
                                            label: 'PID',
                                        },
                                        {
                                            value: '2',
                                            label: 'FID',
                                        },

                                    ]}
                                />
                                <Input allowClear  onBlur={(e) => {
                                    setSearchData(e.target.value)
                                }}/>
                                <Button className="search-btn" onClick={handleSearch} type="primary">
                                    <SearchOutlined/>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="fire-list-box">
                        <div className="list-header flex-box">
                            <div className="col">
                                PID
                                <img src={listIcon} alt="" className="list-icon"/>
                            </div>
                            <div className="col">
                                FID
                                <img src={listIcon} alt="" className="list-icon"/>
                            </div>
                            <div className="col">
                                Username
                            </div>
                            <div className="col">
                                Address
                            </div>
                            <div className="col">
                                Twitter
                            </div>
                            <div className="col">
                                Telegram
                            </div>
                            <div className="col">
                                Forum ID
                            </div>
                            <div className="col">
                                Position
                            </div>
                            <div className="col">
                                Posts
                                <img src={listIcon} alt="" className="list-icon"/>
                            </div>
                            <div className="col">
                                Merits
                                <img src={listIcon} alt="" className="list-icon"/>
                            </div>
                            <div className="col">
                                More
                            </div>
                        </div>
                        {
                            !searchData && activeNav == 1 && PIDARR.map((item, index) => (
                                index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                Row(item)
                            ))
                        }
                        {
                            activeNav == 2 && MYPIDARR.map((item, index) => (
                                index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                Row(item)
                            ))
                        }
                        {
                            searchData&&PIDARR.map((item, index) => (
                                item.pid.toString() == searchData.toString() && Row(item)
                            ))
                        }
                    </div>
                    <div className="pagination">
                        <Pagination current={curPage} showSizeChanger onChange={onChangePage} total={PIDARR.length}
                                    defaultPageSize={20}/>
                    </div>
                </div>
            </div>
        </PidList>
    )
}
export default PidList
