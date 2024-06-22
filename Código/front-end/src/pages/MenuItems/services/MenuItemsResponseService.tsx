import {AxiosResponse} from 'axios'
import {axiosInstance} from "../../../common/axios/axios-intance";

export const MenuItemsRequestService = () => {
    const callMenuItemsRequestApi = async (): Promise<AxiosResponse | undefined> => {
        return await axiosInstance.get(`items`)
    }
    return {
        callMenuItemsRequestApi
    }
}