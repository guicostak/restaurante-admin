import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Checkbox, Form, Input, Row} from 'antd';
import {
    BODY,
    CustomizedButton,
    HomePage,
    LoginContainer,
    LoginHeader,
    LoginHeaderText,
    LoginHeaderTitle,
    StyledLink
} from './styles'
import {useLoginAdmin} from './hooks/useLoginAdmin'

export const LoginAdminForm: React.FC = () => {
    const {
        handleLoginAdminFormChange,
        handleLoginAdminFormSubmit,
        loginFormValues
    } = useLoginAdmin()

    return (
        <BODY>
            <HomePage to={"/"}> Voltar </HomePage>
            <LoginContainer>
                <LoginHeader>
                    <LoginHeaderTitle>Login</LoginHeaderTitle>
                    <LoginHeaderText>Faça login para continuar</LoginHeaderText>
                </LoginHeader>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: false}}
                    onFinish={handleLoginAdminFormSubmit}
                >

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'O e-mail inserido não é válido',
                            },
                            {
                                required: true,
                                message: 'Por favor, digite seu e-mail!',
                            },
                        ]}>
                        <Input name="email" value={loginFormValues.email}
                               prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-mail"
                               onChange={handleLoginAdminFormChange}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Por favor, digite sua senha!'}]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Senha"
                            name="password" value={loginFormValues.password}
                            onChange={handleLoginAdminFormChange}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{marginBottom: "3%"}}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{fontFamily: "Arial", marginTop: "10px"}}>Lembrar meu login</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        style={{margin: 0}}>
                        <CustomizedButton type="submit">
                            Login
                        </CustomizedButton>
            <Row justify={"center"}
                style={{ fontFamily: "Arial" }}>
                Ainda não tem conta? 
                <StyledLink to={"/register"}>
                Cadastre-se</StyledLink>
            </Row>
            </Form.Item>
        </Form>
    </LoginContainer>
    </BODY>
  );
}