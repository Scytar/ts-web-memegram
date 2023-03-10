import { NavHome } from "../../molecules/nav-home";
import { NavOptions } from "../../molecules/nav-options";
import styles from './styles.module.scss'

const Navbar = (): JSX.Element => {
    return (
        <div className={styles.navContainer}>
            <NavHome/>
            <NavOptions/>
        </div>
    )
}

export { Navbar };