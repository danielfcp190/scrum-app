import React, { useState, useEffect } from 'react'
import './ToDo.scss'

export default function ToDo() {

    const [toDo, setToDo] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [done, setDone] = useState([])

    function handleAddAssignment(e) {
        e.preventDefault()

        let importance = ''

        if (document.getElementById('important-radio').checked === true) {
             importance = 'Important';
        } else if (document.getElementById('veryImportant-radio').checked === true) {
             importance = 'Very Important';
        } else if (document.getElementById('extremelyImportant-radio').checked === true) {
             importance = 'Extremely Important';
        }

        if (document.getElementById('toDoText').value !== '' && document.getElementById('todo-radio').checked) {
            setToDo([...toDo, { id: Math.random() * 100, Assignment: document.querySelector('#toDoText').value, Status: "To Do", Importance: importance }]);
            document.getElementById('toDoText').value = '';
        } else if (document.getElementById('toDoText').value !== '' && document.getElementById('inProgress-radio').checked) {
            setInProgress([...inProgress, { id: Math.random() * 100, Assignment: document.querySelector('#toDoText').value, Status: "In Progress", Importance: importance }]);
            document.getElementById('toDoText').value = '';
        } else if (document.getElementById('toDoText').value !== '' && document.getElementById('done-radio').checked) {
            setDone([...done, { id: Math.random() * 100, Assignment: document.querySelector('#toDoText').value, Status: "Done", Importance: importance }]);
            document.getElementById('toDoText').value = '';
        }

        importance = ''

    }

    function handleRemoveAssignment(id) {
        setToDo(toDo.filter(e => e.id !== id));
        setInProgress(inProgress.filter(e => e.id !== id));
        setDone(done.filter(e => e.id !== id));
    }


    function handleChangeStatus(item) {

        const oldStatus = item.Status;
        const newStatus = document.getElementById(item.id).value
        const newImportance = document.getElementById(item.id+1).value
        const assign = item.Assignment;

        if (newStatus !== oldStatus && newStatus === 'To Do') {

            setToDo([...toDo, { id: Math.random() * 100, Assignment: assign, Status: newStatus, Importance: newImportance}])

            if (oldStatus === "In Progress") {
                setInProgress(inProgress.filter(e => e.id !== item.id));
            } else if (oldStatus === "Done") {
                setDone(done.filter(e => e.id !== item.id));
            }

        } else if (newStatus !== oldStatus && newStatus === 'In Progress') {

            setInProgress([...inProgress, { id: Math.random() * 100, Assignment: assign, Status: newStatus, Importance: newImportance }])

            if (oldStatus === 'To Do') {
                setToDo(toDo.filter(e => e.id !== item.id));
            } else if (oldStatus === 'Done') {
                setDone(done.filter(e => e.id !== item.id));
            }

        } else if (newStatus !== oldStatus && newStatus === 'Done') {

            setDone([...done, { id: Math.random() * 100, Assignment: assign, Status: newStatus, Importance: newImportance }])

            if (oldStatus === 'In Progress') {
                setInProgress(inProgress.filter(e => e.id !== item.id));
            } else if (oldStatus === 'To Do') {
                setToDo(toDo.filter(e => e.id !== item.id));
            }
        }

    }

 
   
    return (
        <div className='toDoApp'>

            <form className='toDoForm'>
                <textarea id='toDoText' rows='5' cols='30' placeholder='Type your Assignment' maxLength='280' />
                <div className='radio'>
                    <input type='radio' name='status-radio' id='todo-radio' value='To Do' /><label for='todo-radio'>To Do</label>
                    <input type='radio' name='status-radio' id='inProgress-radio' value='In Progress' /><label for='inProgress-radio'>In Progress</label>
                    <input type='radio' name='status-radio' id='done-radio' value='Done' /><label for='done-radio'>Done!</label>
                </div>
                <div className='radio'>
                    <input type='radio' name='importance-radio' id='important-radio' value='Important' /><label for='important-radio'>Important</label>
                    <input type='radio' name='importance-radio' id='veryImportant-radio' value='Very Important' /><label for='veryImportant-radio'>Very Important</label>
                    <input type='radio' name='importance-radio' id='extremelyImportant-radio' value='Extremely Important' /><label for='extremelyImportant-radio'>Extremely Important</label>
                </div>
                <button type='submit' onClick={handleAddAssignment}>Add Assignment</button>
            </form>

            <div className='statusContainer'>
                <div className='tdContainer'>
                    <h2 className='statusLists'>To Do:</h2>
                    <ul>
                        {toDo.map(item => (
                            <li key={item.id}>
                                <select id={item.id} defaultValue='To Do' onChange={() => handleChangeStatus(item)} >
                                    <option value='To Do'>To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done!</option>
                                </select>
                                <select id={item.id+1} defaultValue={item.Importance} >
                                    <option value='Important' >Important</option>
                                    <option value='Very Important'>Very Important</option>
                                    <option value='Extremely Important'>Extremely Important</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                <span id='assignment' >{item.Assignment}</span>
                            </li>))}
                    </ul>
                </div>
                <div className='ipContainer'>
                    <h2 className='statusLists'>In Progress:</h2>
                    <ul>
                        {inProgress.map(item => (
                            <li key={item.id}>
                                <select id={item.id} defaultValue='In Progress' onChange={() => handleChangeStatus(item)} >
                                    <option value='To Do' >To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done!</option>
                                </select>
                                <select id={item.id+1} defaultValue={item.Importance}>
                                    <option value='Important'>Important</option>
                                    <option value='Very Important' >Very Important</option>
                                    <option value='Extremely Important'>Extremely Important</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                <span id='assignment' >{item.Assignment}</span>
                            </li>))}
                    </ul>
                </div>
                <div className='dContainer'>
                    <h2 className='statusLists'>Done!</h2>
                    <ul>
                        {done.map(item => (
                            <li key={item.id}>
                                <select id={item.id} defaultValue='Done' onChange={() => handleChangeStatus(item)} >
                                    <option value='To Do' >To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done!</option>
                                </select>
                                <select id={item.id+1} defaultValue={item.Importance}>
                                    <option value='Important' >Important</option>
                                    <option value='Very Important'>Very Important</option>
                                    <option value='Extremely Important'>Extremely Important</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                <span id='assignment' >{item.Assignment}</span>
                            </li>))}
                    </ul>
                </div>
            </div>


        </div>
    )
}


