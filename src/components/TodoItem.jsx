import { useContext } from "react";
import "./TodoItem.css";
import { memo } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
    const { onUpdate, onDelete } = useContext(TodoDispatchContext);
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDeleteButton = () => {
        onDelete(id);
    };

    return (
        <div className="TodoItem">
            <input
                type="checkbox"
                readOnly
                checked={isDone}
                onChange={onChangeCheckbox}
            />
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    );
};

// export default memo(TodoItem, (prevProps, nextProps) => {
//     // onUpdate, onDelete 가 리렌더링 시 새로 함수가 생성되어 주소값이 바뀐다. 그래서 props 가 바뀌므로 리렌더링 됨
//     // T -> Props 바뀌지 않음
//     // F -> Props 바뀜 -> 상태 todos 값이 바뀔 때만(리렌더링)
//     if (prevProps.id !== nextProps.id) return false;
//     if (prevProps.isDone !== nextProps.isDone) return false;
//     if (prevProps.content !== nextProps.content) return false;
//     if (prevProps.date !== nextProps.date) return false;

//     return true;
// });

export default memo(TodoItem);
