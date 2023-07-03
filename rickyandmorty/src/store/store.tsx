import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';
import characterDetailReducer from './characterDetailSlice'
import createSagaMiddleware from 'redux-saga';
import { watchFetchCharacters, watchFetchCharacterById } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        characters: charactersReducer,
        characterDetail: characterDetailReducer
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchCharacters);
sagaMiddleware.run(watchFetchCharacterById);

export default store;
