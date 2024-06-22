import styled from "styled-components";

import {Link} from "react-router-dom";

export const RegisterContainer = styled.div`
  width: 400px;
  margin: 10px;
  padding-inline: 3vw;
  padding-block: 10px;
  background-color: #ffffff;
  border-radius: 15px;
  text-align: center;
  color: #000;
`;

export const RegisterHeader = styled.div`
  margin-bottom: 20px;
`

export const RegisterMainText = styled.h2`
  font-size: 35px;
  font-family: "Arial";
  font-weight: 900;
  color: ${props => props.theme.mainColor};
`

export const LoginLinkText = styled.p`
  margin-top: 2%;
  font-size: 14px;
  font-family: "Arial";
`

export const StyledLink = styled(Link)`
  color: ${props => props.theme.mainColor};
  text-decoration: none;

  &:hover { 
    color: ${props => props.theme.mainColorHover};
  }
`
export const CustomizedButton = styled.button`
  fontFamily: "Arial";
  width: 200px;
  height: 40px;
  border-radius: 40px;
  cursor: pointer;
  color: white;
  border: none;
  borderRadius: "30px";
  height: "40px";
  margin-block: 10px;
  background-color: ${props => props.theme.mainColor};

  &:hover {
    transition: 0.3s;
    background-color: ${props => props.theme.mainColorHover};
  }
`