import { NavItemEnum } from '../../enums/nav-item'
import styles from './styles.module.scss'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MemegramLogo from '../../../imgs/memegram-logo-circle.webp'

const NavItem = ({ alt }: { alt: NavItemEnum }): JSX.Element => {

  switch (alt) {
    case NavItemEnum.newPost:
      return <AddCircleOutlineIcon className={styles.navItem}/>;

    case NavItemEnum.chats:
      return <ForumRoundedIcon className={styles.navItem}/>;

    case NavItemEnum.logout:
      return <LogoutRoundedIcon className={styles.navItem}/>;

    case NavItemEnum.home:
      return <img className={styles.navItem} src={MemegramLogo} alt={alt} />;

    default:
      return <img className={styles.navItem} src={MemegramLogo} alt={alt} />;
  }
}

export { NavItem }
