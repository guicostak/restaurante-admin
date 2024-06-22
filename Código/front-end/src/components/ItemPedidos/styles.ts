import styled from 'styled-components';

export const OrderCard = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.5rem;
    padding: 0 2rem;
    width: 20rem;
    height: 25rem;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: white;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    &:hover {
        transition: 0.3s;
        transform: scale(1.03);
    }
`

export const ClientId = styled.h1 `
font-size: 1rem;
color: white;
`


export const ClientName = styled.h1`
    font-size: 1rem;
    color: white;
`

export const ClientPhone = styled.h1 `
    font-size: 1rem;
    color: white;
`

export const OrderNotes = styled.p `
    font-size: 0.9rem;
    color: white;
`

export const OrderItems = styled.p `
    
    font-size: 0.9rem;
    color: white;
`

export const ItemQuantity = styled.p `
    font-size: 0.9rem;
    color: white;
    margin-top: 0.3rem;
`

export const Labels = styled.h3 `
    font-size: 0.9rem;
    color: white;
`

export const HeaderCard = styled.div `
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`