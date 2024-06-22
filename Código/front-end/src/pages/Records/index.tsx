import React, { useEffect, useRef, useState } from "react";
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from "antd";
import { TableContainer, Title } from "./styles";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { NavbarAdmin } from "../../components/NavbarAdmin";
import { Titulo } from "../MenuItems/styles";
import { BodyPagina } from "../Orders/styles";
import { useRecords } from "./hooks/useRecords";

export const Records: React.FC = () => {

    type DataIndex = keyof IDataType;

    const { records } = useRecords();
    console.log(records);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const totalRevenue = useRef<number>(0);
    const searchInput = useRef<InputRef>(null);
    const [data, setData] = useState<IDataType[]>();

    interface IDataType {
        key: number;
        product: string;
        soldAmount: number;
        revenue: number;
    };

    useEffect(() => {
        const formattedData: IDataType[] = records?.map(record => ({
            key: record.id,
            product: record.itemAssociatied.title,
            soldAmount: record.quantity,
            revenue: record.valorTotal
        })) || [];

        setData(formattedData);

        totalRevenue.current = formattedData.reduce((acc, record) => acc + record.revenue, 0);
    }, [records]);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex, name: string): TableColumnType<IDataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Pesquisar ${name}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 100 }}
                    >
                        Pesquisar
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Fechar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<IDataType> = [
        {
            title: 'Produto',
            dataIndex: 'product',
            key: 'product',
            width: "33%",
            ...getColumnSearchProps('product', "produto")
        },
        {
            title: 'Quantidade Vendida',
            dataIndex: 'soldAmount',
            key: 'soldAmount',
            width: "33%",
            sorter: (a, b) => a.soldAmount - b.soldAmount,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Receita Gerada',
            dataIndex: 'revenue',
            key: 'revenue',
            width: "33%",
            sorter: (a, b) => a.revenue - b.revenue,
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: 'descend',
            render: (value) => "R$ " + value.toFixed(2).toString().replace(".", ",")
        },
    ];

    return (
        <BodyPagina>
            <NavbarAdmin />
            <Titulo>Relatório</Titulo>
            <TableContainer>
                <Title>Receita total gerada: R$ {totalRevenue.current.toFixed(2).toString().replace(".", ",")} </Title>
                <Table
                    dataSource={data}
                    columns={columns}
                >
                </Table>
            </TableContainer>
        </BodyPagina>
    );
};