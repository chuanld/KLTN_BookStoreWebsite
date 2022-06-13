import Admin from 'features/Admin'
import Cart from 'features/Cart'
import Order from 'features/Infor/components/Order'
import OrderDetail from 'features/Infor/components/Order/OrderDetail'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './features/Home'
import Infor from './features/Infor'
import Product from './features/Product'
import ProductDetail from './features/Product/pages/ProductDetail'

import Activation from 'features/Auth/components/Activation'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />

          <Route path='/account' component={Infor} />
          <Route
            path='/account/activate/:activationtoken'
            exact
            component={Activation}
          />
          <Route path='/account/order' exact component={Order} />
          <Route path='/account/order/:id' exact component={OrderDetail} />
          <Route path='/products' exact component={Product} />
          <Route path='/products/:id' exact component={ProductDetail} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
