import {itemCardapioService} from "../service/itemCardapioService";
import {ItemMenuProps} from "..";

export const useItemMenuAdmin = () => {


    const service = itemCardapioService();

    const deletarItem = async (id: number) => {
        try {
            const response = await service.deleteItem(id);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }

    const alterarItem = async (item: ItemMenuProps) => {
        try {
            const response = await service.alterarItem(item);
            if(response) {return true}
        } catch (error) {
            console.error('Error deleting item:', error);
        }   
    }

    return {
        deletarItem,
        alterarItem        
    };
};
