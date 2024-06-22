import {
    AddProduto,
    BodyPagina,
    Filtros,
    Titulo,
    SelectTipoItem,
    Search,
    SearchDiv,
    BotaoFiltros,
    CustomizedButton
} from './styles';
import {Row, Select, Col, Form, Input,} from "antd";
import {NavbarAdmin} from "../../components/NavbarAdmin";
import {useMenuItems} from "./hooks/useMenuItems";
import {ItemMenuAdmin} from '../../components/ItemMenuAdmin';
import LoadingDots from '../../common/utils/LoadingDots';
import {faFilter, faMagnifyingGlass, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {theme} from '../../common/styles/theme';
import {useState} from 'react';
import {useItemListingAdmin} from './hooks/useItemListingAdmin'
import ImageUpload from "./hooks/imageUpload";
import {getItemType} from "./services/itemListingAdminService";
import Modal from '../../components/Modal';

const itemTypes = await getItemType();

export const MenuItems: React.FC = () => {
    const {
        items,
        handleAddButton,
        filtrarTipoItem,
        handleSearch,
        itemTypeFilter,
        searchTerm,
        removerFiltros,
        applyFilters
    } = useMenuItems();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [animationModal, setAnimationModal] = useState<boolean>(false);
    const modalWidthsArray = {"desktop": 30, "tablet": 60, "mobile": 22};

    const openModal = () => {
        setIsOpenModal(true);
        setAnimationModal(true);
    }

    const {
        handleItemListingFormChange,
        handleItemListingFormSubmit,
        registerItemFormValues,
        handleItemListingSelectChange
    } = useItemListingAdmin()

    const [form] = Form.useForm();

    return (
        <BodyPagina>
            <NavbarAdmin/>
            <Titulo>Cardápio</Titulo>
            <Row justify="center" align="top">
                <Filtros>
                    <Row style={{gap: '1rem'}} justify="center" align="middle">
                        <FontAwesomeIcon style={{color: 'white'}} icon={faFilter}/>
                        <h3 style={{color: 'white'}}>Filtros</h3>
                    </Row>
                    <Row style={{gap: '1rem'}} justify="center" align="middle">
                        <SelectTipoItem
                            value={itemTypeFilter}
                            style={{width: 200}}
                            onChange={filtrarTipoItem}
                        >
                            <option value="">Todos</option>
                            <option value="BEBIDAS">Bebidas</option>
                            <option value="SALGADOS">Salgados</option>
                            <option value="MACARRAO_NA_CHAPA">Macarrão na Chapa</option>
                            <option value="DOCES">Doces</option>
                            <option value="CACHORRO_QUENTES">Cachorro Quentes</option>
                            <option value="ACOMPANHAMENTOS">Acompanhamentos</option>
                        </SelectTipoItem>
                        <SearchDiv>

                            <FontAwesomeIcon style={{color: theme.mainColor}} icon={faMagnifyingGlass}/>
                            <Search
                                type="text"
                                value={searchTerm}
                                placeholder="Pesquisar produto..."
                                onChange={handleSearch}
                            />
                        </SearchDiv>
                    </Row>
                    <Row style={{width: '100%'}} justify="space-between" align="top">
                        <BotaoFiltros onClick={removerFiltros}>
                            <p>Limpar filtros</p>
                        </BotaoFiltros>
                        <BotaoFiltros onClick={removerFiltros}>
                            <p><FontAwesomeIcon onClick={() => applyFilters} style={{marginRight: '0.3rem'}}
                                                icon={faFilter}/> Aplicar filtros</p>
                        </BotaoFiltros>
                    </Row>
                </Filtros>
                <AddProduto type="button" onClick={() => openModal()}><FontAwesomeIcon style={{marginRight: '0.3rem'}}
                                                                                       icon={faPlusCircle}/> Novo
                    Produto</AddProduto>
            </Row>
            {items ? (
                <Row justify="center" style={{width: '80%'}}>
                    <Row justify="start" align="middle">
                        {items.map(item => (
                            <ItemMenuAdmin
                                key={item.id}
                                image={item.image}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                quantity={item.quantity}
                                type={item.type}
                            />
                        ))}
                    </Row>

                </Row>
            ) : (
                <LoadingDots/>
            )}
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
                        onFinish={handleItemListingFormSubmit}
                        initialValues={registerItemFormValues}
                        style={{maxWidth: 600}}
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
                            name="value"
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
                                   rules={[{
                                       required: true,
                                       message: 'Por favor, selecione o tipo para o produto!'
                                   }]}>
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
                                Cadastrar
                            </CustomizedButton>
                        </Form.Item>
                    </Form>
                </Col>
            </Modal>
        </BodyPagina>
    );
};
