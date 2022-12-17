import styled from "styled-components";
import {Component, useReducer} from "react";
import React, { useState } from 'react';
import logo from "../imgs/logo.png"
import fireIcon1 from "../imgs/fire_icon1.png"
import fireIcon2 from "../imgs/fire_icon2.png"
import fireIcon3 from "../imgs/fire_icon3.png"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import {useNavigate} from "react-router-dom";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Holy Fire Altar', 'sub1',<img className="fireIcon" src={fireIcon1} />, [
        getItem('Mint Passport', 'mintFirePort'),
        getItem('Mint FireSeed', 'mintFireSeed'),
        getItem('Mint FireSoul', 'createFireSoul'),
        getItem('PID List', 'PIDList'),
        getItem('FID List', 'FIDList'),
        getItem('SBT List', 'SBTList'),
        getItem('My FireSeed', 'myFireSeed'),
        getItem('My Passport', 'MyPassport'),
    ]),
    getItem('CreateLock', 'CreateLock', <img className="fireIcon" src={fireIcon2} />),


    getItem('Navigation Two', 'sub2', <img className="fireIcon" src={fireIcon3} />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];
const NavList = () => {
    const NavListBox = styled.div`
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      z-index: 1;
      font-weight: bold;
      .navBox{
        background: #201414;
        height: 100%;
      }
      .fireIcon{
        width: 26px;
        height: 26px;
      }
    `
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(["sub1","1"]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const history = useNavigate();
    const goPage = (obj) => {
        console.log(obj)
        setSelectedKeys(obj.keyPath)
        history("/"+ obj.key );
    }
    return (
        <NavListBox>
            <div
                className="navBox"
                style={{
                    width: 256,
                }}
            >
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <img src={logo} alt=""/>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={selectedKeys }
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={(e)=>goPage(e)}
                />

            </div>
        </NavListBox>
    )

}
export default NavList
