import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
    const { data } = props;
    const clickDisabled = () => { };

    const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    //const upArrowStyle = data.index === 0? ' table-entry-buttons ' : ' table-entry-buttons-disabled';
    //const downArrowStyle = ? ' table-entry-buttons ' : ' table-entry-buttons-disabled';

    const description = data.description;
    const due_date = data.due_date;
    const status = data.completed ? 'complete' : 'incomplete';
    const assignTo = data.assigned_to;
    const [editingDate, toggleDateEdit] = useState(false);
    const [editingDescr, toggleDescrEdit] = useState(false);
    const [editingStatus, toggleStatusEdit] = useState(false);
    const [editingAssignTo, toggleAssignToEdit] = useState(false);

    const handleDateEdit = (e) => {
        toggleDateEdit(false);
        const newDate = e.target.value ? e.target.value : 'No Date';
        const prevDate = due_date;
        props.editItem(data._id, 'due_date', newDate, prevDate);
    };

    const handleDescrEdit = (e) => {
        toggleDescrEdit(false);
        const newDescr = e.target.value ? e.target.value : 'No Description';
        const prevDescr = description;
        props.editItem(data._id, 'description', newDescr, prevDescr);
    };

    const handleStatusEdit = (e) => {
        toggleStatusEdit(false);
        const newStatus = e.target.value ? e.target.value : false;
        const prevStatus = status;
        props.editItem(data._id, 'completed', newStatus, prevStatus);
    };

    const handleAssignToEdit = (e) => {
        toggleAssignToEdit(false);
        const newAssignTo = e.target.value ? e.target.value : 'Not Assigned';
        const prevAssignTo = assignTo;
        props.editItem(data._id, 'assigned_to', newAssignTo, prevAssignTo);
    };

    return (
        <WRow className='table-entry'>
            <WCol size="3">
                {
                    editingDescr || description === ''
                        ? <WInput
                            className='table-input' onBlur={handleDescrEdit}
                            autoFocus={true} defaultValue={description} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleDescrEdit(!editingDescr)}
                        >{description}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingDate ? <input
                        className='table-input' onBlur={handleDateEdit}
                        autoFocus={true} defaultValue={due_date} type='date'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div className="table-text"
                            onClick={() => toggleDateEdit(!editingDate)}
                        >{due_date}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingStatus ? <select
                        className='table-select' onBlur={handleStatusEdit}
                        autoFocus={true} defaultValue={status}
                    >
                        <option value="complete">complete</option>
                        <option value="incomplete">incomplete</option>
                    </select>
                        : <div onClick={() => toggleStatusEdit(!editingStatus)} className={`${completeStyle} table-text`}>
                            {status}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingAssignTo 
                        ? <WInput
                            className='table-input' onBlur={handleAssignToEdit}
                            autoFocus={true} defaultValue={assignTo} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleAssignToEdit(!editingAssignTo)}
                            style={{
                                color: status==='complete'?'black' : 'red'
                            }}
                        >{assignTo}
                        </div>
                }
            </WCol>
            <WCol size="3">
                <div className='button-group'>
                    <WButton className={props.index ===0? 'table-entry-buttons-disable': 'table-entry-buttons'} onClick={() => props.reorderItem(data._id, -1)} wType="texted">
                        <i className="material-icons">expand_less</i>
                    </WButton>
                    <WButton className={props.index === (props.activeList.items.length - 1)? 'table-entry-buttons-disable': 'table-entry-buttons'} onClick={() => props.reorderItem(data._id, 1)} wType="texted">
                        <i className="material-icons">expand_more</i>
                    </WButton>
                    <WButton className="table-entry-buttons" onClick={() => props.deleteItem(data, props.index)} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    );

};

export default TableEntry;