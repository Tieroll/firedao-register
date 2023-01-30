import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import Register from "./view/HolyFireAltar/Register";
import UserInfo from "./view/UserInfo"
import CreateLock from "./view/createLock"
import LockList from "./view/LockList"
import Home from "./view/Home"
import SbtAdmin from "./view/sbtAdmin"
import PassFireSeed from "./view/HolyFireAltar/PassFireSeed"
import MintFireSoul from "./view/HolyFireAltar/MintFireSoul"
import AdminPage from "./view/admin"
import MyPassport from "./view/HolyFireAltar/myPassport"
import GlobalStyle from "./style/style";
import AntdOverride from "./style/antdOverride";
import React from "react";
import {ConnectProvider} from "./api/contracts";
import FireDAOHeader from "./component/FireDAOHeader";
import FireDAOFooter from "./component/FireDAOFooter";
import OnBuilding from "./view/OnBuilding";

import MintFireSeed from "./view/HolyFireAltar/MintFireSeed";
import PidList from "./view/HolyFireAltar/PidList";
import FIDList from "./view/HolyFireAltar/FIDList";
import SBTList from "./view/HolyFireAltar/SBTList";
import ChangeUserInfo from "./view/HolyFireAltar/ChangeUserInfo";
import Reputation from "./view/HolyFireAltar/Reputation";
import firebg from "./imgs/firebg.mp4"
import NavList from "./component/NavList";
//Treasury
import IncomeDistribution from "./view/Treasury/IncomeDistribution";
import IncomeSource from "./view/Treasury/IncomeSource";
import "animate.css";
function App() {
    const history = useNavigate();
    const location = useLocation()

    return (

        <ConnectProvider>
            <GlobalStyle/>
            <AntdOverride/>

            {
                location.pathname==="/"&&<Home/>
            }
            {location.pathname !== "/"&&

                <div className="content">
                    <video className="firebg" width="100%" autoPlay="autoplay" loop="loop" muted="muted">
                        <source src={firebg} type="video/mp4"/>
                    </video>
                    <FireDAOHeader/>
                    <NavList/>

                    <div className="App" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop:"6em"
                    }}>

                        <div className="flex-container" style={{
                            flexGrow:"1"
                        }}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/OnBuilding" element={<OnBuilding/>}/>
                                <Route path="/MintPassPort" element={<Register/>}/>
                                <Route path="/MyPassport" element={<MyPassport/>}/>
                                <Route path="/PIDList" element={<PidList/>}/>
                                <Route path="/ChangeUserInfo" element={<ChangeUserInfo/>}/>

                                <Route path="/UserInfo" element={<UserInfo/>}/>
                                <Route path="/Admin" element={<AdminPage/>}/>
                                <Route path="/CreateLock" element={<CreateLock/>}/>
                                <Route path="/LockList" element={<LockList/>}/>
                                <Route path="/MintFireSeed" element={<MintFireSeed/>}/>
                                <Route path="/MintFireSoul" element={<MintFireSoul/>}/>
                                <Route path="/PassFireSeed" element={<PassFireSeed/>}/>
                                <Route path="/SbtAdmin" element={<SbtAdmin/>}/>
                                <Route path="/FIDList" element={<FIDList/>}/>
                                <Route path="/SBTList" element={<SBTList/>}/>
                                <Route path="/Reputation" element={<Reputation/>}/>
                                {/*Treasury*/}
                                <Route path="/IncomeDistribution" element={<IncomeDistribution/>}/>
                                <Route path="/IncomeSource" element={<IncomeSource/>}/>
                            </Routes>
                        </div>
                    </div>
                    <FireDAOFooter/>
                </div>


            }
        </ConnectProvider>

    )
}

export default App;
