import {GeneralContainer,} from './styles'
import {LoginAdminForm} from '../../components/LoginAdminForm';

export const LoginAdmin: React.FC = () => {

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <GeneralContainer>
      <LoginAdminForm/>
    </GeneralContainer>
  );
}