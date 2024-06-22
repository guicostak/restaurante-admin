import styled from 'styled-components';

export const BodyPagina = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    gap: 2rem;
    padding-bottom: 5rem;
`

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 2rem;
    margin-top: 2rem;
`

export const Titulo = styled.h1`
    font-family: "Arial";
    color: white;
    font-size: 2.4rem;
    font-weight: 900;
    margin-block: 2rem;
    color: ${props => props.theme.mainColor};
`