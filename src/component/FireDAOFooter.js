import styled from "styled-components";
import {useConnect, connect} from "../api/contracts";
import logo from "../imgs/logo.png"
import icon1 from "../imgs/github.png"
import icon2 from "../imgs/twitter.png"
import icon3 from "../imgs/telegram.png"
import icon4 from "../imgs/facebook.png"
import icon5 from "../imgs/tiktok.png"
import icon6 from "../imgs/youtube.png"
import icon7 from "../imgs/reddit@2x.png"
import icon8 from "../imgs/medium.png"
import icon9 from "../imgs/discord.png"
const FireDAOFooter = () => {
    const FireDAOFooterBox = styled.div`
      width: 100%;
      background: #150D0D;
      padding: 1em 3em;
      display: flex;
      justify-content: space-between;
      .link-list{
        display: flex;
        flex-grow: 1;
        margin: 2em 0;
        flex-wrap: wrap;
        width: 300px;
        .link-item{
          margin-right: 1.5em;
          margin-top: 2em;
          cursor: pointer;
          .icon{
            width: 20px;
          }
        }
      }
      margin-top: 12em;
      .link-box{
        display: flex;
        font-family: Helvetica-Bold, Helvetica;

        .link-col{
          margin-left: 1.5em;
          .link-row{
            font-weight: bold;
            color: #544545;
            line-height: 20px;
            font-size: 12px;
            cursor: pointer;
          }
          .link-row.title{
            font-size: 14px;
            line-height: 30px;
            font-weight: bold;
            color: #FFFFFF;
          }
        }
      }
    `
    let {state, dispatch} = useConnect();

    return (
        <FireDAOFooterBox>
            <div className="left">
                <img src={logo} alt=""/>
                <div className="link-list">
                    <div className="link-item">
                        <img className="icon" src={icon1} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon2} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon3} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon4} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon5} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon6} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon7} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon8} alt=""/>
                    </div>
                    <div className="link-item">
                        <img className="icon" src={icon9} alt=""/>
                    </div>

                </div>
                <div className="copyright">
                    Copyright ©FireDAO.co
                </div>
            </div>
            <div className="right">
                <div className="link-box">
                    <div className="link-col">
                        <div className="link-row title">
                            Holy Fire Altar
                        </div>
                        <div className="link-row">
                            Mint FirePassport
                        </div>
                        <div className="link-row">
                            Mint FireSeed
                        </div>
                        <div className="link-row">
                            Mint FireSoul
                        </div>
                        <div className="link-row">
                            PID List
                        </div>
                        <div className="link-row">
                            FID List
                        </div>
                        <div className="link-row">
                            Pass FireSeed
                        </div>
                        <div className="link-row">
                            SBT List
                        </div>
                    </div>
                    <div className="link-col">
                        <div className="link-row title">
                            SBB Square
                        </div>
                        <div className="link-row">
                            General
                        </div>
                        <div className="link-row">
                            DeFi
                        </div>
                        <div className="link-row">
                            DAOs
                        </div>
                        <div className="link-row">
                            NFT
                        </div>
                        <div className="link-row">
                            Metaverse
                        </div>
                        <div className="link-row">
                            SocilFi
                        </div>
                        <div className="link-row">
                            GameFi
                        </div>
                    </div>
                    <div className="link-col">
                        <div className="link-row title">
                            FDT Square
                        </div>
                        <div className="link-row">
                            Seed Donation
                        </div>
                        <div className="link-row">
                            Consensus Donation
                        </div>
                        <div className="link-row">
                            FLM Exchange
                        </div>
                        <div className="link-row">
                            Uniswap Exchange
                        </div>
                        <div className="link-row">
                            MFDT Release
                        </div>
                        <div className="link-row">
                            FLM Release
                        </div>
                        <div className="link-row">
                            FDT Holder
                        </div>
                    </div>
                </div>
            </div>

        </FireDAOFooterBox>
    )

}
export default FireDAOFooter
