import css from "./Users.module.css";
import UserCard from "./UserCard/UserCard";
import UserCardMockup from "./UserCard/UserCardMockup";
import { NavLink } from "react-router-dom";

const Users = (props) => {
  if (!props.users) {
    let mocks = [];
    for (let i = 0; i < props.usersPerPage; i++) {
      mocks.push(<UserCardMockup key={i} />);
    }
    return (
      <div className={css.container}>
        <div className={css.grid}>{mocks}</div>
        <div className={css.pages} />
      </div>
    );
  }

  const users = props.users.map((u) => (
    <UserCard
      key={u.id}
      id={u.id}
      src={u.photos.small}
      name={u.name}
      status={u.status}
      location="u.location"
      followed={u.followed}
      onFollow={props.onFollow}
      onUnfollow={props.onUnfollow}
      isDisabled={props.disabledUsers.some((elem) => elem === u.id)}
    />
  ));

  let pagesElement = (() => {
    const pageCount = Math.ceil(props.usersCount / props.usersPerPage);
    const leftPart = Math.max(props.currentPage - 5, 1);
    const rightPart = Math.min(props.currentPage + 5, pageCount);

    let pages = [];
    for (let i = leftPart; i <= rightPart; i++) {
      pages.push(
        <NavLink
          to={`/users?page=${i}`}
          key={i}
          className={props.currentPage === i ? css.active : null}
          onClick={
            props.currentPage === i
              ? null
              : () => {
                  props.onPageChanged(i);
                }
          }
        >
          {i}
        </NavLink>
      );
    }
    return pages;
  })();

  return (
    <div className={css.container}>
      <div className={css.grid}>{users}</div>
      <div className={css.pages}>{pagesElement}</div>
    </div>
  );
};

export default Users;
