
import Cart from "features/Cart";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./features/Home";
import Infor from "./features/Infor";
import Product from "./features/Product"
import ProductDetail from "./features/Product/pages/ProductDetail"


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/infor" exact component={Infor}/>
          <Route path="/products" exact component={Product} />
          <Route path="/products/:id" exact component={ProductDetail}/>
          <Route path='/cart' exact component={Cart}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
