import { NavItem } from "../../atoms/nav-item";
import { NavItemEnum } from "../../enums/nav-item";
import styles from './styles.module.scss';

const NavHome = (): JSX.Element => {
    return (
        <div className={styles.homeContainer}>
            <NavItem alt={NavItemEnum.home} />
            <h1 className={styles.title}>Memegram</h1>
        </div>
    )
}

export { NavHome };