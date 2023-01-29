import React, { useEffect, useState } from "react";
import "../styles/BurgerMenu.scss";

interface Props {}

const BurgerMenu: React.FC<Props> = (props) => {
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

    useEffect(()=>{
        console.log("BurgerMenu.tsx: useEffect: burgerMenuOpen: " + burgerMenuOpen)
    }, [burgerMenuOpen]);

    return (
        <div>
            <div className="toggle-menu-button" onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}>
                <div className="graphic">
                    <div className="line"></div>
                </div>
            </div>

            <div className="burger-menu"></div>
        </div>
    );
};

export default BurgerMenu;
