// injectReducer.tsx
import React, { useLayoutEffect } from 'react';

import store from '../../store';

import { IInjectReducerArgs } from '../../store/store.types';

const InjectReducer =
  ({ reducerKey, reducer }: IInjectReducerArgs) =>
  (WrappedComponent: React.FC) => {
    const EnhancedComponent: React.FC = (props: any) => {
      useLayoutEffect(() => {
        store.injectReducer({ reducerKey, reducer });
      }, [reducerKey, reducer]);

      return <WrappedComponent {...props} />;
    };

    return EnhancedComponent;
  };

export default InjectReducer;
