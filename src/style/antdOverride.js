import {createGlobalStyle} from "styled-components";
const AntdOverride = createGlobalStyle`
  .ant-btn-primary{
    background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
    border: none;
    transition: 0.5s;
    &:hover{
      background: linear-gradient(320deg, #FFC02C 0%, #DD3642 100%);
    }
    &:focus{
      background: linear-gradient(320deg, #FFC02C 0%, #DD3642 100%);
    }
    &:active{
      background: linear-gradient(320deg, #FFC02C 0%, #DD3642 100%);
    }
    ::after{
      display: none;
    }
  }
  .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub, .ant-menu.ant-menu-dark .ant-menu-sub{
    background: #201414;
  }
  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected{
    background: #150D0D ;
    background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub{
    background: #150D0D ;
  }
`
export default AntdOverride
