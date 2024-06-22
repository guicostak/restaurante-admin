import {AxiosResponse} from 'axios'
import {axiosInstance} from "../../../common/axios/axios-intance";

export const recordsResponseService = () => {
    const callRecordsRequestApi = async (): Promise<AxiosResponse<any> | undefined> => {
        return await axiosInstance.get(`reports`);
    };
    return {
        callRecordsRequestApi
    }
};