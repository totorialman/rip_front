import React, { createContext, useReducer, useContext } from 'react';

// Типы для состояния и действий
interface FilterState {
    maxPrice: number;
}

type Action = { type: 'SET_MAX_PRICE'; payload: number };

// Начальное состояние
const initialState: FilterState = {
    maxPrice: 100000,
};

// Редьюсер
const filterReducer = (state: FilterState, action: Action): FilterState => {
    switch (action.type) {
        case 'SET_MAX_PRICE':
            return { ...state, maxPrice: action.payload };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

// Создаем контекст
const FilterContext = createContext<{
    state: FilterState;
    dispatch: React.Dispatch<Action>;
} | null>(null);

// Провайдер
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
};

// Хук для использования контекста
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
