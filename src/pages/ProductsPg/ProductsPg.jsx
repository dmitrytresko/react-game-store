import { Route, Switch, useRouteMatch} from "react-router-dom";
import CategoryPg from "../CategoryPg/CategoryPg";

const ProductsPg = () => {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:categoryId`}>
          <CategoryPg />
        </Route>
      </Switch>
    </>
  )
}

export default ProductsPg;
