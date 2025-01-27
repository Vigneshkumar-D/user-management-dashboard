import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Row, Col } from 'antd';
import UserService from '../services/userService';
import { useRef } from 'react';

const { Option } = Select;

const UserForm = ({ user, onClose, onRefresh }) => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (user) {
                UserService.updateUser(user.id, values)  // Use updateUser instead of deleteUser
                    .then((res) => {
                        message.success('User updated successfully.');    
                    })
                    .catch((e) => {
                        message.error('Failed to update user.');
                    })
                    .finally(() => {
                        setLoading(false);
                        formRef.current.resetFields();
                    });
            } else {
                UserService.addUser(values)  // Use addUser instead of deleteUser
                    .then((res) => {
                        console.log("res", res);
                        message.success('User added successfully.');
                    })
                    .catch((e) => {
                        message.error('Failed to add user.');
                    })
                    .finally(() => {
                        setLoading(false);
                        formRef.current.resetFields();
                    });
            }
            onRefresh();
            onClose();
        } catch (error) {
            message.error('Failed to save user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            ref={formRef}
            style={{display:'flex', flexDirection:'column'}}
            initialValues={user || { department: 'Engineering' }}
        >
            <Row gutter={5}>
                <Col span={12}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name.' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name.' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            { required: true, message: 'Please enter username.' },
                            { message: 'Please enter a valid Username.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </Col>
                <Col span={12}>
                    <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter email.' },
                        { type: 'email', message: 'Please enter a valid email.' },
                    ]}
                >
                    <Input />
                </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phoneNumber",
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  ]}
                >
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                  />
                </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="website"
                        label="Website"
                        rules={[
                            { required: false },
                            { message: 'Please enter a valid website.' },
                        ]}
                    >
                        <Input type='tel' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="company"
                        label="Company"
                        rules={[
                           
                            { message: 'Please enter a valid company.' },
                        ]}
                    >
                        <Input type='tel' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="department"
                        label="Department"
                        rules={[{ required: true, message: 'Please select a department.' }]}
                    >
                        <Select>
                            <Option value="Engineering">Engineering</Option>
                            <Option value="HR">HR</Option>
                            <Option value="Sales">Sales</Option>
                            <Option value="Marketing">Marketing</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            { required: true, message: 'Please enter address.' },
                            { message: 'Please enter a valid address.' },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item style={{ alignSelf: 'flex-end' }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    {user ? 'Update User' : 'Add User'}
                </Button>
            </Form.Item>   
        </Form>
    );
};

export default UserForm;
