import React, {useCallback, useState} from 'react';
import {ItemDescription, ItemImage, ItemInfo, ItemMenuCard, ItemTitle, Options} from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {useItemMenuAdmin} from './hooks/useItemMenuAdmin';
import Swal from 'sweetalert2';
import Modal from '../Modal';
import {Col, Form, Input, Select} from 'antd';
import {CustomizedButton} from '../../pages/MenuItems/styles'
import {IRegisterItemFormValues} from '../../pages/MenuItems/hooks/useItemListingAdmin';
import ImageUpload from "../../pages/MenuItems/hooks/imageUpload";
import {getItemType} from "../../pages/MenuItems/services/itemListingAdminService";

const itemTypes = await getItemType();

export interface ItemMenuProps {
    image: string;
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
    type: string;
}

export const ItemMenuAdmin: React.FC<ItemMenuProps> = ({image, id, title, description, price, quantity, type}) => {
    const {deletarItem, alterarItem} = useItemMenuAdmin();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [animationModal, setAnimationModal] = useState<boolean>(false);
    const modalWidthsArray = {"desktop": 30, "tablet": 60, "mobile": 22};

    const [itensFormValues, setItensFormValues] =
        useState<ItemMenuProps>({
            id: id,
            title: title,
            description: description,
            price: price,
            quantity: quantity,
            type: type,
            image: image
        })

    const handleItemListingFormChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const {name, value} = event.target;
            setItensFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        },
        []
    );

    const handleItemListingSelectChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const {name, value} = {name: "type", value: event};
            setItensFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        },
        []
    );

    const openModal = () => {
        setIsOpenModal(true);
        setAnimationModal(true);
    }

    const [form] = Form.useForm();

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Tem certeza que deseja deletar esse item?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            customClass: {
                title: 'custom-swal-title'
            }
        });

        if (result.isConfirmed) {
            await deletarItem(id);
            Swal.fire({
                title: 'Deletado!',
                text: 'Item excluído com sucesso.',
                icon: 'success',
                customClass: {
                    title: 'custom-swal-title'
                }
            })
            setTimeout(() => {
                window.location.reload();
            }, 700);
        }
    }

    const handleFormSubmit = async (values: IRegisterItemFormValues) => {
        const result = await alterarItem({...itensFormValues, ...values});
        if (result === true) {
            Swal.fire({
                title: 'Alterado!',
                text: 'Item alterado com sucesso.',
                icon: 'success',
                customClass: {
                    title: 'custom-swal-title',
                }
            })
            setTimeout(() => {
                window.location.reload();
            }, 700);
        }
    };

    return (
        <ItemMenuCard>
            <Options>
                <FontAwesomeIcon style={{cursor: "pointer"}} icon={faEdit} onClick={() => openModal()}/>
                <FontAwesomeIcon style={{cursor: "pointer"}} icon={faTrashAlt} onClick={() => handleDelete(id)}/>
            </Options>
            <ItemImage src={image} alt={title}/>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
            <ItemInfo>R${price}</ItemInfo>
            <ItemInfo>Unidades: {quantity}</ItemInfo>

            <Modal
                $zindex="2"
                $closeactionprop={() => setIsOpenModal(false)}
                $isopen={isOpenModal}
                $animation={animationModal}
                $animationactionprop={() => setAnimationModal(false)}
                $modalwidths={modalWidthsArray}
            >
                <Col span={24}>
                    <Form
                        layout='vertical'
                        form={form}
                        name="createProduct"
                        onFinish={handleFormSubmit}
                        initialValues={itensFormValues}
                        style={{width: '20rem'}}
                        scrollToFirstError>
                        <Form.Item
                            name="title"
                            label="Nome"
                            rules={[{
                                required: true,
                                message: 'Por favor, digite o nome do produto!',
                                whitespace: true
                            }]}>
                            <Input name="title" maxLength={30}
                                   placeholder='Produto' onChange={handleItemListingFormChange}/>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Descrição"
                            rules={[{
                                required: true,
                                message: 'Por favor, digite a descrição do produto!',
                                whitespace: true
                            }]}>
                            <Input name="description"
                                   maxLength={250}
                                   placeholder='Descrição do produto'
                                   onChange={handleItemListingFormChange}/>
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="Valor"
                            rules={[{required: true, message: 'Por favor, digite o preço do produto!'}]}>
                            <Input name="price" type="number" step={0.01} min={0} maxLength={14}
                                   placeholder='R$ 3,00'
                                   onChange={handleItemListingFormChange}/>
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                            label="Quantidade em estoque"
                            rules={[{
                                required: true,
                                message: 'Por favor, digite a quantidade disponível do produto!'
                            }]}>
                            <Input name="quantity" type="number" step={1} min={0} maxLength={3} placeholder='20'
                                   onChange={handleItemListingFormChange}/>
                        </Form.Item>
                        <Form.Item name="type"
                                   label="Tipo do produto"
                                   rules={[{required: true, message: 'Por favor, selecione o tipo para o produto!'}]}>
                            <Select
                                placeholder="Selecione o tipo de produto"
                                optionFilterProp="children"
                                onChange={handleItemListingSelectChange}
                                options={itemTypes}
                            />
                        </Form.Item>
                        <Form.Item
                            name="image"
                            label="Upload da imagem"
                            rules={[{required: true, message: 'Por favor, selecione uma foto para o produto!'}]}>
                            <ImageUpload onChange={handleItemListingFormChange}/>
                        </Form.Item>
                        <Form.Item>
                            <CustomizedButton type="submit">
                                Alterar
                            </CustomizedButton>
                        </Form.Item>
                    </Form>
                </Col>
            </Modal>
        </ItemMenuCard>
    );
};
