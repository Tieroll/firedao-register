import {createGlobalStyle} from "styled-components";
import bg from "../imgs/background.png"
const GlobalStyle = createGlobalStyle`
  div{
    box-sizing: border-box;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 14px;
  }
  .daoContentBg{
    background: url(${bg});
    flex: 1;
  }
  .content-box {
    box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.05);

    border-radius: 20px;
    width: 1200px;
    margin: 10px auto;
    background: #fff;
    padding-bottom: 20px;
  }

  .box-nav {
    display: flex;
    padding: 0 20px;
    border-bottom: 1px solid #eee;

    .item {
      user-select: none;
      width: 150px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      cursor: pointer;

      &.active {
        color: #F96AAF;
        border-bottom: 1px solid #F96AAF;
      }
    }
  }

`
export default GlobalStyle
