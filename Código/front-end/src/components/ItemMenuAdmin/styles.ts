import styled from 'styled-components';

export const ItemMenuCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem 2rem 2rem;
    margin: 1.5rem;
    width: 20rem;
    height: 35rem;
    border-radius: 20px;
    background-color: ${props => props.theme.background};
    color: white;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`

export const ItemImage = styled.img`
    width: 100%;
    height: 15rem;
    border-radius: 40px;
`

export const ItemTitle = styled.h2`
    margin-block: 20px;
    font-size: 1.4rem;
`

export const ItemDescription = styled.p `
margin-bottom: 15px;
font-size: 0.8rem;
`

export const ItemInfo = styled.p `
margin-bottom: 5px;
font-size: 14px;
`

export const Options = styled.div`
    display: flex;
    margin-bottom: 2rem;
    margin-top: 2rem;
    gap: 1rem;
`