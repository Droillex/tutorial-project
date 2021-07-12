import css from "../Sidebar.module.css";

const SideBlock = (props) => {
  return (
    <section>
      <div className={css.title}>{props.title}</div>
      {props.children}
    </section>
  );
};

export default SideBlock;
