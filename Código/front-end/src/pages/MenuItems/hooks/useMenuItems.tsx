import { useEffect, useState } from "react";
import { IItemMenuRequestData } from '../../../components/ItemMenu';
import { useNavigate } from "react-router-dom";
import { MenuItemsRequestService } from "../services/MenuItemsResponseService";

export const useMenuItems = () => {
    const [items, setItems] = useState<IItemMenuRequestData[] | undefined>(undefined);
    const [filteredItems, setFilteredItems] = useState<IItemMenuRequestData[] | undefined>(undefined);
    const [itemTypeFilter, setItemTypeFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>(""); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await MenuItemsRequestService().callMenuItemsRequestApi();
                console.log(response);
                if (response) {
                    setItems(response.data);
                    setFilteredItems(response.data); 
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = items;

        if (itemTypeFilter) {
            filtered = filtered?.filter(item => item.type === itemTypeFilter);
        }

        if (searchTerm) {
            filtered = filtered?.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    }, [itemTypeFilter, searchTerm, items]);

    const handleAddButton = () => {
        navigate("register");
    };

    const filtrarTipoItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        console.log(value);
        setItemTypeFilter(value);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        console.log(value);
        setSearchTerm(value);
    };

    const removerFiltros = () => {
        setItemTypeFilter("");
        setSearchTerm("");
        setFilteredItems(items);
    };

     const applyFilters = (items: IItemMenuRequestData[]) => {
        let filtered = items;

        if (itemTypeFilter) {
            filtered = filtered?.filter(item => item.type === itemTypeFilter);
        }

        if (searchTerm) {
            filtered = filtered?.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    return {
        items: filteredItems,
        handleAddButton,
        filtrarTipoItem,
        handleSearch,
        itemTypeFilter,
        searchTerm,
        removerFiltros, 
        applyFilters
    };
};
