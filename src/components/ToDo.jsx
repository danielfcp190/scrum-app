import React, { useState, useEffect } from 'react'
import './ToDo.css'

export default function ToDo() {

    const [todoI, setTodoI] = useState([])
    const [todoVI, setTodoVI] = useState([])
    const [todoEI, setTodoEI] = useState([])

    function handleAddAssignment(e) {
        e.preventDefault()

        if (document.getElementById('toDoText').value !== '' && document.getElementById('important-radio').checked) {
            setTodoI([...todoI, { id: Math.random() * 100, Assignment: document.querySelector('#toDoText').value }]);
            document.getElementById('toDoText').value = '';
        } else if (document.getElementById('toDoText').value !== '' && document.getElementById('veryImportant-radio').checked) {
            setTodoVI([...todoVI, { id: Math.random() * 100, Assignment: document.querySelector('#toDoText').value }]);
            document.getElementById('toDoText').value = '';
        } else if (document.getElementById('toDoText').value !== '' && document.getElementById('extremelyImportant-radio').checked) {
            setTodoEI([...todoEI, { id: Math.random() * 100, Assignment: document.querySelector('#toDoText').value }]);
            document.getElementById('toDoText').value = '';
        }
    }

    function handleRemoveAssignment(id) {
        setTodoI(todoI.filter(e => e.id !== id));
        setTodoVI(todoVI.filter(e => e.id !== id));
        setTodoEI(todoEI.filter(e => e.id !== id));
    }

    // useEffect(() => {
    //     function handleChangeImportance (target) {

    //         if (target.option.value === 'Very Important') {
    //             setTodoVI([...todoVI, todoI)
    //             setTodoI(todoI.filter(e => e.id !== id))
    //         } else if (target.option.value === 'Extremely Important') {

    //         } else {
    //             return
    //         }




    //     }


    //     return () => {
    //         cleanup
    //     }
    // }, [input])

    return (
        <div className='toDoApp'>

            <form className='toDoForm'>
                <textarea id='toDoText' rows='5' cols='30' placeholder='Type your To Do assignment' maxLength='280' />
                <div className='radio'>
                    <input type='radio' name='importance-radio' id='important-radio' value='Important' /><label for='important-radio'>Important</label>
                    <input type='radio' name='importance-radio' id='veryImportant-radio' value='Very Important' /><label for='veryImportant-radio'>Very Important</label>
                    <input type='radio' name='importance-radio' id='extremelyImportant-radio' value='Extremely Important' /><label for='extremelyImportant-radio'>Extremely Important</label>
                </div>
                <button type='submit' onClick={handleAddAssignment}>Add Assignment</button>
            </form>

            <div className='importanceContainer'>
                <div className='iContainer'>
                    <h2 className='importanceLists'>Important:</h2>
                    <ul>
                        {todoI.map(item => (
                            <li key={item.id}>
                                 <select id='iSelect' /*onChange={() => handleChangeImportance(iSelect)}*/> 
                                    <option value='importantSelect' selected>Important</option>
                                    <option value='veryImportantSelect'>Very Important</option>
                                    <option value='extremelyImportantSelect'>Extremely Important</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                {item.Assignment}
                            </li>))}
                    </ul>
                </div>
                <div className='vIContainer'>
                    <h2 className='importanceLists'>Very Important:</h2>
                    <ul>
                        {todoVI.map(item => (
                            <li key={item.id}>
                                <select id='iSelect'>
                                    <option value='importantSelect'>Important</option>
                                    <option value='veryImportantSelect' selected>Very Important</option>
                                    <option value='extremelyImportantSelect'>Extremely Important</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                {item.Assignment}
                            </li>))}
                    </ul>
                </div>
                <div className='eIContainer'>
                    <h2 className='importanceLists'>Extremely Important:</h2>
                    <ul>
                        {todoEI.map(item => (
                            <li key={item.id}>
                                <select id='iSelect'>
                                    <option value='importantSelect' >Important</option>
                                    <option value='veryImportantSelect'>Very Important</option>
                                    <option value='extremelyImportantSelect' selected>Extremely Important</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                {item.Assignment}
                            </li>))}
                    </ul>
                </div>
            </div>


        </div>
    )
}
