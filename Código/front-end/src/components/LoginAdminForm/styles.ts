import {Link} from 'react-router-dom'
import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 360px;
    padding: 40px 20px;
    background-color: #fff;
    border-radius: 5%;
    text-align: center;
`

export const LoginHeader = styled.div`
    margin-bottom: 10%;
`

export const LoginHeaderTitle = styled.h2`
    font-size: 35px;
    font-family: "Arial", sans-serif;
    font-weight: 900;
    color: ${props => props.theme.mainColor};
`

export const LoginHeaderText = styled.p`
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    margin-top: 10px;
`

export const StyledLink = styled(Link)`
    color: ${props => props.theme.mainColor};
    text-decoration: none;
    margin-left: 5px;

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
    margin-block: 10px;
    background-color: ${props => props.theme.mainColor};
`
export const HomePage = styled(Link)`
    display: inline-block;
    float: right;
    fontFamily: "Arial";
    cursor: pointer;
    color: ${props => props.theme.mainColor};
    padding: 0.6em 1.1em;
`
export const BODY = styled.body`
    display: inline;
`
