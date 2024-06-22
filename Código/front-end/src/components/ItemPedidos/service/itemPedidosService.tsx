import {axiosInstance} from '../../../common/axios/axios-intance';
import {AxiosResponse} from 'axios';

export const itemOrderService = () => {

    const alterarStatus= async (id: number, status: string): Promise<AxiosResponse | undefined> => {
        const endpoint = `orders/${id}`;
        return await axiosInstance.patch(endpoint, { status: status });
    };  

    return {
        alterarStatus,
    };
};

