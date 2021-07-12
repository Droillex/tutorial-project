import css from "./Item.module.css";
import { NavLink } from "react-router-dom";

const Item = (props) => {
  return (
    <NavLink
      exact={props.exact}
      to={props.href}
      activeClassName={css.active}
      className={css.item}
    >
      <div className={css.underlay} />
      {props.pic}
      {props.text}
    </NavLink>
  );
};

Item.defaultProps = {
  href: "#",
};

export default Item;
