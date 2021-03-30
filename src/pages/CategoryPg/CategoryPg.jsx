import { useParams } from "react-router-dom";

const CategoryPg = () => {
  let { categoryId } = useParams();

  return (
    <h2 className="page-title">Best games for {categoryId}</h2>
  )
}

export default CategoryPg;
