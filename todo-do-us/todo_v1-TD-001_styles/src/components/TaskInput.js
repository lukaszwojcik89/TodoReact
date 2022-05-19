import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase";
import {useState} from "react";

function TaskInput() {
    const [value, setValue] = useState('');

    const handleKeyUp = async (event) => {
        if (event.key === 'Enter') {

            await addDoc(collection(db, "todos"), {
                name: value,
                status: false
            });

            setValue('');
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <input type="text"
               value={value}
               onChange={handleChange}
               onKeyUp={handleKeyUp}
               className='input'
               placeholder='What needs to be done?'
        />
    );
}

export default TaskInput;