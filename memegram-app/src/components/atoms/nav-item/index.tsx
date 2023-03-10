import { NavItemEnum } from '../../enums/nav-item'
import styles from './styles.module.scss'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MemegramLogo from '../../../imgs/memegram-logo-circle.webp'

const NavItem = ({ alt }: {alt: NavItemEnum}): JSX.Element => {

  // eslint-disable-next-line
  let itemToDisplay: any;

  switch (alt) {
    case NavItemEnum.newPost:
        itemToDisplay = AddCircleOutlineIcon;
      break;

    case NavItemEnum.chats:
        itemToDisplay = ForumRoundedIcon;
      break;

    case NavItemEnum.logout:
        itemToDisplay = LogoutRoundedIcon;
      break;
  
    case NavItemEnum.home:
      itemToDisplay = MemegramLogo;
      break;

    default:
        itemToDisplay = MemegramLogo;
      break;
  }

  return <img className={styles.navItem} src={itemToDisplay} alt={alt} />
}

export { NavItem }
