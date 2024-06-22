import {axiosInstance} from '../../../common/axios/axios-intance';
import {AxiosResponse} from 'axios';
import {ItemMenuProps} from '..';

export const itemCardapioService = () => {
    const deleteItem = async (id: number): Promise<AxiosResponse | undefined> => {
        const endpoint = 'items';
        return await axiosInstance.delete(`${endpoint}/${id}`);
    };

    const alterarItem = async (item: ItemMenuProps): Promise<AxiosResponse | undefined> => {
        const endpoint = `items/${item.id}`;
        return await axiosInstance.patch(endpoint, item);
    };  

    return {
        deleteItem,
        alterarItem,
    };
};

