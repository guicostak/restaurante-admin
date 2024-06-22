import React from 'react';
import {
    ClientId,
    ClientName,
    ClientPhone,
    HeaderCard,
    ItemQuantity,
    Labels,
    OrderCard,
    OrderItems,
    OrderNotes
} from './styles';
import Status from "../Status";
import {useItemPedidos} from './hook/useItemPedidos';
import {Flex, Select} from "antd";
import Swal from "sweetalert2";

export interface OrderProps {
    id: number;
    nameClient: string;
    phoneClient: number;
    suggestion?: string;
    selectedItems?: Array<{
        quantity: number;
        item?: {
            id: number;
            title: string;
            description: string;
            price: number;
            quantity: number;
            image: string;
        };
    }>;
    status: string;
}

export const ItemPedidos: React.FC<OrderProps> = ({
                                                      id,
                                                      nameClient,
                                                      phoneClient,
                                                      suggestion = "",
                                                      selectedItems = [],
                                                      status
                                                  }) => {

    const {alterarStatus} = useItemPedidos();

    function formatPhoneNumber(phoneNumber: number) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    const handleStatusChange = async (newStatus: string) => {
        const result = await alterarStatus(id, newStatus);
        if (result) {
            Swal.fire(
                'Alterado!',
                'Status do pedido alterado com sucesso.',
                'success'
            ).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            });
        }
    }

    return (
        <OrderCard>
            <HeaderCard>
                <Flex justify={"space-between"} align={"center"}>
                    <ClientId>Pedido #{id}</ClientId>
                    <Status status={status}/>
                </Flex>
            </HeaderCard>
            <Flex vertical={true} gap="0.6rem">
                <ClientName>Nome: {nameClient}</ClientName>
                <ClientPhone>Telefone: {formatPhoneNumber(phoneClient)}</ClientPhone>
                <OrderItems>
                    <Labels>Items:</Labels>
                    {selectedItems.map((selectedItem, index) => (
                        <ItemQuantity key={index}>
                            {selectedItem.item?.title ?? "N/A"}: {selectedItem.quantity} unidades
                        </ItemQuantity>
                    ))}
                </OrderItems>
                <OrderNotes>
                    {suggestion && (
                        <OrderNotes>
                            <Labels>Observação:</Labels> {suggestion}
                        </OrderNotes>
                    )}
                </OrderNotes>
                <Select defaultValue={status} style={{width: 120}} onChange={handleStatusChange}>
                    <Select.Option value="PEDIDO">Pedido</Select.Option>
                    <Select.Option value="EM_PREPARO">Em Preparo</Select.Option>
                    <Select.Option value="PRONTO">Pronto</Select.Option>
                    <Select.Option value="CANCELADO">Cancelado</Select.Option>
                    <Select.Option value="ENTREGUE">Entregue</Select.Option>
                </Select>
            </Flex>
        </OrderCard>
    );
};
