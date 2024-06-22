import React from "react";
import {BodyPagina, Titulo} from "./styles";
import {useOrders} from "./hooks/useOrders";
import {NavbarAdmin} from "../../components/NavbarAdmin";
import {Col, Row} from "antd";
import {ItemPedidos} from "../../components/ItemPedidos";
import LoadingDots from "../../common/utils/LoadingDots";
import Status from "../../components/Status";

export const Orders: React.FC = () => {
    const {orders} = useOrders();
    console.log(orders);

    const statusTypes = ['PEDIDO', 'EM_PREPARO', 'PRONTO', 'CANCELADO'];

    return (
        <BodyPagina>
            <NavbarAdmin/>
            <Titulo>Pedidos</Titulo>
            {orders ? (
                <Row justify="center" style={{width: '80%'}}>
                    <Row justify="center" style={{marginInline: '1.5rem', width: '100%'}}>
                        {statusTypes.map((statusType) => {
                            const ordersWithStatus = orders.filter(order => order.status === statusType);

                            if (ordersWithStatus.length > 0) {
                                return (
                                    <Col key={statusType} span={8}
                                         style={{
                                             display: 'flex',
                                             flexDirection: 'column',
                                             alignItems: 'center',
                                             borderInline: statusType === 'EM_PREPARO' ? '1px solid #c8c1c1' : undefined
                                         }}>
                                        <Status status={statusType}/>
                                        {ordersWithStatus.map(order => (
                                            <ItemPedidos
                                                key={order.id}
                                                id={order.id}
                                                nameClient={order.nameClient}
                                                phoneClient={order.phoneClient}
                                                suggestion={order.suggestion || ""}
                                                selectedItems={
                                                    order.selectedItems?.map((selectedItem) => ({
                                                        quantity: selectedItem.quantity,
                                                        item: {
                                                            id: selectedItem.item?.id || 0,
                                                            title: selectedItem.item?.title || "N/A",
                                                            description: selectedItem.item?.description || "",
                                                            price: selectedItem.item?.price || 0,
                                                            quantity: selectedItem.item?.quantity || 0,
                                                            image: selectedItem.item?.image || ""
                                                        }
                                                    })) || []
                                                }
                                                status={order.status}
                                            />
                                        ))}
                                    </Col>
                                );
                            }
                        })}
                    </Row>
                </Row>
            ) : (
                <LoadingDots/>
            )}
        </BodyPagina>
    );
};