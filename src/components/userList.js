import React, { useEffect, useState } from 'react';
import { Table, Button, message, ConfigProvider, Tooltip, Modal } from 'antd';
import UserService from '../services/userService';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import Search from 'antd/es/input/Search';
const UserList = ({ onEdit, onAdd }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(users);

    useEffect(() => {
        fetchUsers();
    }, []);

    //Function to handle delete search operation
    const handleSearch = (value) => {
        setSearchText(value);
        const filtered = users.filter((user) =>
            ['firstName', 'lastName', 'username', 'phone', 'email'].some((key) =>
                user[key].toString().toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };
    
    //Initial API call to fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        UserService.getAllUsers()
            .then((res) => {
                const usersWithNames = res.map(user => {
                    const nameParts = user.name.split(' ');
                    let firstName = nameParts[0];
                    let lastName = nameParts.slice(1).join(' ');
                    if (firstName === "Mrs.") {
                        firstName = nameParts[1];
                        lastName = nameParts.slice(2).join(' ');
                    }
                    return {
                        ...user,
                        firstName,
                        lastName,
                    };
                });
                setUsers(usersWithNames);
                setFilteredData(usersWithNames);
            })
            .catch((e) => {
                message.error('Failed to fetch users.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    //Function to handle delete API request
    const handleDelete = async (id) => {
        setLoading(true)
        UserService.deleteUser(id).then((res) => {
            message.success('User deleted successfully.');
            console.log("delete");
        })
        .catch((e) => {
            message.error('Failed to fetch users.');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (e) => e || "-"
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            render: (e) => e || "-"
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (e) => e || "-"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (e) => e || "-"
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            render: (e) => e || "-"
        },
        // {
        //     title: 'Department',
        //     dataIndex: 'department',
        //     key: 'department',
        //     render: (e) => e || "-"
        // },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (address) => `${address.street}, ${address.city}, ${address.zipcode}` || "-",
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button style={{padding:"5px"}} onClick={() => onEdit(record)} type="link">
                        <Tooltip title="Edit">
                            <BiEditAlt style={{ fontSize: '20px' }} />
                        </Tooltip>
                    </Button>
                    <Button style={{padding:"5px"}} onClick={() => handleDelete(record.id)} type="link" danger>
                        <Tooltip title="Delete">
                            <MdDeleteOutline style={{ fontSize: '20px' }} />
                        </Tooltip>
                    </Button>
                </div>
            ),
        },
    ];
      
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', width: '95%', alignSelf: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Search
                        placeholder="Search by First Name, Last Name, Username, Mobile Number, or Email"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ marginBottom: 16, width: '350px', marginLeft:'90px' }}
                        allowClear
                    />
                </div>
                <Button type="primary" onClick={onAdd} style={{ marginBottom: 16 }}>
                    Add User
                </Button>
            </div>

            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: "#bdbdd7",
                        },
                    },
                }}
            >
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    loading={loading}
                    pagination={{ defaultPageSize: 5 }}
                    rowKey="id"
                    scroll={{
                        x: "max-content",
                    }}
                />
            </ConfigProvider>

        </div>
    );
};

export default UserList;
