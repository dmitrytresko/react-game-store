import { Route, Switch, useRouteMatch} from "react-router-dom";
import CategoryPg from "../CategoryPg/CategoryPg";
import "./styles.scss";

const ProductsPg = () => {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:categoryId`}>
          <CategoryPg />
        </Route>
        <Route path="/">
          <div className="products">
            <h1 className="page-title">Products page</h1>
          </div>
        </Route>
      </Switch>
    </>
  )
}

export default ProductsPg;
