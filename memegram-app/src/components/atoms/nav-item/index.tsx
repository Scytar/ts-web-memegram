import { NavItemEnum } from '../../enums/nav-item'
import styles from './styles.module.scss'

export interface INavItemProps {
  image: string
  alt: NavItemEnum
}

const NavItem = ({ image, alt }: INavItemProps): JSX.Element => {
  return <img className={styles.navItem} src={image} alt={alt} />
}

export { NavItem }
