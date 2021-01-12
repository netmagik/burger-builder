import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';


const app = props => {

  // state = {
  //   show: true
  // }

  //   componentDidMount() {
  //     setTimeout(() => {
  //       this.setState({show: false})
  //     }, 5000)
  //   }

    return (
      <div>
      <Layout>
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
      </Switch>
      {/* {this.state.show ? <BurgerBuilder /> : null } */}
      </Layout>
      </div>
    );
}

export default app;
