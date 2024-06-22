import {itemOrderService} from "../service/itemPedidosService";

export const useItemPedidos = () => {


    const service = itemOrderService();


    const alterarStatus = async (id: number, status: string) => {
        try {
            const response = await service.alterarStatus(id, status);
            if (response) {
                return true
            }
        } catch (error) {
            console.error('Error to update order:', error);
        }
    }

    return {
        alterarStatus,
    };
};
