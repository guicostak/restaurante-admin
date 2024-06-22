import { CustomerRequestService } from '../services/CustomerRequestService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { ItemMenuProps } from '../../../components/ItemMenu';
import { ItemsRequestService } from "../services/ItemsRequestService";
import { OrderProps } from '../../../components/ItemPedidos';
import {itemOrderService} from '../../../components/ItemPedidos/service/itemPedidosService'

export interface ICustomerRequestData {
  nameClient: string;
  phoneClient: string;
  selectedItems: any[];
  suggestion: string;
}

export interface ISelectedItemsRequest {
  id: string;
  item: any;
  quantity: number;
}

const createItemMenu = (props: Omit<ItemMenuProps, 'quantity'> & Partial<Pick<ItemMenuProps, 'quantity'>>): ItemMenuProps => {
  return {
    ...props,
    quantity: 1,
  };
};

export const useCustomerRequest = () => {
  const { callCustomerRequestApi } = CustomerRequestService();
  const navigate = useNavigate();
  const [items, setItems] = useState<ItemMenuProps[] | undefined>(undefined);
  const [erroItems, setErroItems] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [animationModal, setAnimationModal] = useState<boolean>(false);
  const [pedidoRealizado, setPedidoRealizado] = useState<OrderProps>();
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState<boolean>(false);
  

  const [formData, setFormData] = useState<ICustomerRequestData>({
    nameClient: "",
    phoneClient: "",
    selectedItems: [],
    suggestion: ""
  });

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const serviceItem = itemOrderService();

  const cancelarPedido = async (pedidoCancelado: any) => {
    const pedidoCanceladoRequest = {
      id: pedidoCancelado.id,
      orderStatus: "CANCELADO"
    };

      const result = await Swal.fire({
        title: 'Tem certeza que deseja cancelar seu pedido?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancelar pedido',
        cancelButtonText: 'Não',
        customClass: {
            title: 'custom-swal-title'
        }
    });

    if(result.isConfirmed) {
    try {
      setIsLoadingCancel(true)
      const response = await serviceItem.alterarStatus(pedidoCanceladoRequest.id, pedidoCanceladoRequest.orderStatus);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Pedido Cancelado',
          text: 'O pedido foi cancelado com sucesso!',
          showConfirmButton: true,
          timer: 3000
        });
        setTimeout(()=>{
          // window.location.reload();
        },200)
        return true;
      }
    } catch (error) {
      console.error('Error to update order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao Cancelar',
        text: 'Não foi possível cancelar o pedido. Por favor, tente novamente.',
        showConfirmButton: true,
        timer: 3000
      });
    }
    setIsLoadingCancel(false)
  }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    
    if (!validaForm()) {
      return;
    }

    const selectedItems = items?.filter(item => item.isSelected) || [];
    const selectedItemsRequest: any[] = [];
    
    selectedItems.forEach(item => {
      selectedItemsRequest.push({
        id: item.id,
        item: item,
        quantity: item.quantity
      });
    });

    const customerRequestFormValues: ICustomerRequestData = {
      nameClient: formData.nameClient,
      phoneClient: formData.phoneClient,
      selectedItems: selectedItemsRequest,
      suggestion: formData.suggestion,
    };

    try {
      setIsLoadingOrder(true)
      const response = await callCustomerRequestApi(customerRequestFormValues);

      if (!response) {
        await Swal.fire({
          icon: 'error',
          title: 'Não foi possível realizar seu pedido',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }

      console.log(response.data)
      setPedidoRealizado(response.data);
      setIsOpenModal(true);
      setAnimationModal(true);

    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Não foi possível realizar seu pedido',
        showConfirmButton: false,
        timer: 1500
      });
    }
    setIsLoadingOrder(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrorMessage(false);
  };

  const confirmContact = () => {
    if (validateContact()) {
      const itemsSelectionElement = document.getElementById('itemsSelection');
      itemsSelectionElement?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateContact = () => {
    const { nameClient, phoneClient } = formData;
    if (!nameClient || !phoneClient) {
      setErrorMessage(true);
      return false;
    } else {
      setErrorMessage(false);
      return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ItemsRequestService().callItemsRequestApi();
        if (response) {
          const itemsWithDefaults = response.data.map((item: Omit<ItemMenuProps, 'quantity'> & Partial<Pick<ItemMenuProps, 'quantity'>>) =>
            createItemMenu(item)
          );
          setItems(itemsWithDefaults);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChangeQuantity = (itemId: string, newQuantity: number) => {
    if (items != undefined) {
      const updatedItems = items.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setItems(updatedItems);
    }
  };

  const handleIsSelected = (itemId: string, newValue: boolean) => {
    if (items != undefined) {
      const updatedItems = items.map(item => {
        if (item.id === itemId) {
          return { ...item, isSelected: newValue };
        }
        return item;
      });
      setErroItems(false);
      setItems(updatedItems);
    }
  };

  const validaItensSelect = (): boolean => {
    return items?.some(item => item.isSelected) ?? false;
  };

  const validaForm = (): boolean => {
    const isValid = validaItensSelect();
    setErroItems(!isValid);
    return isValid;
  };  

  return {
    handleSubmit,
    formData,
    errorMessage,
    erroItems,
    handleChange,
    confirmContact,
    handleChangeQuantity,
    handleIsSelected,
    validaItensSelect,
    items, 
    isOpenModal,
    setIsOpenModal,
    animationModal,
    setAnimationModal,
    pedidoRealizado,
    cancelarPedido, 
    isLoadingOrder,
    isLoadingCancel
  };
};
