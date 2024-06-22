import {ILoginAdminFormValues} from '../hooks/useLoginAdmin'
import {axiosInstance} from '../../../common/axios/axios-intance'
import {AxiosResponse} from 'axios'

export const loginService = () => {
    const callLoginAdminApi = async (
    registerFormValues: ILoginAdminFormValues
    ): Promise<AxiosResponse | undefined> => {
    try {

    const registerEndpoint = 'users/login'

    const request = {
        email: registerFormValues.email,
        password: registerFormValues.password
    } satisfies ILoginAdminFormValues

    console.log(request)
        return await axiosInstance.post(
        `${registerEndpoint}`,
        request
    )
    } catch (error) {
        console.error(error)
    }
}

  return {
    callLoginAdminApi
  }
}
