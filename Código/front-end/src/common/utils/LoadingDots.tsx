import {theme} from '../styles/theme'
import React from 'react';
import styled, {keyframes} from 'styled-components';

const dotFlashing = keyframes`
  0% {
    background-color:  #C22D32;
  }
  50% {
    background-color: #FF8085;
    transform: scale(1.2);
  }
  100% {
    background-color: #FF8085;
    
  }
`;

const DotsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 3rem;
`;

const Dot = styled.div`
  width: 0.9rem;
  height: 0.9rem;
  margin: 0 8px;
  border-radius: 50%;
  background-color: ${theme.mainColor};
  animation: ${dotFlashing} 1s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

const LoadingDots: React.FC = () => {
  return (
    <DotsWrapper>
      <Dot />
      <Dot />
      <Dot />
    </DotsWrapper>
  );
};

export default LoadingDots;