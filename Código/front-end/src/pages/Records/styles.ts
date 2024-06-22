import styled from "styled-components";
import {theme} from "../../common/styles/theme";

export const TableContainer = styled.div`
    font-family: "Arial";
    color: white;
    width: 80%;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    padding: 1rem;
    border-radius: 10px;
    background-color: ${props => props.theme.mainColor};;
`

export const Title = styled.h2`
  color: #fff;
    margin: 1rem 0;
`

export const Titulo = styled.h1`
  color: ${theme.mainColor};
  font-size: 2rem;
`