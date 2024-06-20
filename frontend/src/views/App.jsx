import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MenuDetail } from './menu-details';
import { useState } from 'react';
import LoginPopUp from '../components/subcomponents/LoginPopUp/LoginPopUp';
import MenuArea from '../components/Navbar/MenuArea';
import PlaceOrder from './PlaceOrder/PlaceOrder';
import Verify from './Verify/Verify';
import MyOrders from './MyOrders/MyOrders';
import Checkout from './Checkout/Checkout';
import HomePage from './HomePage/HomePage';

function App() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
            <Router>
                <MenuArea setShowLogin={setShowLogin} />
                <Switch>
                    <Route exact path="/myorders" component={MyOrders} />
                    <Route exact path="/verify" component={Verify} />
                    <Route exact path="/cart" component={Checkout} />
                    <Route exact path="/menu-grid" component={MenuDetail} />
                    <Route exact path="/order" component={PlaceOrder} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
