import styled from "styled-components";
import {useConnect, connect} from "../api/contracts";
import ConnectWallet from "./connect-wallet";

const FireDAOHeader = () => {
    const FireDAOHeaderBox = styled.div`
      width: 100%;
      background: #150D0D;
      padding: 1em 3em;
      display: flex;
      justify-content: space-between;
      .nav-list{
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
        padding: 0 3em;
        .nav-item{
          margin-left: 2em;
          cursor: pointer;
        }
      }

    `
    let {state, dispatch} = useConnect();

    return (
        <FireDAOHeaderBox>
            <div className="currentTitle">

            </div>
            <div className="nav-list">
                <div className="nav-item">
                    Docs
                </div>
                <div className="nav-item">
                    WhitePaper
                </div>
                <div className="nav-item">
                    Github
                </div>
            </div>
            <ConnectWallet/>
        </FireDAOHeaderBox>
    )

}
export default FireDAOHeader
