import { useState, useRef, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { useCallback } from "react";

const mockData = [
    {
        id: 0,
        isDone: false,
        content: "React 공부하기",
        date: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: "JS 공부하기",
        date: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: "블로그 정리하기",
        date: new Date().getTime(),
    },
]; // 다시 생성되지 않도록

const reducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return [action.data, ...state];
        case "UPDATE":
            return state.map((item) =>
                item.id === action.targetId
                    ? { ...item, isDone: !item.isDone }
                    : item
            );
        case "DELETE":
            return state.filter((item) => item.id !== action.targetId);
        default:
            state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(3);

    const onCreate = useCallback((content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                isDone: false,
                content: content,
                date: new Date().getTime(),
            },
        });
    }, []);

    // 재생성되지 않도록 useCallback 을 사용하여 마운트(최초)시 최적화
    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: "UPDATE",
            targetId: targetId,
        });
    }, []);

    const onDelete = useCallback((targetId) => {
        dispatch({
            type: "DELETE",
            targetId: targetId,
        });
    }, []);

    return (
        <div className="App">
            <Header />
            <Editor onCreate={onCreate} />
            <List todos={state} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
    );
}

export default App;
