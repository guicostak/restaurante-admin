import React from 'react';
import {StatusStyled} from './styles';

interface StatusProps {
    status: string | undefined;
}

const Status: React.FC<StatusProps> = ({ status }) => {
    switch (status) {
        case 'PEDIDO':
            return <StatusStyled >Pedido</StatusStyled>;
        case 'EM_PREPARO':
            return <StatusStyled style={{backgroundColor: '#ffcc00'}}>Em Preparo</StatusStyled>;
        case 'PRONTO':
            return <StatusStyled style={{backgroundColor: '#81d546'}}>Pronto</StatusStyled>;
        case 'CANCELADO':
            return <StatusStyled style={{backgroundColor: '#e03b24'}}>Cancelado</StatusStyled>;
        default:
            return null;
    }
};

export default Status;