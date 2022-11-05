import {Routes, Route, Link} from "react-router-dom";
import DaoHome from "./view/daoHome";
import UserInfo from "./view/UserInfo"


import GlobalStyle from "./style/style";
import React from "react";
import { ConnectProvider} from "./api/contracts";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
function App() {
    return (
        <ConnectProvider>
            <GlobalStyle/>
            <div className="App" style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Routes>
                    <Route path="/" element={<DaoHome/>}/>
                    <Route path="/UserInfo" element={<UserInfo/>}/>
                </Routes>
            </div>

        </ConnectProvider>
    )
}

export default App;
