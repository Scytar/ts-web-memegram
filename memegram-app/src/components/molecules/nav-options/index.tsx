import { Link } from "react-router-dom";
import { NavItem } from "../../atoms/nav-item";
import { NavItemEnum } from "../../enums/nav-item";
import styles from './styles.module.scss'

const NavOptions = (): JSX.Element => {
    return (
        <div className={styles.navOptions}>
            <Link to='new-post'>
                <NavItem alt={NavItemEnum.newPost} />
            </Link>
            <Link to='chats'>
                <NavItem alt={NavItemEnum.chats} />
            </Link>
            <Link to='logout'>
                <NavItem alt={NavItemEnum.logout} />
            </Link>
        </div>
    )
}

export { NavOptions };