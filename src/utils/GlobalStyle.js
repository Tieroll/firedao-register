import { createGlobalStyle } from "styled-components";
import "../scss/fonts.scss";
import down from "../img/down.png";
import up from "../img/up.png";
import close from "../img/close.png";

const GlobalStyle = createGlobalStyle`
body,html{
  color: #10164B !important;
  background: #F9FAFF !important;
  font-family: Brandon!important;
  height: 100% !important;
  min-width: 1280px;
  font-size: 6.66667px;

  .maincontainer{
    display: flex;
    flex-direction: column;
    height: 100vh;
    z-index: 99;
    position: relative;

    .bodycontainer {
        flex-grow: 1;

        .container{
          width: 144rem;
          margin: 0 auto;
          padding: 4rem 0;
        }
    }
  }
  ul,li{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .titleTop{
    font-size: 1.8rem;
    font-family: Brandon;
    font-weight: 400;
    color: #10164B;
    line-height: 2.1rem;
    margin:3rem 0 2rem;
  }

  button{
    border-radius: 0.8rem !important;
    font-size: 1.8rem !important;
    img{
      width: 1.8rem;
      height: 1.2rem;
      margin-left: 1rem;
      &.left{
        margin: 0 1rem 0 0;
      }
    }
  }

  .ant-btn-primary[disabled], .ant-btn-primary[disabled]:hover, .ant-btn-primary[disabled]:focus, .ant-btn-primary[disabled]:active{
    background: #D52473;
    opacity: 0.3;
    color: #FFFFFF;
  }

  .btn{
    cursor: pointer;
    margin-right: 2rem;
    // border: 1px solid #EE42D1;
    padding: 1.3rem 2.8rem;
    font-size: 2.4rem;
    font-family: Brandon;
    background: #D52473;
    color: #FFFFFF;
    outline: none;
    display: flex;
    align-items: center;
    //&:link{color:#fff}
    &:hover,&:focus{
      // background: linear-gradient(90deg, #4B69F2 0%, #EE42D1 100%);
      border:0;
      margin: 1px;
      margin-right: 2.1rem;
      color: #FFFFFF;
      outline: none;
      //background-image: linear-gradient(#4B69F2,#EE42D1),linear-gradient(90deg, #4B69F2 0%, #EE42D1 100%);
    }
    &:active{
      // background: linear-gradient(90deg, rgba(75, 105, 242, 0.6) 0%, rgba(238, 66, 209, 0.6) 100%), linear-gradient(0deg, #000000, #000000);
      border:0;
      margin: 1px;
      margin-right: 2.1rem;
      color: #FFFFFF;
      outline: none;
    }
    img{
      width: 2.4rem;
      height: 1.6rem;
      margin-left: 1.5rem;
    }
  }

  /* modal */
  .ant-modal-root{
    .ant-modal-mask{
      background: #F9FAFF;
      opacity: 0.95;
    }
    .ant-modal-wrap{
      .ant-modal-content{
        box-shadow: 0rem 0rem 2rem 0rem rgba(16, 22, 75, 0.1);
        border-radius: 3.2rem;
        .ant-modal-close{
          top: 0.5rem;
          right: 0.7rem;
          .ant-modal-close-x{
            ::after{
              content: '';
              background: url(${close});
              background-size: 100%;
              content: '';
              position: absolute;
              left: calc(50% - 1.5rem);
              top: calc(50% - 1.5rem);
              width: 3rem;
              height: 3rem;
            }
            svg{
              display: none;
            }
          }
        }
        .ant-modal-body{
          font-size: 1.8rem;
          padding: 6rem;
          .confirmInnerTitle{
            margin-bottom: 2rem;
            font-size: 1.8rem;
            font-family: Brandon;
            font-weight: 300;
            color: #010643;
              text-align: center;
          }
          .confirmInnerBtnGroup{
              display: flex;
              justify-content: center;
              button{
                padding: 0.7rem 3.1rem;
                font-size: 1.2rem;
                height: auto!important;
                margin: 0 3rem;
              }
          }
          &>.title{
            margin: 2rem 0;
            height: 4rem;
            font-size: 3.4rem;
            font-family: Brandon;
            font-weight: 300;
            color: #010643;
            line-height: 4rem;
            text-align: center;
          }

          .label{
            font-size: 1.8rem;
            font-family: Brandon;
            font-weight: 300;
            color: #A6A6B7;
            line-height: 2.1rem;
            margin: 3rem 0 1rem 0;
          }
          
          /* button */
          .ant-btn.ant-btn-primary, .default{
            height: 7.6rem;
            border-radius: 1.2rem !important;
            font-size: 2.4rem !important;
            font-family: Brandon;
          }
          /* button */

          /* input */
          .ant-input{
            height: 7.6rem;
            background: #F4F4FA;
            border-radius: 1.2rem;
          }
          /* input */
        }
      }
    }
  }

  /* select */
  .ant-select.ant-select-single.ant-select-show-arrow{
    &.ant-select-open{
      .ant-select-arrow{
        background: url(${up});
        background-size: 100%;
        width: 3.2rem;
        height: 3.2rem;
        margin-top: -1.4rem;
      }
    }
    .ant-select-selector{
      height: 7.6rem;
      background: #F4F4FA;
      border-radius: 1.2rem;
      .ant-select-selection-placeholder, .ant-select-selection-item{
        line-height: 7.6rem;
        font-size: 1.8rem;
        font-family: Brandon;
        font-weight: 300;
        color: #A6A6B7;
      }
      .ant-select-selection-item{
        color: #010643;
      }
    }
    .ant-select-arrow{
      background: url(${down});
      background-size: 100%;
      width: 3.2rem;
      height: 3.2rem;
      margin-top: -1.4rem;
      svg{
        display: none;
      }
      &.ant-select-open{
      }
    }
  }
  /* select */
  

  /* daoModal */
  .daoModal{
    width: 100vw !important;
    margin: 0;
    top: 10.6rem;

    .ant-modal-content{
      background: #10164B;
      width: 100vw;
      height: calc(100vh - 18.2rem);
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 0 !important;
      
      .ant-modal-close{
        color: #CCCCD8;
      }
      .ant-modal-body{
        box-shadow: 0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.1);
        border-radius: 5.5rem 5.5rem 0rem 0rem;
        height: 100%;
        background: white;
        margin-top: 7.6rem;
      }
    }
  }

  .content{
    padding: 4rem 0;
  }


  .daoItem{
    width: 23rem;
    height: 26.8rem;
    padding: 2.8rem;
    
    background: rgba(16, 22, 75, 0.04);
    border-radius: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &.sizeItem{
      height: 23rem;
    }
    &:not(:last-child){
      margin-right: 7.3rem;
    }
    &:hover{
        background: #FFEFF7;
        transform: scale(1.05);
        .title{
            color: #D52473;
        }
    }

    img{
        width: 9rem;
        height: 9rem;
        border-radius: 4.5rem;
    }
    .title{
        width: 100%;
        height: 2.4rem;
        text-align: center;
        font-size: 2rem;
        font-family: Brandon;
        font-weight: 400;
        color: #10164B;
        line-height: 2.4rem;
        margin: 1.3rem 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .detail{
        width: 16.7rem;
        font-size: 1.4rem;
        font-family: Brandon;
        font-weight: 300;
        color: #10164B;
        line-height: 1.9rem;
        text-align: center;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
  }

  .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before{
    width: 0;
  }

  table.myTable{
    width: 100%;
    border: 1px solid #E8E8EA;
    &.votePending{
      th{
        height: 6rem;
        font-size: 1.8rem;
        font-family: Brandon;
        //font-weight: 400
      }
      tr,td{
        height: 6rem;
        font-size: 1.8rem;
        font-family: Brandon;
        font-weight: 300;
      }
    }
    th{
      height: 4rem;
      background: #F5F5F7;
      padding:0 2.3rem;
      font-size: 1.4rem;
      font-family:  Brandon;
      //font-weight: 500;
     color: #86878E;
      line-height: 2rem;
      text-align: left;
      border-bottom: 1px solid #E8E8EA;
      &:first-child{

      }
    }
    tr{
      &:hover{
        background: #FFEFF7;
        td{background:none;}
      }
    }
    td{
      height: 4rem;
      background: #ffffff;
      padding-left: 2.3rem;
      border-bottom: 1px solid #E8E8EA;
      font-size: 1.4rem;
      font-family: Brandon;
      font-weight: 300;
      color: #10164B;
      line-height: 1.6rem;
      cursor: pointer;
    }
  }
  
  .inputBrdr{
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    min-height: 4.4rem;
    .ant-input-affix-wrapper{
      border: 0;
      background: #FFFFFF;
      width: 100%;
      box-shadow: 0 0 0.4rem 0 rgba(16, 22, 75, 0.1);
      border-radius: 0.8rem!important;
    }
    .ant-input{
      min-height: 4.4rem;
      border: 0;
      font-size: 1.6rem;
      font-family: Brandon;
      font-weight: 300;
      color: #10134E;
      border-radius: 0.8rem;
    }
  }

  textarea{
    resize: none;
  }

  .myMenu{
    border-radius: 0.6rem;
  }

  /* date picker */
  .ant-picker-dropdown{
    .ant-picker-ok button{
      font-size: 1.4rem !important;
    }
  }
  /* date picker */

  /* select option */
  .ant-select-dropdown{
    .ant-select-item-option-content{
      font-size: 1.8rem;
      font-family: Brandon;
      font-weight: 300;
      color: #010643;
      line-height: 2.1rem;
    }
  }
   /* select */

}
`;

export default GlobalStyle;
