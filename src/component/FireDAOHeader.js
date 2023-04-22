import styled from "styled-components";
import {useConnect, connect} from "../api/contracts";
import ConnectWallet from "./ConnectWallet";
import {useEffect, useState} from "react";
import {Button,Select} from 'antd';
import passportIcon from "../imgs/passportIcon.webp"
import {useNavigate} from "react-router-dom";

const FireDAOHeader = () => {
    const FireDAOHeaderBox = styled.div`
      .firedao-header {
        position: fixed;
        top: 0;
        z-index: 1;
        width: calc(100% - 256px);
        background: #150D0D;
        padding: 1em 3em;
        display: flex;
        justify-content: space-between;

        .nav-list {
          display: flex;
          flex-grow: 1;
          justify-content: flex-end;
          padding: 0 3em;
          align-items: center;

          .nav-item {
            margin-left: 2em;
            cursor: pointer;
          }
        }
        
      }

      .passport-icon {
        margin-right: 1em;
        padding: 4px 10px;

        img {
          width: 20px;
        }
      }
      .select-chain{
        margin-right: 1em;
      }
    `
    let {state, dispatch} = useConnect();
    const history = useNavigate();
    const [chain, setChain] = useState("Goerli")
    const goPage = (url) => {
        history(url);
    }
    const handleChange = (chain)=>{
         window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: "0x"+chain}],
        });
    }
    useEffect(async () => {
        if (!window.ethereum) {
            return false;
        }
        const request = (window.ethereum).request;
        let chainId = await request({method: "eth_chainId"})
        if(chainId){
            chainId = chainId.substr(chainId.indexOf("x",chainId.length))
        }
        if(chainId!="5"){
            setChain("Unsupported")
        }
        window.ethereum.on('chainChanged', (netWarkId) => {
            if(netWarkId){
                netWarkId = netWarkId.substr(netWarkId.indexOf("x",netWarkId.length))
            }
            if(netWarkId=="5"){
                 setChain(netWarkId)
            }else{
                setChain("Unsupported")
            }
            dispatch({type: "SET_NETWORKID", payload: netWarkId})
        });
    }, [])
    return (
        <FireDAOHeaderBox>
            <div className="firedao-header">
                <div className="currentTitle">
                </div>
                <div className="nav-list">
                    {/*<div className="nav-item">*/}
                    {/*    Docs*/}
                    {/*</div>*/}
                    {/*<div className="nav-item">*/}
                    {/*    WhitePaper*/}
                    {/*</div>*/}
                    <div className="nav-item">
                        Github
                    </div>
                </div>
                <Button onClick={() => {
                    goPage('/MyPassport')
                }} className="passport-icon" type="primary">
                    <img src={passportIcon} alt=""/>
                </Button>
                <Select
                    className="select-chain"
                    defaultValue="Goerli network"
                    style={{ width: 140 }}
                    onChange={handleChange}
                    value={chain}
                    options={[
                        {
                            value: '5',
                            label: 'Goerli network',
                        },

                    ]}
                />
                <ConnectWallet/>
            </div>
        </FireDAOHeaderBox>
    )

}
export default FireDAOHeader
