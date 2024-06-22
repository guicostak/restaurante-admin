import React, {useState} from 'react';
import {InputItem, ItemButton, ItemDescription, ItemImage, ItemInfo, ItemMenuCard, ItemTitle} from './styles';

export interface ItemByOrderProps {
    id: string;
    quantity: number;
    item: ItemMenuProps
}

export interface ItemMenuProps {
    image: string;
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    isSelected: boolean;
    onChangeQuantity: (newQuantity: number) => void;
    onItemSelected: (newValue: boolean) => void;
}

export interface IItemMenuRequestData {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    type: string;
}

export const ItemMenu: React.FC<ItemMenuProps> = ({
                                                      image,
                                                      id,
                                                      title,
                                                      description,
                                                      price,
                                                      quantity,
                                                      isSelected,
                                                      onChangeQuantity,
                                                      onItemSelected
                                                  }) => {
    const [inputQuantity, setInputQuantity] = useState(quantity);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        setInputQuantity(newQuantity);
    };

    const handleInputChange = () => {
        onChangeQuantity(inputQuantity);
    };

    const handleSelectButtonClick = () => {
        onItemSelected(!isSelected);
    };

    return (
        <ItemMenuCard>
            <ItemImage src={image} alt={title}/>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
            <ItemInfo>R${price}</ItemInfo>
            <ItemInfo>Unidades:
                <InputItem
                    min={1}
                    type='number'
                    value={inputQuantity}
                    onBlur={handleInputChange}
                    onChange={handleQuantityChange}
                />
            </ItemInfo>
            <ItemButton onClick={handleSelectButtonClick}>{isSelected ? "Remover" : "Selecionar"}</ItemButton>
        </ItemMenuCard>
    );
};
