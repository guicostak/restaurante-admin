import {AxiosResponse} from 'axios'
import {axiosInstance} from "../../../common/axios/axios-intance";

export const ItemsRequestService = () => {
    const callItemsRequestApi = async (): Promise<AxiosResponse | undefined> => {
        return await axiosInstance.get(`items`)
    }
    return {
        callItemsRequestApi
    }
}