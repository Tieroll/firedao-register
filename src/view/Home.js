import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Button, Form, message, Input, Tooltip, notification} from 'antd';

const Home = (props) => {
    const history = useNavigate();
    const goPath = (url) => {
        history(url);
    }
    const Home = styled.div`
      .info-box {
        width: 1200px;
        margin: 3em auto;
        border-radius: 30px;

        .connect {
          margin: 3em 0;
        }
      }
    `


    return (
        <Home>

            <Button onClick={()=>{
                goPath("/Admin")
            }}>Admin</Button>
            <Button onClick={()=>{
                goPath("/SbtAdmin")
            }}>SbtAdmin</Button>
        </Home>
    )
}
export default Home
