import { NavItem } from "../../atoms/nav-item";
import { NavItemEnum } from "../../enums/nav-item";
import styles from './styles.module.scss'

const NavOptions = (): JSX.Element => {
    return (
        <div className={styles.navOptions}>
            <NavItem alt={NavItemEnum.newPost} />
            <NavItem alt={NavItemEnum.chats} />
            <NavItem alt={NavItemEnum.logout} />
        </div>
    )
}

export { NavOptions };