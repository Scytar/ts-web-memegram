import { NavItem } from "../../atoms/nav-item";
import { NavItemEnum } from "../../enums/nav-item";

const NavHome = (): JSX.Element => {
    return (
        <>
            <NavItem alt={NavItemEnum.home} />
            <h1 className='title'>Memegram</h1>
        </>
    )
}

export { NavHome };