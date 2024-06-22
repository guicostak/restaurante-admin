import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Item, Navbar, NavButton, NavItems} from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboardList, faFile, faRightToBracket, faUtensils} from '@fortawesome/free-solid-svg-icons';

export const NavbarAdmin: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleAddButton = (page: string) => {
        navigate(page);
    };

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.setItem('isLogado', 'false');
        console.log(localStorage.getItem('isLogado'));
        window.location.reload();
      };

    return (
        <Navbar>
            <NavItems>
                <Item
                    style={{
                        color: location.pathname === "/admin/items" ? "#F6313C" : "",
                        backgroundColor: location.pathname === "/admin/items" ? "white" : ""
                    }}
                    onClick={() => handleAddButton("/admin/items")}
                >
                    <FontAwesomeIcon icon={faUtensils} style={{
                        marginRight: '0.5rem',
                        color: location.pathname === "/admin/items" ? "#F6313C" : "",
                    }} />
                    Cardápio
                </Item>
                <Item
                    style={{
                        color: location.pathname === "/admin/orders" ? "#F6313C" : "",
                        backgroundColor: location.pathname === "/admin/orders" ? "white" : ""
                    }}
                    onClick={() => handleAddButton("/admin/orders")}
                >
                    <FontAwesomeIcon icon={faClipboardList} style={{
                        marginRight: '0.5rem',
                        color: location.pathname === "/admin/orders" ? "#F6313C" : "",
                    }} />
                    Pedidos
                </Item>
                <Item
                    style={{
                        color: location.pathname === "/admin/records" ? "#F6313C" : "",
                        backgroundColor: location.pathname === "/admin/records" ? "white" : ""
                    }}
                    onClick={() => handleAddButton("/admin/records")}
                >
                    <FontAwesomeIcon
                        icon={faFile}
                        style={{
                            marginRight: '0.5rem',
                            color: location.pathname === "/admin/records" ? "#F6313C" : "",
                        }}
                    />
                    Relatórios
                </Item>
            </NavItems>
            <NavButton onClick={logout} type="button">
                Sair
                <FontAwesomeIcon
                    icon={faRightToBracket}
                    style={{
                        marginLeft: '0.5rem',
                    }}
                />
            </NavButton>
        </Navbar>
    );
};
