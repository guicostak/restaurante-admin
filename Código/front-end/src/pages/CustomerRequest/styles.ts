import styled from 'styled-components';
import {Link} from "react-router-dom";
import { theme } from '../../common/styles/theme';

export const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`

export const ObservationsInput = styled.textarea`
    width: 20rem;
    height: 20vh;
    border-radius: 20px;
    border: none;
    padding: 20px;
    outline: none;
`

export const ObservationsCard = styled.div`
    width: 100%;
    padding-block: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.mainColor};
`

export const RequestButton = styled.button`
    fontFamily: "Arial";
    font-weight: 800;
    font-size: 16px;
    width: 310px;
    height: 50px;
    border-radius: 40px;
    cursor: pointer;
    color: ${props => props.theme.mainColor};
    border: none;
    borderRadius: "30px";
    margin-block: 10px;
    background-color: white;
    transition: 0.3s;
    margin-top: 50px;

    &:hover {
        transition: 0.3s;
        background-color: ${props => props.theme.mainColor};
        border: 1px solid white;
        color: white;
    }
`

export const Title = styled.h1`
    color: white;
    font-family: Arial, sans-serif;
    font-weight: 900;
    margin-bottom: 3rem;
`
export const ButtonAdmin = styled(Link)`
    fontFamily: "Arial";
    font-weight: bolder;
    float: right;
    padding: 0.5em 1em;
    margin-right: 1em;
    margin-top: 1em;
    border-radius: 40px;
    cursor: pointer;
    color: ${props => props.theme.mainColor};
    border: 1px solid white;
    background-color: white;
    transition: 0.3s;

    &:hover {
        transition: 0.3s;
        background-color: ${props => props.theme.mainColor};
        border: 1px solid white;
        color: white;
    }
`
export const Header = styled.header`
    width: inherit;
    display: inline-block;
    background-color: ${props => props.theme.mainColor};
`

export const Titulo = styled.h1`
font-family: Arial;
font-size: 1.3rem;
margin-bottom: 40px;    
`
export const TituloPagina = styled.h1`
font-family: Arial;
font-size: 2.5rem;
margin-bottom: 4rem;   
color: white; 
`

export const ContactInformationContainer = styled.div`
width: 100%;
height: 100vh;  
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: ${props => props.theme.background};
`

export const CardContactInformation = styled.div`
height: auto;
padding-block: 2rem;  
width: 22rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 40px; 
font-family: Arial;
background: ${props => props.theme.background};
color: white;
border: 1px solid white;
`

export const Textfield = styled.div`
display: flex;
flex-direction: column;
justify-items: left;
align-items: left;
width: 80%;
margin-bottom: 40px;
`

export const Input = styled.input`
width: 100%;
outline: none;
height: 50px;
border: none;
border-radius: 5px;
padding: 10px 15px;
`

export const Label = styled.label`
font-size: 16px;
margin: 0 0 5px 5px;
`

export const ContactButton = styled.button`
fontFamily: "Arial";
font-weight: 800;
font-size: 16px;
width: 310px;
height: 50px;
border-radius: 40px;
cursor: pointer;
color: ${props => props.theme.mainColor};
border: none;
borderRadius: "30px";
height: "40px";
margin-block: 10px;
background-color: white;
transition: 0.3s;

&:hover {
  transition: 0.3s;
  background-color: ${props => props.theme.mainColor};
  border: 1px solid white;
  color: white;
}
`

export const ErrorMessage = styled.div`
padding-top: 16px;
font-size: 14px;
margin: 0 0 5px 5px;
`

export const ItemsSelectionContainer = styled.div`
    display: flex;  
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    height: auto;
    background-color: ${props => props.theme.softBackground};
    padding-block: 3rem;
`

export const TitleItemSelected = styled.h1`
    color: ${props => props.theme.mainColor};
    font-family: 'Arial';
    margin-bottom: 1rem;
    font-size: 2rem;   
`

export const ErroItems = styled.p`
color: white;
font-family: Arial;
margin-top: 1rem;
`

export const TituloPedidoRealizado = styled.h1`
font-family: Arial;
font-size: 2rem;
font-weight: 600;
color: ${theme.mainColor};
margin-top: 2rem;

`

export const TextoPedidoRealizado = styled.p`
font-family: Arial;
font-size: 1.2rem;
font-weight: 600;
color: ${theme.mainColor};
margin-top: 2rem;
`

export const BotaoCancelarPedido = styled.button`
    width: 15rem;
    height: 3rem;
    cursor: pointer;
    background: ${theme.mainColor};
    border: 1px solid #dc5858;
    outline: none;
    transition: 0.2s ease-in-out;
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    font-weight: 100;

    &:hover {
        transition: 0.2s ease-in-out;
        color: ${theme.mainColor};
        background: white;
    }
`