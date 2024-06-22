import {ICustomerRequestData} from "../hooks/useCustomerRequest";
import {axiosInstance} from '../../../common/axios/axios-intance'
import {AxiosResponse} from 'axios'

export const CustomerRequestService = () => {
    const callCustomerRequestApi = async (
        customerRequestFormValues: ICustomerRequestData
    ): Promise<AxiosResponse | undefined> => {
        try {

            const requestEndpoint = 'http://localhost:8080/orders'

            const request = {
                nameClient: customerRequestFormValues.nameClient,
                phoneClient: customerRequestFormValues.phoneClient,
                selectedItems: customerRequestFormValues.selectedItems,
                suggestion: customerRequestFormValues.suggestion
            } satisfies ICustomerRequestData

            console.log(request)
            return await axiosInstance.post(`${requestEndpoint}`, request)

        } catch (error) {
            console.error(error)
            return undefined
        }
    }
    return {
        callCustomerRequestApi
    }
}
