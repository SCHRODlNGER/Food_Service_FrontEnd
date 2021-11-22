import './App.css';
import log from 'loglevel'
import {Route} from 'react-router-dom'
import { Router } from 'react-router';
import Navbar from './components/pages/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import SignUp from './components/pages/Login/SignUp';
import Login from './components/pages/Login/Login';
import Cart from './components/pages/Cart/Cart';
import Layout from 'antd/lib/layout/layout';

import history from './history';
import UserAccount from './components/pages/UserAccount/UserAccount';
import SaveAddress from './components/pages/UserAccount/SaveAddress';
import Recipes from './components/pages/Recipes/Recipes';
import Orders from './components/pages/UserAccount/Orders';
import ConfirmOrder from './components/pages/UserAccount/ConfirmOrder';

function App() {

  log.info("[App]: Rendering App window")

  return (
    <Layout style = {{display: "flex"}}>
      <Router history = {history} forceRefresh = {true}>

        <Route path = "/" component = {Navbar} />
        <Route path = "/" exact component = {Home} />
        <Route path = "/signup" exact component = {SignUp} />
        <Route path = "/signin" exact component = {Login} />
        <Route path = "/cart" exact component = {Cart}/>
        <Route path = "/user" exact component = {UserAccount}/>
        <Route path = "/saveAddress" exact component = {SaveAddress}/>
        <Route path = "/recipes" exact component = {Recipes}/>
        <Route path = "/orders" exact component = {Orders}/>
        <Route path = "/confirm-order" exact component = {ConfirmOrder}/>

      </Router>
    </Layout>
  );
}

export default App;
