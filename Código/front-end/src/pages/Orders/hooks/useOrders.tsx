import {useEffect, useState} from "react";
import {OrdersRequestService} from "../Service/OrdersResponseService";
import {OrderProps} from "../../../components/ItemPedidos";


export const useOrders = () => {
    const [orders, setOrders] = useState<OrderProps[] | undefined>(undefined);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await OrdersRequestService().callOrdersRequestApi();
                if (response && response.data) {
                    setOrders(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return {
        orders,
    };
};
