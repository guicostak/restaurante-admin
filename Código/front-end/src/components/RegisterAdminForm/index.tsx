import React from "react";
import {Col, Form, Input, Row} from 'antd';
import {
    CustomizedButton,
    LoginLinkText,
    RegisterContainer,
    RegisterHeader,
    RegisterMainText,
    StyledLink
} from './styles'
import {useRegisterAdmin} from './hooks/useRegisterAdmin'


export const RegisterAdminForm: React.FC = () => {
    const {
        handleRegisterAdminFormChange,
        handleRegisterAdminFormSubmit,
        registerFormValues
    } = useRegisterAdmin()

    const [form] = Form.useForm();

    return (
        <RegisterContainer>
            <RegisterHeader>
                <RegisterMainText>Cadastrar Administrador</RegisterMainText>
            </RegisterHeader>
            <Row justify={"center"}>
                <Col span={24}>
                    <Form
                        layout='vertical'
                        form={form}
                        name="register"
                        onFinish={handleRegisterAdminFormSubmit}
                        initialValues={registerFormValues}
                        style={{maxWidth: 600}}
                        scrollToFirstError
                    >

                        <Form.Item
                            name="name"
                            label="Nome"
                            rules={[{required: true, message: 'Por favor, digite seu nome!', whitespace: true}]}
                        >
                            <Input name="name" maxLength={30} value={registerFormValues.name} placeholder='João'
                                   onChange={handleRegisterAdminFormChange}/>
                        </Form.Item>

                        <Form.Item
                            name="cpf"
                            label="CPF (somente números)"
                            rules={[{required: true, message: 'Por favor, digite seu CPF!'}]}
                        >
                            <Input name="cpf" maxLength={14} value={registerFormValues.cpf} id='cpf'
                                   style={{width: '100%'}} placeholder='000.000.000-00'
                                   onChange={handleRegisterAdminFormChange}/>
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Telefone (somente números)"
                            rules={[{required: true, message: 'Por favor, digite seu telefone!'}]}
                        >
                            <Input name="phoneNumber" maxLength={11} value={registerFormValues.phoneNumber} id='phone'
                                   style={{width: '100%'}} placeholder='(31) 99999-9999'
                                   onChange={handleRegisterAdminFormChange}/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'O e-mail inserido não é válido',
                                },
                                {
                                    required: true,
                                    message: 'Por favor, digite seu e-mail!',
                                },
                            ]}
                        >
                            <Input name="email" value={registerFormValues.email} type="email"
                                   placeholder='seuemail@mail.com' onChange={handleRegisterAdminFormChange}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Senha"
                            tooltip="Boas senhas possuem letras maíusculas e mínusculas, números e caracteres especiais"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, digite sua senha!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password name="password" value={registerFormValues.password} placeholder='********'
                                            onChange={handleRegisterAdminFormChange}/>
                        </Form.Item>

                        <Form.Item>
                            <CustomizedButton type="submit">
                                Cadastrar
                            </CustomizedButton>
                            <LoginLinkText>
                                Já possui cadastro?
                                <StyledLink to={"/login"}> Login</StyledLink>
                            </LoginLinkText>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </RegisterContainer>
    );
};
