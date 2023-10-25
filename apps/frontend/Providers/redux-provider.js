'use client';
import { Provider } from 'react-redux';
import Store from '../Store/Store';
const NextReduxProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default NextReduxProvider;
