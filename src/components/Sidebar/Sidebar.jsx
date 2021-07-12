import css from "./Sidebar.module.css";
import { ReactComponent as ProfileIcon } from "../../images/user_icon.svg";
import { ReactComponent as EnvelopeIcon } from "../../images/envelope_icon.svg";
import { ReactComponent as NewspaperIcon } from "../../images/newspaper_icon.svg";
import { ReactComponent as MusicIcon } from "../../images/sound_icon.svg";
import { ReactComponent as SearchIcon } from "../../images/searching.svg";
import { ReactComponent as SettingsIcon } from "../../images/settings.svg";
import UserMini from "./UserMini/UserMini";
import { ReactComponent as LogoIcon } from "../../images/tag_icon.svg";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Item from "./Item/Item";
import { NavLink } from "react-router-dom";
import withAuthHider from "../../hoc/withAuthHider";
import SideBlock from "./SideBlock/SideBlock";

const Sidebar = () => {
  const Profile = withAuthHider(Item);
  const Messages = withAuthHider(Item);
  const Music = withAuthHider(Item);
  const Settings = withAuthHider(Item);

  const UsersBlock = withAuthHider(SideBlock);

  return (
    <SimpleBar className={css.wrapper} autoHide={true}>
      <nav className={css.nav}>
        <NavLink to="/" className={css.logo}>
          <LogoIcon />
          Demo_Project
        </NavLink>

        <SideBlock title="Main_Section">
          <Profile exact pic={<ProfileIcon />} text="Profile" href="/profile" />
          <Messages pic={<EnvelopeIcon />} text="Messages" href="/messages" />
          <Item pic={<NewspaperIcon />} text="News" href="/news" />
          <Music pic={<MusicIcon />} text="Music" href="/music" />
          <Item pic={<SearchIcon />} text="Find_Users" href="/users" />
          <Settings pic={<SettingsIcon />} text="Settings" href="/settings" />
        </SideBlock>

        <UsersBlock title="Users_Online">
          <UserMini name="antiykho" />
          <UserMini name="Nervos" />
          <UserMini name="Alfren_d" />
          <UserMini />
          <UserMini />
        </UsersBlock>
      </nav>
    </SimpleBar>
  );
};

export default Sidebar;
