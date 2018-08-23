import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import ToDoList from './src/pages/ToDoList'
const { store, persistor } = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToDoList />
        </PersistGate>
      </Provider>
    )
  }
}
