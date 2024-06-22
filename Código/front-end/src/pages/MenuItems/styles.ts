import { theme } from '../../common/styles/theme';
import styled from 'styled-components';

export const BodyPagina = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: start;
    align-items: center;
    gap: 2rem;
    padding-bottom: 5rem;
`
export const Titulo = styled.h1`
    font-family: "Arial";
    color: white;
    font-size: 2.4rem;
    font-weight: 900;
    color: ${theme.mainColor};
    margin-block: 2rem;
`
export const AddProduto = styled.button`
    width: 15rem;
    height: 3rem;
    cursor: pointer;
    background: ${theme.background};
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
        background: transparent;
    }
`

export const Filtros = styled.div`
    display: flex;
    margin-right: 2.5rem;
    padding: 1rem 2rem 2rem;
    flex-direction: column;    
    align-items: start;
    justify-content: center;
    background-color:  ${theme.mainColor};
    border-radius: 10px;
    gap: 1.5rem;
    width: 48rem;
`

export const SelectTipoItem = styled.select`
    border: none;
    outline: none;
    border-radius: 10px;
    height: 2rem;
    padding: 0.3rem;
`

export const Search = styled.input`
    border: none;
    outline: none;
    border-radius: 10px;
    height: 2rem;
    width: 28rem;
    padding: 1rem;
`

export const SearchDiv = styled.div`
    border: none;
    outline: none;
    border-radius: 10px;
    height: 2rem;   
    background-color: white;
    width: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const BotaoFiltros = styled.div`
    display: flex;
    flex-direction: row;    
    align-items: center;
    justify-content: center;
    background-color: white;
    color: ${theme.mainColor};
    width: auto;
    height: 2rem;
    padding: 1rem;
    gap: 0.5rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    border: 1px solid ${theme.mainColor};
    &:hover {
        transition: 0.2s ease-in-out;
        color: ${theme.mainColor};
        color: white;
        border: 1px solid white;
        background: transparent;
    }
    `

    export const CustomizedButton = styled.button`

    width: 20rem;
    height: 40px;
    border-radius: 40px;
    cursor: pointer;
    color: white;
    border: none;
  
    margin-block: 10px;
    background-color: ${props => props.theme.mainColor};
  
    &:hover {
        transition: 0.3s;
        background-color: ${props => props.theme.mainColorHover};
    }
  `