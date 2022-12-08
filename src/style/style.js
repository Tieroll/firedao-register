import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
 
  *{
    box-sizing: border-box;
  }
  body{
    background: linear-gradient(180deg, #1E0000 0%, #020000 100%);
    color:#fff;
    position: relative;
  }
  .content{
    position: relative;
    z-index: 1;
    padding-left: 256px;
    width: 100%;
    left: 0;
    overflow: hidden;
  }
  .firebg{
    width: 100vw;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 0;
    object-fit:fill;
  }
  div{
    box-sizing: border-box;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 14px;
  }


//  common css
  .panel-box{
    background: #201414;
    box-shadow: 0px 3px 15px 5px rgba(0,0,0,0.05);
    border-radius: 10px;
    padding: 3em;
    margin: 3em 5em ;
    opacity: 0.95;
  }
  .flex-box{
    display: flex;
  }
`
export default GlobalStyle
