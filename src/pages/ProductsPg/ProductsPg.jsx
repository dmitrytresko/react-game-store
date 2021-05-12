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
          <CategoryPg />
        </Route>
      </Switch>
    </>
  )
}

export default ProductsPg;
