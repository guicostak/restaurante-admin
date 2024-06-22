import React, { useState } from "react";
import {FormContainer, 
    ObservationsCard, 
    ObservationsInput, 
    RequestButton,   
    CardContactInformation,
    ContactButton,
    ContactInformationContainer,
    ErrorMessage,
    Input,
    Label,
    Textfield,
    Titulo,
    TituloPagina,
    ItemsSelectionContainer, 
    TitleItemSelected,
    ErroItems,
    TituloPedidoRealizado,
    TextoPedidoRealizado,
    BotaoCancelarPedido
} from './styles'
import {useCustomerRequest} from "./hooks/useCustomerRequest";
import LoadingDots from "../../common/utils/LoadingDots";
import {Flex, Row, Select} from "antd";
import { ItemMenu } from "../../components/ItemMenu";
import Modal from "../../components/Modal";
import { ClientId, ClientName, ClientPhone, HeaderCard, ItemQuantity, Labels, OrderCard, OrderItems, OrderNotes } from "../../components/ItemPedidos/styles";
import { ItemPedidos } from "../../components/ItemPedidos";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../common/styles/theme";
import Status from "../../components/Status";
import { BotaoFiltros } from "../MenuItems/styles";

export const CustomerRequest: React.FC = () => {
    const {
        handleSubmit,
        formData, 
        errorMessage, 
        handleChange, 
        confirmContact,
        handleChangeQuantity, 
        handleIsSelected,
        validaItensSelect,
        items,
        erroItems,
        setAnimationModal,
        setIsOpenModal,
        isOpenModal,
        animationModal,
        pedidoRealizado,
        cancelarPedido, 
        isLoadingOrder,
        isLoadingCancel
    } = useCustomerRequest();
    const modalWidthsArray = {"desktop": 35, "tablet": 60, "mobile": 22};
    function formatPhoneNumber(phoneNumber: number | undefined) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }

    return (        
    <FormContainer onSubmit={handleSubmit}>
        <ContactInformationContainer>
            <TituloPagina>Faça seu pedido!</TituloPagina>
            <CardContactInformation> 
                <Titulo>Digite os dados para contato</Titulo>
                <Textfield>
                    <Label>Nome</Label>
                    <Input name="nameClient" placeholder='Digite seu nome' value={formData.nameClient} onChange={handleChange}/>
                </Textfield>
                <Textfield>
                    <Label>Telefone</Label>
                    <Input maxLength={11} name="phoneClient" placeholder='Digite seu telefone' value={formData.phoneClient} onChange={handleChange}/>
                </Textfield>
                <ContactButton type="button" onClick={confirmContact}>Continuar</ContactButton>
                <ErrorMessage style={{display: errorMessage ? "flex" : "none"}}><p>Preencha todos os campos do formulário*</p></ErrorMessage>
            </CardContactInformation>
        </ContactInformationContainer>

        <ItemsSelectionContainer id="itemsSelection">
                <TitleItemSelected>Selecione os seus items</TitleItemSelected>
                {items ? (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Row justify="center" align="middle">
                            {items
                                .filter(item => !item.isSelected)
                                .map(item => (
                                    <ItemMenu
                                        key={item.id}
                                        image={item.image}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onChangeQuantity={(newQuantity) => handleChangeQuantity(item.id, newQuantity)}
                                        isSelected={item.isSelected}
                                        onItemSelected={(newValue) => handleIsSelected(item.id, newValue)}
                                    />
                                ))
                            }
                        </Row>
                    </div>
                ) : <LoadingDots/>
                }
                
                {validaItensSelect() && items? (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <TitleItemSelected>Items selecionados</TitleItemSelected>
                        <Row justify="center" align="middle">
                            {items
                                .filter(item => item.isSelected)
                                .map(item => (
                                    <ItemMenu
                                        key={item.id}
                                        image={item.image}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onChangeQuantity={(newQuantity) => handleChangeQuantity(item.id, newQuantity)}
                                        isSelected={item.isSelected}
                                        onItemSelected={(newValue) => handleIsSelected(item.id, newValue)}
                                    />
                                ))
                            }
                        </Row>
                    </div>
                ) : ""
                }
            </ItemsSelectionContainer>


        <ObservationsCard id="observations">
            <ObservationsInput name="suggestion" placeholder="Ex: sem cebola, sem picles, sem alface ..." value={formData.suggestion}
                                onChange={handleChange}/>

            <ErroItems style={{display: erroItems ? 'flex' : 'none' }}>Por favor selecione items no cardápio</ErroItems>
            <div style={{display: isLoadingOrder ? 'flex' : 'none'}}>
                <LoadingDots />
            </div>
            <RequestButton>Fazer pedido</RequestButton>
        </ObservationsCard>

        <Modal
                $zindex="2"
                $closeactionprop={() => setIsOpenModal(false)}
                $isopen={isOpenModal}
                $animation={animationModal}
                $animationactionprop={() => setAnimationModal(false)}
                $modalwidths={modalWidthsArray}
            >
                <TituloPedidoRealizado>Pedido realizado!</TituloPedidoRealizado>    
                <OrderCard>
                    <HeaderCard>
                        <Flex justify={"space-between"} align={"center"}>
                            <ClientId>Pedido #{pedidoRealizado?.id}</ClientId>
                            <Status status={pedidoRealizado?.status}/>
                        </Flex>
                    </HeaderCard>
                    <Flex vertical={true} gap="0.6rem">
                        <ClientName>Nome: {pedidoRealizado?.nameClient}</ClientName>
                        <ClientPhone>Telefone: {formatPhoneNumber(pedidoRealizado?.phoneClient)}</ClientPhone>
                        <OrderItems>
                            <Labels>Items:</Labels>
                            {pedidoRealizado?.selectedItems?.map((selectedItem, index) => (
                                <ItemQuantity key={index}>
                                    {selectedItem.item?.title ?? "N/A"}: {selectedItem.quantity} unidades
                                </ItemQuantity>
                            ))}
                        </OrderItems>
                        <OrderNotes>
                            {pedidoRealizado?.suggestion && (
                                <OrderNotes>
                                    <Labels>Observação:</Labels> {pedidoRealizado.suggestion}
                                </OrderNotes>
                            )}
                        </OrderNotes>
                    </Flex>
                </OrderCard>
                <div style={{display: isLoadingCancel ? 'flex' : 'none'}}>
                    <LoadingDots />
                </div>
                <BotaoCancelarPedido onClick={() => cancelarPedido(pedidoRealizado)}>
                        <p >Cancelar pedido</p>   
                </BotaoCancelarPedido>
        </Modal>
    </FormContainer>
    );
};
