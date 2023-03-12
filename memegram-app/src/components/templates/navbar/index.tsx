import { Link } from "react-router-dom";
import { NavHome } from "../../molecules/nav-home";
import { NavOptions } from "../../molecules/nav-options";
import styles from './styles.module.scss'

const Navbar = (): JSX.Element => {
    return (
        <>
            <div className={styles.navContainer}>
                <Link to='/'>
                    <NavHome/>
                </Link>
                <NavOptions/>
            </div>
            <div className={styles.navSpacer} />
        </>
    )
}

export { Navbar };