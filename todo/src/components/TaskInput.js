function TaskInput({value, handleKeyUp, handleChange}) {
    return (
        <input type="text"
               value={value}
               onChange={handleChange}
               onKeyUp={handleKeyUp}
        />
    );
}

export default TaskInput;