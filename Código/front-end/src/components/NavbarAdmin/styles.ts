import styled from 'styled-components';

export const Navbar = styled.nav`
    width: 100%;
    height: 10vh;
    background-color: ${props => props.theme.mainColor};
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    padding-inline: 10rem;
`

export const NavItems = styled.ul`
list-style: none;
color: white;
font-family: Arial;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
font-weight: 900;
gap: 3rem;
height: 100%;   
`

export const Item = styled.li`
padding-inline: 1rem;
height: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
cursor: pointer;
`

export const NavButton = styled.button`
fontFamily: "Arial";
font-weight: 800;
font-size: 16px;
width: 10rem;
height: 2.5rem;
border-radius: 10px;
cursor: pointer;
color: ${props => props.theme.mainColor};
border: none;
borderRadius: "30px";
height: "40px";
margin-block: 10px;
background-color: white;
transition: 0.3s;
margin-left: 5rem;

&:hover {
  transition: 0.3s;
  background-color: ${props => props.theme.mainColor};
  border: 1px solid white;
  color: white;
}
`

