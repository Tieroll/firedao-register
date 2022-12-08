import {Routes, Route, Link} from "react-router-dom";
import Register from "./view/Register";
import UserInfo from "./view/UserInfo"
import CreateLock from "./view/createLock"
import LockList from "./view/LockList"
import Home from "./view/Home"
import MyFireSeed from "./view/myNFTList"
import CreateFireSoul from "./view/createFireSoul"
import AdminPage from "./view/admin"
import GlobalStyle from "./style/style";
import AntdOverride from "./style/antdOverride";
import React from "react";
import {ConnectProvider} from "./api/contracts";
import FireDAOHeader from "./component/FireDAOHeader";
import FireDAOFooter from "./component/FireDAOFooter";
import MintFireSeed from "./view/mintFireSeed"; // or 'antd/dist/antd.less'
import firebg from "./imgs/firebg.mp4"
import NavList from "./component/NavList";

function App() {
    return (

        <ConnectProvider>
            <GlobalStyle/>
            <AntdOverride/>
            <video className="firebg" width="100%" autoPlay="autoplay" loop="loop" muted="muted">
                <source src={firebg} type="video/mp4"/>
            </video>
            <div className="content">
               <FireDAOHeader/>
                <NavList/>
                <div className="App" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>

                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/mintFirePort" element={<Register/>}/>
                        <Route path="/UserInfo" element={<UserInfo/>}/>
                        <Route path="/Admin" element={<AdminPage/>}/>
                        <Route path="/CreateLock" element={<CreateLock/>}/>
                        <Route path="/LockList" element={<LockList/>}/>
                        <Route path="/mintFireSeed" element={<MintFireSeed/>}/>
                        <Route path="/createFireSoul" element={<CreateFireSoul/>}/>
                        <Route path="/myFireSeed" element={<MyFireSeed/>}/>
                    </Routes>
                </div>
                <FireDAOFooter/>
            </div>
        </ConnectProvider>

    )
}

export default App;
