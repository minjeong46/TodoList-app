import { useState, useMemo } from "react";
import "./List.css";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import { TodoStateContext } from "../App";

const List = () => {
    const todos = useContext(TodoStateContext);
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getFilteredData = () => {
        if (search === "") {
            return todos;
        }

        return todos.filter((todo) =>
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
    };

    const filteredTodos = getFilteredData();

    // state 상태에 따라 계속 호출되던 부분을 useMemo로 해결, useMemo로 하지 않으면 검색어에 입력할 때마다 호출됨
    const { totalCount, doneCount, notDoneCount } = useMemo(() => {
        console.log("호출 확인!");
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return { totalCount, doneCount, notDoneCount };
    }, [todos]);

    return (
        <div className="List">
            <h4>Todo List ✅</h4>
            <div className="todos_count">
                <div>전체 Todo: {totalCount}</div>
                <div>완료한 Todo: {doneCount}</div>
                <div>미완료한 Todo: {notDoneCount}</div>
            </div>
            <input
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요."
            ></input>
            <div className="todos_wrapper">
                {filteredTodos.map((todo) => {
                    return <TodoItem key={todo.id} {...todo} />;
                })}
            </div>
        </div>
    );
};

export default List;
