import DaoHome from "../view/daoHome"
import { Route, Routes, HashRouter} from "react-router-dom";
function RouterLink(){
    return(
        <HashRouter>
            <Routes>
                <Route exact path="/" element={DaoHome}/>
                <Route exact path="/page" component={<DaoHome/>}/>
            </Routes>
        </HashRouter>
    )
}
export default RouterLink;
