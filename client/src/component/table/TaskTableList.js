import React, { useState, useEffect, useRef } from 'react';
import styles from './table.module.css';

import {
    Breadcrumb,
    Dropdown, Row, Col,
    Button, Container
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, deleteTaskList, getTaskList, resetTaskListSuccess, resetTaskSuccess, updateTaskListState } from '../../redux/action/TaskAction';
import TableModal from './TableModal';
import { defaultDate, convertDateFormatToISOformat } from '../../uti';

const TaskTableList = ({ 
    projectNameHeading, 
    projectId,
     }) => {
    const DONE = "Done";
    const PROGRESS = "Progress";
    const IS_CLCIKED = "is-clicked";
    
    const [tasksIds, setTasksIds] = useState([]);
    const [taskName, setTasktName] = useState("");
    const [taskDate, setTaskDate] = useState(defaultDate());
    const [taskDescription, setTaskDescription] = useState("");
    const [status, setStatus] = useState(PROGRESS);
    const [statusDone, setStatusDone] = useState(PROGRESS);
    const [showInputFill, setShowInputFill] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
   
    const [isEditTask, setIsEditTask] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [isClickedOutSideTask, setIsClickedOutSideTask] = useState(false);


    const taskRef = useRef();

    const dispatch = useDispatch();
    const { taskRequest, taskSuccess } = useSelector((state) => state.taskReducers);
    const { taskListRequest, taskListData } = useSelector((state) => state.taskListReducers);
    const { taskListDeleteRequest, taskListDeleteSuccess } = useSelector((state) => state.taskListDeleteReducers)
        
    // useEffect(() => {
    //     let timer;
    //     const onhandleOutSideClickForTask = (e) => {
    //         /**
    //          * @Description read in the morning
    //          * Update api only  when it is true
    //          *  Consequently, a state update inside the onHandleOutsideClickForTask 
    //          * function triggered by a mouse-down event will
    //          *  not trigger a re-render of the component.
    //             In this case, clicking the mouse down will call the onHandleOutsideClickForTask 
    //             function, which updates the state using setIsEditTask(false).
    //             However, since the effect is not re-executed, 
    //             the component will not re-render, and the UI will not reflect the updated state.
    //                         */
          
    //         const BREAD_CRUMP = "breadcrumb"

    //         const isClickedOutSideTable = e.target?.className?.includes(IS_CLCIKED);
    //         const isClickOnBreadCrump = e.target?.className?.includes(BREAD_CRUMP);
       
    //         // if (isClickedOutSideTask && (isClickedOutSideTable || isClickOnBreadCrump)) {
    //         //     setIsEditTask(false);
    //         //     setIsClickedOutSideTask(false)
    //         // }
    //     }
    //     document.addEventListener("mousedown", onhandleOutSideClickForTask)
    //   return () => {
    //       document.removeEventListener("mousedown", onhandleOutSideClickForTask)
    //       clearTimeout(timer)
    //   }
    // }, [isClickedOutSideTask])
  

   
    useEffect(() => {   
        console.log('useEffect');

        /**
         * @This is best practice do not change
         */
        if (taskSuccess) {
            //reset task success
            dispatch(resetTaskSuccess());
        }
        if (taskListDeleteSuccess) {
            // dispatch(reset)
            dispatch(resetTaskListSuccess());
        }
        dispatch(getTaskList(projectId));
        return () => {
           
        }
    }, [taskSuccess, projectId, taskListDeleteSuccess])


    const updateIsClickedOutSideTask = () => {
        setIsClickedOutSideTask(true);
    }

    const onhandleAddTask = () => {
        const newTask = {
            taskName,
            taskDescription,
            taskDate,
            projectId,
            taskStatus: status
        }
        dispatch(createTask(newTask))
        resetOnChangeStateToDefault();
    }

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    };
    const handleShowDeleteModal = () => {
        setShowDeleteModal(true)
    };

    const onhandleDeleteTask = () => {
        handleCloseDeleteModal();
        dispatch(deleteTaskList(projectId, tasksIds))
    }
    const onhandleChangeTaskName = (e) => {
        setTasktName(e.target.value);
    }
    const onhandleChangetaskDescriptionName = (e) => {
        setTaskDescription(e.target.value);
    }
    const onhandleChangeDate = (e) => {
        setTaskDate(e.target.value);
    }
    const updateStateStatusDone = (val) => {
        if (val === DONE) {
            setStatusDone(PROGRESS)
        } else if (val === PROGRESS) {
            setStatusDone(DONE)
        }
    }
    const onhandleSelectDropDown = (val) => {
        updateStateStatusDone(val);
        setStatus(val);
    }
    const onhandleChangeTick = (e) => {
        const { checked, value } = e.target;
        if (checked === false) {
            const newTask = tasksIds.filter((val, index) => val != value)
            setTasksIds(newTask);
        } else {
            setTasksIds([...tasksIds, value]);
        }
    }
    const switchShowFillInput = (e) => {
        e.stopPropagation();
        setShowInputFill(true);
     
    }
    const onhandleCloseInputFill = () => {
        setShowInputFill(false);
    }
    const resetOnChangeStateToDefault = () => {
        if (taskName) setTasktName("");
        if (taskDescription) setTaskDescription("");
        setTaskDate(defaultDate())
    }

    /**
     * We can’t use the above function directly in a functional component 
     * because on component re-rendering debounce 
     * will be executed again and we will get a new function.
     * 
     * Here on every re-render useCallback 
     * will give the same debounce function, which was created during the first render.

 */
    
    //const debounceOnEditChange = React.useCallback(debounce((e, index) => onhandleEditChangeTaskName(e, index), 400), []);
    const onhandleEditChangeTaskName = (e, index) => {
        taskListData[index].task_name = e.target.value;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleEditChangeTaskDescription = (e, index) => {
        taskListData[index].task_description = e.target.value;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleEditDropDownStatus = (eventKey, event, index) => {
        event.stopPropagation();
        console.log(eventKey);
        taskListData[index].task_status = eventKey;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleEditChangeTaskDate = (e, index) => {
        taskListData[index].task_date = e.target.value;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleClickEditTask = (e, index) => {
        e.stopPropagation();
        setIsEditTask(true);
        setEditIndex(index);
        // updateStateStatusDone();
    }
    const onClickOutsideTable = () => {
        // send update to api 
        console.log("clicked outside the table");
    }
   
    return (
        <div 
            className={`h-100 fs-5 p-5 ${styles['task-table-list']} 
            border border-primary `}
            onClick={onClickOutsideTable}
       
            >
            <Container>
                <TableModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    title={tasksIds.length === 1 ? `Delete this task?` : "Delete these tasks?"}
                    bodyText="hello "
                    onhandleDeleteTask={onhandleDeleteTask}
                />
                <div className='d-flex gap-4 mb-5'>
                    <div className='d-flex align-items-center'>
                        <i className="bi bi-book"></i>
                    </div>
                    <h1 className={`${styles["project-name-heading"]} fw-bold`}>
                        <span >{projectNameHeading}</span>
                    </h1>
                </div>

                <Breadcrumb className={`${styles['all-task-texts']} `}


                >
                    <Breadcrumb.Item href="#">All tasks</Breadcrumb.Item>
                    <Breadcrumb.Item active>This week</Breadcrumb.Item>
                    {tasksIds.length > 0 &&
                        <div className={`${styles.trash} ms-auto`} onClick={handleShowDeleteModal}>
                            <div className={`text-center`}>
                                <i className={`bi bi-trash`}></i>
                            </div>
                            <div className='fw-bold' >Delete</div>
                        </div>
                    }
                </Breadcrumb>


                <div className={`table-responsive card  p-3 ${styles['all-task-texts']} `}>
                    <table className="table table-bordered rounded rounded-3 text-center  ">
                        <thead>
                            <tr>
                                <th scope="col" className={`${styles.tick_box_heading}`}
                                >
                                    {/* <div className='d-flex justify-content-center mt-1 '>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                            </div> */}
                                </th>
                                <th scope="col" className={`${styles.td}`}>Task name</th>
                                <th scope="col" className={`${styles.td}`}>Description</th>
                                <th scope="col" className={`${styles['status-heading']}`}>Status</th>
                                <th scope="col" className={`${styles['date-heading']}`}>Date</th>
                                {/* <th scope="col" className={`${styles.trash_heading}`}>
                              
                            </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {taskListData.length > 0 ?
                                taskListData.map((val, index) =>
                                    <tr key={index}>
                                        <th scope="col" >
                                            <div className='d-flex justify-content-center mt-1 '>
                                                <input
                                                    type="checkbox"
                                                    value={val?.id}

                                                    onChange={onhandleChangeTick}
                                                />
                                            </div>
                                        </th>
                                        {isEditTask && editIndex === index ?
                                            <td
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <textarea
                                                    rows="1"
                                                    className={`${styles.textarea} p-2`}
                                                    placeholder="Task name"
                                                    value={val?.task_name}
                                                   
                                                    onChange={(e) => onhandleEditChangeTaskName(e, index)}
                                                    id="floatingTextarea">
                                                </textarea>
                                            </td>

                                            :
                                            <td
                                                onClick={(e) => onhandleClickEditTask(e, index)}

                                                className={`${styles['task-col']}`}>
                                                <div>
                                                    {val?.task_name}
                                                </div>

                                            </td>
                                        }
                                        {isEditTask && editIndex === index ?
                                            <td
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <textarea
                                                    rows="1"
                                                    className={`${styles.textarea} p-2`}
                                                    placeholder="Task description"
                                                    value={val?.task_description}
                                                    onClick={(e) => { e.stopPropagation() }}
                                                    onChange={(e) => onhandleEditChangeTaskDescription(e, index)}
                                                    id="floatingTextarea">
                                                </textarea>
                                            </td>
                                            :
                                            <td
                                                onClick={(e) => onhandleClickEditTask(e, index)}
                                                // onClick={(e) => onhandleClickEditTask(e, index)}
                                                className={`${styles['task-col']}`}>
                                                <div>
                                                    {val?.task_description}
                                                </div>

                                            </td>
                                        }
                                        {isEditTask && editIndex === index ?
                                            <td
                                                className={`d-flex justify-content-center ${styles['task-col']}`}
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <Dropdown onSelect={(eventKey, event) => onhandleEditDropDownStatus(eventKey, event, index)}>
                                                    <Dropdown.Toggle
                                                        className={`${styles['dropdown-toggle']}`}
                                                        variant={val?.task_status === DONE ? "success" : "danger"}
                                                        id="dropdown-basic" >
                                                        {val?.task_status}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu
                                                        className={`${styles['dropdown-menu']}`}>
                                                        <Dropdown.Item
                                                            eventKey={val?.task_status === PROGRESS ? DONE : PROGRESS}
                                                            className={val?.task_status !== DONE ? `${styles['dropdown-item-1']}` : `${styles['dropdown-item-2']}`}
                                                        >
                                                            {val?.task_status === PROGRESS ? DONE : PROGRESS}
                                                        </Dropdown.Item>
                                                        
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            :
                                            <td
                                                className={`d-flex justify-content-center ${styles['task-col']}`}
                                                onClick={(e) => onhandleClickEditTask(e, index)}
                                            >
                                                <div className={val.task_status === PROGRESS ? `badge bg-danger` : `badge bg-success`}>
                                                    {val?.task_status}
                                                </div>
                                            </td>
                                        }

                                        {isEditTask && editIndex === index ?
                                            <td
                                                className={`${styles['task-col']}`}
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <input
                                                    type='date'
                                                    className='border-0 mt-2'
                                                    value={convertDateFormatToISOformat(val?.task_date)}
                                                    onChange={(e) => onhandleEditChangeTaskDate(e, index)}
                                                />
                                            </td>
                                            :
                                            <td className={`${styles['task-col']}`}
                                                onClick={(e) => onhandleClickEditTask(e, index)}
                                            >
                                                {val?.task_date}
                                            </td>
                                        }
                                    </tr>
                                )
                                :
                                ""
                            }
                            {showInputFill &&
                                <tr className=''>
                                    <th scope="row" className=''>
                                        <div className='d-flex justify-content-center mt-1 '>
                                            <input
                                                type="checkbox"
                                                id="vehicle1" name="vehicle1" value="Bike"
                                                className='text-break'
                                            />
                                        </div>
                                    </th>
                                    <td className={` p-0`}>
                                        <div className='d-flex align-items-center mt-2'>
                                            <textarea
                                                rows="1"
                                                className={`${styles.textarea} p-2`}
                                                placeholder="Task name"
                                                value={taskName}
                                                onChange={onhandleChangeTaskName}
                                                id="floatingTextarea">
                                            </textarea>
                                        </div>

                                    </td>
                                    <td className={` p-0`}>
                                        <div className='d-flex align-items-center mt-2'>
                                            <textarea
                                                rows="1"
                                                className={`${styles.textarea} p-2`}
                                                value={taskDescription}
                                                placeholder="Leave your comment"
                                                onChange={onhandleChangetaskDescriptionName}
                                                id="floatingTextarea">
                                            </textarea>
                                        </div>
                                    </td>
                                    <td className=''>
                                        <Dropdown onSelect={onhandleSelectDropDown}>
                                            <Dropdown.Toggle
                                                className={`${styles['dropdown-toggle']}`}
                                                variant={status === DONE ? "success" : "danger"}
                                                id="dropdown-basic" >
                                                {status}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                className={`${styles['dropdown-menu']}`}>
                                                <Dropdown.Item
                                                    eventKey={statusDone === DONE ? DONE : PROGRESS}
                                                    className={statusDone === DONE ? `${styles['dropdown-item-1']}` : `${styles['dropdown-item-2']}`}
                                                >
                                                    {statusDone}
                                                </Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td className=''>
                                        <input
                                            type='date'
                                            className='border-0 mt-2'
                                            value={taskDate}
                                            onChange={onhandleChangeDate}
                                        />
                                    </td>
                                    {/* <td className=''><i className={`${styles.trash} bi bi-trash`}></i></td> */}
                                </tr>
                            }
                        </tbody>
                    </table>
                    <Row>
                        <Col md={9}>
                            <div className={`${styles.add_task_plus_sign} d-flex gap-2 ${IS_CLCIKED}`} onClick={switchShowFillInput}>
                                <div className={` ms-3 fw-bold`} >+</div>
                                <p>Create new TaskList</p>
                            </div>
                        </Col>
                        <Col md={3}>
                            {showInputFill &&
                                <div className='d-flex justify-content-end gap-2'>
                                    <button type="button" className='btn btn-light' onClick={onhandleCloseInputFill}>Cancel</button>
                                    <Button
                                        variant="danger"
                                        disabled={taskRequest || !taskName}
                                        onClick={onhandleAddTask}
                                    >
                                        {taskRequest ? 'Loading…' : 'Add task'}
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </div >
            </Container>
          
        </div>


    );
};

export default TaskTableList;
