import {IRegisterAdminFormValues} from '../hooks/useRegisterAdmin';
import {axiosInstance} from '../../../common/axios/axios-intance';
import {AxiosResponse} from 'axios';

export const registerService = () => {
    const callRegisterAdminApi = async (
        registerFormValues: IRegisterAdminFormValues
    ): Promise<any> => { // Alterei o tipo de retorno para 'any' pois o tipo exato depende do que é retornado pelo servidor

        const registerEndpoint = 'users';

        const request = {
            name: registerFormValues.name,
            password: registerFormValues.password,
            phoneNumber: registerFormValues.phoneNumber,
            cpf: registerFormValues.cpf,
            email: registerFormValues.email
        };

        try {
            const response: AxiosResponse = await axiosInstance.post(
                `${registerEndpoint}`,
                request
            );

            const responseBody = response.data; // Aqui está o corpo da resposta
            return responseBody;
        } catch (error) {
            throw error;
        }
    };

    return {
        callRegisterAdminApi
    };
};
