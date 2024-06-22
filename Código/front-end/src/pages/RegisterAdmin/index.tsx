import React from "react";
import {RegisterAdminForm} from "../../components/RegisterAdminForm";
import {GeneralContainer,} from './styles'

export const RegisterAdmin: React.FC = () => {

  return (
    <GeneralContainer>
      <RegisterAdminForm/>
    </GeneralContainer>
  );
};
