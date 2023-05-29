import React, { useState, useEffect, useRef } from 'react';
import styles from './table.module.css';

import {
    Breadcrumb,
    Dropdown, Row, Col,
    Button, Container
} from 'react-bootstrap';
import { validate as uuidValidate } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, deleteTaskList, getTaskList, resetTaskListSuccess, resetTaskSuccess, updateTask, updateTaskListState } from '../../redux/action/TaskAction';
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
    const [trackDeleteIds, setTrackDeleteIds] = useState([]);
    const [taskName, setTasktName] = useState("");
    const [taskDate, setTaskDate] = useState(defaultDate());
    const [taskDescription, setTaskDescription] = useState("");
    const [status, setStatus] = useState(PROGRESS);
    const [statusDone, setStatusDone] = useState("");
    const [showInputFill, setShowInputFill] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditTask, setIsEditTask] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    // const [trackChecked, setTrackChecked] = useState([]);
    /**
     * @REF
     */
    const rightTableColRef = useRef();
    /**
     * @REDUX STATE
     */
    const dispatch = useDispatch();
    const { taskRequest, taskSuccess } = useSelector((state) => state.taskReducers);
    const { taskListRequest, taskListData } = useSelector((state) => state.taskListReducers);
    const { taskListDeleteRequest, taskListDeleteSuccess } = useSelector((state) => state.taskListDeleteReducers)
        
   /**
    * @description 
    *   - useEffect once after mount(react app dom add to dom)
    *     it means when user refresh the page, that when the react mount.         
    */
    useEffect(() => { 
        // const targetElement = document.getElementById('target-element');

        // targetElement.addEventListener('click', handleClick);
       
        //document.addEventListener("click", onClickOutsideTable)
        if (taskSuccess) {
            //reset task success
            dispatch(resetTaskSuccess());
        }
        if (taskListDeleteSuccess) {
            dispatch(resetTaskListSuccess());
            let newTask = [...trackDeleteIds];
            //remove items from newTask from TaskIds.
            if (tasksIds.length > 0) setTasksIds(tasksIds.filter(e => !newTask.includes(e)))
        }
        if (uuidValidate(projectId)) dispatch(getTaskList(projectId));
        return () => {
        
            //document.removeEventListener("click", onClickOutsideTable)
        }
    }, [taskSuccess, projectId, taskListDeleteSuccess]
    )

    /**
     * @description
     * - @Reset all task to default
     * 
     */
    const resetOnChangeStateToDefault = () => {
        if (taskName) setTasktName("");
        if (taskDescription) setTaskDescription("");
    }
    /**
     * @description
     *  - @AddTask - add task
     */
    const onhandleAddTask = (e) => {
        e.stopPropagation();
        /**
         * @description
         * - Taskname do not need to show empty since we already lock
         *   button if it is empty
         * - Taskdate do not need to show empty since we already
         *   set default value from it
         * 
         * */
     
        const newTask = {
            taskName,
            taskDescription,
            taskDate,
            projectId,
            taskStatus:status 
        }
        dispatch(createTask(newTask))
        resetOnChangeStateToDefault();
    }
    /**
     * @description
     *   - @Modal
     */
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    };
    const handleShowDeleteModal = () => {
        setShowDeleteModal(true)
    };
    /**
       * @description
       *   - @DeleteTask Delete tasks in Bulk(array)
       */
    const onhandleDeleteTask = () => {
        handleCloseDeleteModal();
        if (tasksIds.length > 0 )setTrackDeleteIds([...tasksIds]);
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
    /**
    * @Description
    *  - @onhandleChangeTick tick box
    */
    const onhandleChangeTick = (e) => {
        const { checked, value } = e.target;
        if (checked === false) {
    
            /**
             * 1. track and untrack -- done
             * 2. track all lot of items, and untrack one by one -- done
             * 3. all item exist, click track one of item and delete
             * 
             */
            const newTask = tasksIds.filter((val, index) => val != value);
            setTasksIds(newTask);
        } else {
            console.log("ticked");
            setTasksIds([...tasksIds, value]);
        }
        setIsChecked(true);
    }
    /**
     * @Description
     *  - @Show the @Cancel and @Add button
     */
    const switchShowFillInput = (e) => {
        e.stopPropagation();
        setShowInputFill(true);
     
    }
    const onhandleCloseInputFill = () => {
        setShowInputFill(false);
    }
    /**
     * 
     * @Description
     *  - @HandleEditonChange on All edit task 
     */
    const onhandleEditChangeTaskName = (e, index) => {
        const {value} = e.target;
        setTasktName(value)
        taskListData[index].task_name = value;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleEditChangeTaskDescription = (e, index) => {
        const {value} = e.target;
        setTaskDescription(value)
        taskListData[index].task_description = value;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleEditDropDownStatus = (eventKey, event, index) => {
        event.stopPropagation();
        setStatus(eventKey);
        taskListData[index].task_status = eventKey;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleEditChangeTaskDate = (e, index) => {
        const { value } = e.target;
        setTaskDate(value)
        taskListData[index].task_date = value;
        dispatch(updateTaskListState(taskListData))
    }
    const onhandleClickEditTask = (e, index) => {
        e.stopPropagation();
        setIsEditTask(true);
        setEditIndex(index);
    }
    /**
     * 
     * @Description
     *  - @onClickOutsideTable update task
     */
    const onClickOutsideTable = () => {
        // send update to api 
        const taskId = taskListData[editIndex]?.id
        const newTask = {
            taskName: taskListData[editIndex]?.task_name,
            taskDescription: taskListData[editIndex]?.task_description,
            taskDate: taskListData[editIndex]?.task_date,
            projectId,
            taskStatus: taskListData[editIndex]?.task_status
        }
        //if edit task is true, we will send api
        if(isEditTask){
            setIsEditTask(false)
            dispatch(updateTask(projectId, taskId, newTask))
        }
    }
   
    return (
        <div 
            className={`p-3 ${styles["sub-project-list-container"]}`}
            onClick={onClickOutsideTable}
            >
            {/* <Container className={`${styles["sub-project-list-container"]} p-5 border border-danger `}> */}
            <div className='container '>    
                <TableModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    title={tasksIds.length === 1 ? `Delete this task?` : "Delete these tasks?"}
                    bodyText="hello "
                    onhandleDeleteTask={onhandleDeleteTask}
                />
                <div className='d-flex mb-5'>
                    <div className='d-flex align-items-center'>
                        <i className="bi bi-book"></i>
                    </div>
                    <h5 className='fw-bold ms-2'>{projectNameHeading}</h5>
                </div>
                <Breadcrumb className={`${styles['all-task-texts']} `}>
                    <Breadcrumb.Item href="#">All tasks</Breadcrumb.Item>
                    <Breadcrumb.Item active>This week</Breadcrumb.Item>
                    {tasksIds.length > 0 &&
                        <div className={`${styles.trash} ms-auto`} onClick={handleShowDeleteModal}>
                            <div className={`text-center`}>
                                <i className={`bi bi-trash`}></i>
                            </div>
                            <div className='fw-bold'>Delete</div>
                        </div>
                    }
                </Breadcrumb>
                <div className={` table-responsive card  p-3 ${styles['border-table']} `}>
                    <table className=" table table-bordered rounded rounded-3    ">
                        <thead>
                            <tr>
                                <th scope="col" className={`${styles.tick_box_heading}`}>
                                </th>
                                <th scope="col" className={`${styles.td}`}>Task name</th>
                                <th scope="col" className={`${styles.td}`}>Description</th>
                                <th scope="col" className={`${styles['status-heading']}`}>Status</th>
                                <th scope="col" className={`${styles['date-heading']}`}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 
                                Show data that have already added.
                            */} 
                            {taskListData.length > 0 ?
                                taskListData.map((val, index) =>
                                    <tr key={val?.id}>
                                        <th scope="col" onClick={(e) => { e.stopPropagation() }}
                                        >
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
                                                    className={`${styles.textarea_edit} p-2`}
                                                    placeholder="Task name"
                                                    value={val?.task_name}
                                                   
                                                    onChange={(e) => onhandleEditChangeTaskName(e, index)}
                                                    id="floatingTextarea">
                                                </textarea>
                                            </td>

                                            :
                                            <td
                                                onClick={(e) => onhandleClickEditTask(e, index)}
                                                className={` text-break ${styles['task-col']}`}
                                                >
                                                <div >
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
                                                className={`text-break ${styles['task-col']}`}
                                                >
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
                                                            className={
                                                                `${val?.task_status !== DONE ? `${styles['dropdown-item-1']}` : `${styles['dropdown-item-2']}`}`
                                                            }
                                                        >
                                                            {val?.task_status === PROGRESS ? DONE : PROGRESS}
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            :
                                            <td
                                             
                                                className={`${styles['task-col']} ${styles['progress-column']} `}
                                                onClick={(e) => onhandleClickEditTask(e, index)}
                                            >
                                                <div 
                                                className={`d-flex align-items-center justify-content-center
                                                ${styles['sub-progress-column']}`}
                                                >
                                                    <div
                                                        className={`${val.task_status === PROGRESS ? `badge bg-danger` : `badge bg-success`}`}>
                                                        {val?.task_status}
                                                    </div>
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
                                            <td className={`${styles['task-col']} ${styles['date-column']} `}
                                                onClick={(e) => onhandleClickEditTask(e, index)}
                                            >
                                                
                                                <div className={`d-flex align-items-center justify-content-center
                                                ${styles['sub-date-column']}`}>
                                                    {val?.task_date}
                                                </div>
                                          
                                            </td>
                                        }
                                    </tr>
                                )
                                :
                                ""
                            }
                            {/* 
                                Show Cancel and Add Button 
                            */} 
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
                                    <td className={`p-0`}>
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
                                    <td className={`d-flex justify-content-center ${styles['task-col']}`}>
                                        <Dropdown onSelect={onhandleSelectDropDown}>
                                            <Dropdown.Toggle
                                                className={`${styles['dropdown-toggle']}`}
                                                variant={status === DONE ? "success" : "danger"}
                                                id="dropdown-basic" >
                                                {status === "" || status === PROGRESS ? PROGRESS : DONE}
                                                {/* {status === "" ? PROGRESS: DONE} */}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                className={`${styles['dropdown-menu']}`}>
                                                <Dropdown.Item
                                                    eventKey={status === "" || status === PROGRESS ? DONE : PROGRESS}
                                                    className={status === "" || status === PROGRESS ? `${styles['dropdown-item-1']}` : `${styles['dropdown-item-2']}`}
                                                >
                                                    {status === "" || status === PROGRESS ? DONE : PROGRESS}
                                                    {/* {status !== "" ? PROGRESS : DONE} */}
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
                                        {/* {isDateEmpty && <div className='text-danger'>Input date cannot be empty</div>} */}
                                    </td>
                                    {/* <td className=''><i className={`${styles.trash} bi bi-trash`}></i></td> */}
                                </tr>
                            }
                        </tbody>
                    </table>
                    <Row>
                        <Col md={9}>
                            <div className={`${styles.add_task_plus_sign} d-flex gap-2 `} onClick={switchShowFillInput}>
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
            </div>
            {/* </Container>
           */}
        </div>


    );
};

export default TaskTableList;
