import React, { useCallback, useState } from 'react';
import { registerService } from '../services/itemListingAdminService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export interface IRegisterItemFormValues {
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    type: string;
}

export const useItemListingAdmin = () => {
    const { callRegisterAdminApi } = registerService();
    const navigate = useNavigate();

    const [registerItemFormValues, setRegisterItemFormValues] =
        useState<IRegisterItemFormValues>({
            title: '',
            description: '',
            price: 0,
            quantity: 0,
            image: '',
            type: ''
        });

    const handleItemListingFormChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = event.target;
            setRegisterItemFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        },
        []
    );

    const handleItemListingSelectChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const { name, value } = { name: "type", value: event };
            setRegisterItemFormValues(prevState => ({
                ...prevState,
                [name]: value
            }));
        },
        []
    );

    const handleItemListingFormSubmit = async (): Promise<void> => {
        try {
            const response = await callRegisterAdminApi(registerItemFormValues);
            if (!response) {
                throw new Error('Não foi possível cadastrar seu produto');
            }

            await Swal.fire({
                icon: 'success',
                title: 'Produto cadastrado com sucesso!',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    title: 'custom-swal-title',
                }
            });
            window.location.reload();

        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Não foi possível cadastrar seu produto',
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    title: 'custom-swal-title',
                }
            });
        }
    };

    return {
        registerItemFormValues: registerItemFormValues,
        handleItemListingFormChange: handleItemListingFormChange,
        handleItemListingFormSubmit: handleItemListingFormSubmit,
        handleItemListingSelectChange: handleItemListingSelectChange,
    };
};
