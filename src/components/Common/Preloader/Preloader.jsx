import { ReactComponent as InfinityLoading } from "../../../images/infinity-loading.svg";
import css from "./Preloader.module.css";

const Preloader = () => {
  return <InfinityLoading className={css.loader} />;
};

export default Preloader;
