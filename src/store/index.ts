import { configureStore } from '@reduxjs/toolkit';
import componentsReducer from './componentsReducer';

export default configureStore({
    reducer: {
        components: componentsReducer
    }
})