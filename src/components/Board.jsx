import React, { useState, useEffect } from 'react'
import './Board.scss'

export default function Board() {

    const [backlog, setBacklog] = useState([])
    const [toDo, setToDo] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [done, setDone] = useState([])

    function handleAddAssignment(e) {
        e.preventDefault()

        let estimation = ''

        if (document.getElementById('1-radio').checked === true) {
            estimation = '1';
        } else if (document.getElementById('2-radio').checked === true) {
            estimation = '2';
        } else if (document.getElementById('3-radio').checked === true) {
            estimation = '3';
        } else if (document.getElementById('5-radio').checked === true) {
            estimation = '5';
        } else if (document.getElementById('8-radio').checked === true) {
            estimation = '8';
        } else if (document.getElementById('13-radio').checked === true) {
            estimation = '13';
        } else if (document.getElementById('21-radio').checked === true) {
            estimation = '21';
        }


        setBacklog([...backlog, { id: parseInt(Math.random() * 100), Assignment: document.querySelector('#toDoText').value, Status: "Backlog", Estimation: estimation }]);
        document.getElementById('toDoText').value = '';
        estimation = '';

    }

    function handleRemoveAssignment(id) {
        setBacklog(backlog.filter(e => e.id !== id));
        setToDo(toDo.filter(e => e.id !== id));
        setInProgress(inProgress.filter(e => e.id !== id));
        setDone(done.filter(e => e.id !== id));
    }


    function handleChangeStatus(item) {

        const oldStatus = item.Status;
        const newStatus = document.getElementById(item.id).value
        const newEstimation = document.getElementById(item.id + 1).value
        const assign = item.Assignment;

        if (newStatus !== oldStatus && newStatus === 'Backlog') {

            setBacklog([...backlog, { id: parseInt(Math.random() * 100), Assignment: assign, Status: newStatus, Estimation: newEstimation }])

            if (oldStatus === "To Do") {
                setToDo(toDo.filter(e => e.id !== item.id));
            } else if (oldStatus === "In Progress") {
                setInProgress(inProgress.filter(e => e.id !== item.id));
            } else if (oldStatus === "Done") {
                setDone(done.filter(e => e.id !== item.id));
            }

        } else if (newStatus !== oldStatus && newStatus === 'To Do') {

            setToDo([...toDo, { id: parseInt(Math.random() * 100), Assignment: assign, Status: newStatus, Estimation: newEstimation }])

            if (oldStatus === "Backlog") {
                setBacklog(backlog.filter(e => e.id !== item.id));
            } else if (oldStatus === "In Progress") {
                setInProgress(inProgress.filter(e => e.id !== item.id));
            } else if (oldStatus === "Done") {
                setDone(done.filter(e => e.id !== item.id));
            }

        } else if (newStatus !== oldStatus && newStatus === 'In Progress') {

            setInProgress([...inProgress, { id: parseInt(Math.random() * 100), Assignment: assign, Status: newStatus, Estimation: newEstimation }])

            if (oldStatus === "To Do") {
                setToDo(toDo.filter(e => e.id !== item.id));
            } else if (oldStatus === "Backlog") {
                setBacklog(backlog.filter(e => e.id !== item.id));
            } else if (oldStatus === "Done") {
                setDone(done.filter(e => e.id !== item.id));
            }

        } else if (newStatus !== oldStatus && newStatus === 'Done') {

            setDone([...done, { id: parseInt(Math.random() * 100), Assignment: assign, Status: newStatus, Estimation: newEstimation }])

            if (oldStatus === "To Do") {
                setToDo(toDo.filter(e => e.id !== item.id));
            } else if (oldStatus === "In Progress") {
                setInProgress(inProgress.filter(e => e.id !== item.id));
            } else if (oldStatus === "Backlog") {
                setBacklog(backlog.filter(e => e.id !== item.id));
            }
        }

    }



    function handleTotalEstimation(target) {

        let count = 0;

        for (let i = 0; i < target.length; i++) {
            count = count + parseInt(target[i].Estimation)
        }

        return count;

    }

    function handleChangeEstimation(item) {

        const newEstimation = document.getElementById(item.id + 1).value

        if (item.Estimation !== newEstimation) {
            item.Estimation = newEstimation;

        }



    }

    return (
        <div className='toDoApp'>

            <form className='toDoForm'>
                <textarea id='toDoText' rows='5' cols='30' placeholder='Type your Assignment' maxLength='280' />

                <div className='radio'>
                    <h2>Estimation:</h2>
                    <input type='radio' name='importance-radio' id='1-radio' value='1' /><label for='1-radio'>1</label>
                    <input type='radio' name='importance-radio' id='2-radio' value='2' /><label for='2-radio'>2</label>
                    <input type='radio' name='importance-radio' id='3-radio' value='3' /><label for='3-radio'>3</label>
                    <input type='radio' name='importance-radio' id='5-radio' value='5' /><label for='5-radio'>5</label>
                    <input type='radio' name='importance-radio' id='8-radio' value='8' /><label for='8-radio'>8</label>
                    <input type='radio' name='importance-radio' id='13-radio' value='13' /><label for='13-radio'>13</label>
                    <input type='radio' name='importance-radio' id='21-radio' value='21' /><label for='21-radio'>21</label>
                </div>
                <button id='submitButton' type='submit' onClick={handleAddAssignment}>Backlog it!</button>
            </form>

            <div className='statusContainer'>
                <div className='backlogContainer'>
                    <div className='statusLabel'>
                        <h2 className='statusLists'>Backlog ({backlog.length})</h2>
                        <h3 className='totalEstimation'>{handleTotalEstimation(backlog)} pts</h3>
                    </div>
                    <ul>
                        {backlog.map(item => (
                            <li key={item.id}>
                                <select id={item.id} defaultValue='Backlog' onChange={() => handleChangeStatus(item)} >
                                    <option value='Backlog'>Backlog</option>
                                    <option value='To Do'>To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done!</option>
                                </select>
                                <select id={item.id + 1} defaultValue={item.Estimation} onChange={() => handleChangeEstimation(item)} >
                                    <option value='1' >Est: 1</option>
                                    <option value='2'>Est: 2</option>
                                    <option value='3'>Est: 3</option>
                                    <option value='5'>Est: 5</option>
                                    <option value='8'>Est: 8</option>
                                    <option value='13'>Est: 13</option>
                                    <option value='21'>Est: 21</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                <span id='assignment' >{item.Assignment}</span>
                            </li>))}
                    </ul>
                </div>
                <div className='tdContainer'>
                    <div className='statusLabel'>
                        <h2 className='statusLists'>To Do ({toDo.length})</h2>
                        <h3 className='totalEstimation'>{handleTotalEstimation(toDo)} pts</h3>
                    </div>
                    <ul>
                        {toDo.map(item => (
                            <li key={item.id}>
                                <select id={item.id} defaultValue='To Do' onChange={() => handleChangeStatus(item)} >
                                    <option value='Backlog'>Backlog</option>
                                    <option value='To Do'>To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done!</option>
                                </select>
                                <select id={item.id + 1} defaultValue={item.Estimation} onChange={() => handleChangeEstimation(item)} >
                                    <option value='1' >Est: 1</option>
                                    <option value='2'>Est: 2</option>
                                    <option value='3'>Est: 3</option>
                                    <option value='5'>Est: 5</option>
                                    <option value='8'>Est: 8</option>
                                    <option value='13'>Est: 13</option>
                                    <option value='21'>Est: 21</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                <span id='assignment' >{item.Assignment}</span>
                            </li>))}
                    </ul>
                </div>
                <div className='ipContainer'>
                    <div className='statusLabel'>
                        <h2 className='statusLists'>In Progress ({inProgress.length})</h2>
                        <h3 className='totalEstimation'>{handleTotalEstimation(inProgress)} pts</h3>
                    </div>
                    <ul>
                        {inProgress.map(item => (
                            <li key={item.id}>
                                <select id={item.id} defaultValue='In Progress' onChange={() => handleChangeStatus(item)} >
                                    <option value='Backlog'>Backlog</option>
                                    <option value='To Do' >To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done!</option>
                                </select>
                                <select id={item.id + 1} defaultValue={item.Estimation} onChange={() => handleChangeEstimation(item)} >
                                    <option value='1' >Est: 1</option>
                                    <option value='2'>Est: 2</option>
                                    <option value='3'>Est: 3</option>
                                    <option value='5'>Est: 5</option>
                                    <option value='8'>Est: 8</option>
                                    <option value='13'>Est: 13</option>
                                    <option value='21'>Est: 21</option>
                                </select>
                                <button id='removeButton' onClick={() => handleRemoveAssignment(item.id)}>x</button>
                                <span id='assignment' >{item.Assignment}</span>
                            </li>))}
                    </ul>
                </div>
                <div className='dContainer'>
                    <div className='statusLabel'>
                        <h2 className='statusLists'>Done! ({done.length})</h2>
                        <h3 className='totalEstimation'>{handleTotalEstimation(done)} pts</h3>
                    </div>
                    <ul>
                        {done.map(item => (
                            <li key={item.id}>
                                <select id={item.id} defaultValue='Done' onChange={() => handleChangeStatus(item)} >
                                    <option value='Backlog'>Backlog</option>
                                    <option value='To Do' >To Do</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Done'>Done!</option>
                                </select>
                                <select id={item.id + 1} defaultValue={item.Estimation} onChange={() => handleChangeEstimation(item)} >
                                    <option value='1' >Est: 1</option>
                                    <option value='2'>Est: 2</option>
                                    <option value='3'>Est: 3</option>
                                    <option value='5'>Est: 5</option>
                                    <option value='8'>Est: 8</option>
                                    <option value='13'>Est: 13</option>
                                    <option value='21'>Est: 21</option>
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


