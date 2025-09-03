import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            // TODO: Replace with your actual API call
            // await changePassword(values);
            message.success('Password changed successfully');
            navigate('/settings');
        } catch (error) {
            message.error('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Change Password" style={{ maxWidth: 400, margin: '20px auto' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Change Password
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ChangePassword;