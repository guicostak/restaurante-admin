import {useCallback, useState} from 'react'
import {registerService} from '../service/registerAdminService'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

export interface IRegisterAdminFormValues {
    name: string
    password: string
    phoneNumber: string
    cpf: string
    email: string
}

export const useRegisterAdmin = () => {
    const {callRegisterAdminApi} = registerService()
    const navigate = useNavigate()

    const [registerFormValues, setRegisterFormValues] =
        useState<IRegisterAdminFormValues>({
            name: '',
            password: '',
            phoneNumber: '',
            cpf: '',
            email: ''
        })

    const handleRegisterAdminFormChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const {name, value} = event.target;
            setRegisterFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        },
        []
    );

    const handleRegisterAdminFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        try {
            const response = await callRegisterAdminApi(registerFormValues);

            Swal.fire({
                 icon: 'success',
                 title: 'Conta criada com sucesso!',
                 showConfirmButton: false,
                 timer: 1500
             });
            
             navigate('/login');
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: error.response.data.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }; 

    return {
        registerFormValues,
        handleRegisterAdminFormChange,
        handleRegisterAdminFormSubmit,
    }
}
