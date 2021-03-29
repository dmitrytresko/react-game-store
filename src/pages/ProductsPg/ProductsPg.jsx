import { BrowserRouter as Switch, Route, /* useParams */} from "react-router-dom";

const ProductsPg = () => {
  return (
    <>
      <h2 className="page-title">Products page</h2>

      <Switch>
        <Route path="/products/ps">
          <h2>Games for PlayStation</h2>
        </Route>
        <Route path="/products/xbox">
          <h2>Games for Xbox</h2>
        </Route>
        <Route path="/products/pc">
          <h2>Games for PC</h2>
        </Route>
      </Switch>
    </>
  )
}

export default ProductsPg;
