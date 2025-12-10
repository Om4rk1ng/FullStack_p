import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Home from "../Home";

jest.mock('redux-thunk', () => {
    return (store) => (next) => (action) => {
        if (typeof action === 'function') {
            return action(store.dispatch, store.getState);
        }
        return next(action);
    };
});

const thunk = require('redux-thunk'); 

const middlewares = [(thunk.default || thunk)]; 
const mockStore = configureStore(middlewares); 


const initialState = {
    tasks: {
        items: [] 
    },
};

const store = mockStore(initialState); 


const setupLocalStorage = () => {
    localStorage.setItem("userId", "user_123");
    localStorage.setItem("name", "Alice");
    localStorage.setItem("profileImage", "test_profile_url");
};

afterEach(() => {
    localStorage.clear();
    store.clearActions();
});


test("Home Page: Shows welcome message and empty state when no tasks are present", () => {
    
    setupLocalStorage(); 
    
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        </Provider>
    );

    const actions = store.getActions();
    
    expect(actions.length).toBeGreaterThanOrEqual(0); 
    
    expect(screen.getByRole('heading', { name: /Welcome Alice/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /There are no assigned Tasks/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+ Create Task/i })).toBeInTheDocument();
});