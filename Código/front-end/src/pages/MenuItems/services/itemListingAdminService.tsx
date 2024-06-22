import {IRegisterItemFormValues} from '../hooks/useItemListingAdmin'
import {axiosInstance} from '../../../common/axios/axios-intance'
import {AxiosResponse} from 'axios'

export const registerService = () => {
    const callRegisterAdminApi = async (
        registerFormValues: IRegisterItemFormValues
    ): Promise<AxiosResponse | undefined> => {
        try {
            const registerEndpoint = 'items'
            console.log(registerFormValues)
            const request = {
                title: registerFormValues.title,
                description: registerFormValues.description,
                price: registerFormValues.price,
                quantity: registerFormValues.quantity,
                image: registerFormValues.image,
                type: registerFormValues.type
            } satisfies IRegisterItemFormValues
            
            return await axiosInstance.post(
                `${registerEndpoint}`,
                request
            )
        } catch (error) {
            console.error(error)
        }
    }
    return {
        callRegisterAdminApi
    }
}
export const getItemType = async (): Promise<{ label: any, value: any }[]> => {
    try {
        const registerEndpoint = 'items/types';
        const response = await axiosInstance.get(`${registerEndpoint}`);
        return Object.entries(response.data)
            .map(([key, value]) => ({value: key, label: value}));
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const getItemTypes = async () => {
    try {
        const typesEndpoint = 'items/types';
        const response = await axiosInstance.get(typesEndpoint);
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error; 
    }
};