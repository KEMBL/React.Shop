import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { appBootup } from 'rns-packages/src/bootup';
import { ApplicationStore } from './types';
import { StoreBuilderService } from './store-builder.service';

interface ApplicationStateProps {
  store: ApplicationStore;
  children: React.ReactNode;
}

/**
 * High order component injects redux application store
 *
 * @param {object} props object component props
 *
 * @returns {object} react component
 */
export const ApplicationStateComponent: React.FC<ApplicationStateProps> = (props: ApplicationStateProps) => {
  const { store, children } = props;
  const persistor = StoreBuilderService.getPersistor;
  store.dispatch(appBootup.start());
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
