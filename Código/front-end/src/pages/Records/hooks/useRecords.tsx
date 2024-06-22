import { useEffect, useState } from "react";
import { recordsResponseService } from "../services/recordsResponseService";

export interface IRecords {
    id: number,
    itemAssociatied: {
        id: number,
        title: string,
        description: string,
        price: number,
        quantity: number,
        image: string
    },
    quantity: number,
    valorTotal: number
};

export const useRecords = () => {
    const [records, setRecords] = useState<IRecords[] | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await recordsResponseService().callRecordsRequestApi();
                if (response && response.data) {
                    setRecords(response.data);
                }
            } catch(error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return {
        records
    };
};