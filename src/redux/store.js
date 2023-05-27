import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // це localStorage під капотом браузера
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

const contactsConfig = {
    key: 'contacts',
    storage,
};


export const store = configureStore({
    reducer: {
        contacts: persistReducer(contactsConfig, contactsReducer),
        filter: filterReducer
    },
});

export const persistor = persistStore(store);