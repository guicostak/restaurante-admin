import {useCallback, useState} from 'react'
import {loginService} from '../service/loginAdminService'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

export interface ILoginAdminFormValues {
    email: string
    password: string
}

export const useLoginAdmin = () => {
  const { callLoginAdminApi } = loginService()
  const navigate = useNavigate()

  const [loginFormValues, setLoginFormValues] =
    useState<ILoginAdminFormValues>({
        email: '',
        password: ''
    })

    const handleLoginAdminFormChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event.target;
            setLoginFormValues(prevState => ({
            ...prevState,
            [name]: value
            }));
        },
        []
    );    

  const handleLoginAdminFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      const response = await callLoginAdminApi(loginFormValues)
      if (!response) {
        throw new Error('Não foi possível logar em sua conta')
        } 
      else {
        sessionStorage.setItem('userId', response.data.id);

        Swal.fire({
          icon: 'success',
          title: 'Bem vindo!',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('isLogado', 'true')
        window.location.reload();
      }
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Não foi possível fazer login',
          showConfirmButton: false,
          timer: 1500
        })
    }
  }

  return {
    loginFormValues,
    handleLoginAdminFormChange,
    handleLoginAdminFormSubmit,
  }
}
