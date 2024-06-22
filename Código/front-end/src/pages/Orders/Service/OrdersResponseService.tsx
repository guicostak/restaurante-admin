import {AxiosResponse} from 'axios';
import {axiosInstance} from "../../../common/axios/axios-intance";

export const OrdersRequestService = () => {
    const callOrdersRequestApi = async (): Promise<AxiosResponse<any> | undefined> => {
        return await axiosInstance.get(`orders`);
    }
    return {
        callOrdersRequestApi
    }
}
