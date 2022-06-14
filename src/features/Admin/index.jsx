import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userApi from "api/userApi";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/SidebarWidget";
import Accounts from "./components/Accounts";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Categories from "./components/Categories";
import DetailAccount from "./components/Accounts/pages/DetailAccount";
import CreateAccount from "./components/Accounts/pages/CreateAccount";
import DetailProduct from "./components/Products/pages/DetailProduct";
import CreateProduct from "./components/Products/pages/CreateProduct";
import Breadcrumb from "components/Breadcrumbs";
import Home from "features/Home";
import Events from "./components/Events";
import Discount from "./components/Events/components/Discount";
import FlashSale from "./components/Events/components/FlashSale";
import Analytics from "./components/Analytics";

function Admin() {
  const info = useSelector((state) => state.user.current);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      if (info) {
        const data = await userApi.getProfile();

        if (data.role === 0) {
          return;
        }
        setIsAdmin(true);
      }
    })();
  }, [info]);

  return (
    <>
      <div className="admin-page" id="admin-page">
        {isAdmin ? (
          <Router>
            <div className="container-ad">
              {/* <SideBar /> */}
              <Route path="/admin" component={SideBar} />
              <div className="others">
                <Switch>
                  <Route path="/admin/accounts" exact component={Accounts} />

                  <Route
                    path="/admin/accounts/create"
                    exact
                    component={CreateAccount}
                  />
                  <Route
                    path="/admin/accounts/:id"
                    exact
                    component={DetailAccount}
                  />

                  <Route path="/admin/products" exact component={Products} />
                  <Route
                    path="/admin/products/create"
                    exact
                    component={CreateProduct}
                  />

                  <Route path="/admin/orders" exact component={Orders} />

                  <Route
                    path="/admin/categories"
                    exact
                    component={Categories}
                  />
                  <Route path={"/admin/analytics"} component={Analytics} />
                  <Route path={"/admin/events-fsale"} component={Events} />
                  <Route path={"/admin/events-disc"} component={Events} />
                  <Route path={"/admin/events-procode"} component={Events} />
                  {/* <Route
                    path='/admin/events/fsale'
                    exact
                    component={FlashSale}
                  />
                  <Route path='/admin/events/disc' exact component={Discount} /> */}
                  <Route path="/" exact component={Home} />
                </Switch>
              </div>
            </div>
          </Router>
        ) : (
          <div className="container-ad">
            <h1>This is Admin system. Please go back, thanks you!</h1>
            {setTimeout(() => {
              <Redirect to="/" />;
            }, 3000)}
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
