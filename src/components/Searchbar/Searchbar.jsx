import "./styles.scss";

const Searchbar = (props) => {
  return (
    <form className="searchbar">
      <input type="text" placeholder={props.message} />
      <button className="searchbar-btn" type="submit"></button>
    </form>
  )
}

export default Searchbar;
