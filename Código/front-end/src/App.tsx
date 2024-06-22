import React from 'react';
import Router from './routes/router';
import {ThemedProvider} from './common/styles/GlobalStyle';

export const App: React.FC = () => {
  return (
    <ThemedProvider>
      <Router />
    </ThemedProvider>
  );
};