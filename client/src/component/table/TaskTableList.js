import React, { useState, useEffect } from 'react';
import styles from './table.module.css';

import {
    Breadcrumb,
    Dropdown, Row, Col,
    Button
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, deleteTaskList, getTaskList, resetTaskListSuccess, resetTaskSuccess, updateTaskListState } from '../../redux/action/TaskAction';
import TableModal from './TableModal';
import { defaultDate } from '../../uti';

const TaskTableList = ({ projectNameHeading, projectId }) => {
    const [tasksIds, setTasksIds] = useState([]);
    const [taskName, setTasktName] = useState("");
    const [taskDate, setTaskDate] = useState(defaultDate());
    const [taskDescription, setTaskDescription] = useState("");
    const [status, setStatus] = useState("Progress");
    const [statusDone, setStatusDone] = useState("Done");
    const [showInputFill, setShowInputFill] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditTaskName, setIsEditTaskName] = useState(false);

    const dispatch = useDispatch();
    const { taskRequest, taskSuccess } = useSelector((state) => state.taskReducers);
    const { taskListRequest, taskListData } = useSelector((state) => state.taskListReducers);
    const { taskListDeleteRequest, taskListDeleteSuccess } = useSelector((state) => state.taskListDeleteReducers)
    
    useEffect(() => {
        /**
         * @This is best practice do not change
         */
        if (taskSuccess) {
            //reset task success
            dispatch(resetTaskSuccess());
        }
        if (taskListDeleteSuccess){
            // dispatch(reset)
            dispatch(resetTaskListSuccess());
        }
        dispatch(getTaskList(projectId));
        return () => {
        }
    }, [taskSuccess, projectId, taskListDeleteSuccess])

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
        setShowDeleteModal(false)};
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
    const onhandleSelectDropDown = (e) => {
        if (e === "Done") {
            setStatusDone("Progress")
        } else if (e === "Progress") {
            setStatusDone("Done")
        }
        setStatus(e);
    }
    const onhandleChangeTick = (e) => {
        const {checked, value} = e.target;
        if(checked === false){  
            const newTask = tasksIds.filter((val, index) => val != value)
            setTasksIds(newTask);
        }else{
            setTasksIds([...tasksIds, value]);
        }
    }
    const switchShowFillInput = () => {
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
    const onClickColumnTaskName = () => {
        setIsEditTaskName(true);
    }
    const onhandleEditChangeTaskName = (e, index) => {
        taskListData[index].task_name = e.target.value;
        dispatch(updateTaskListState(taskListData))
    }
    return (
        <div className='fs-5'>
            <TableModal 
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                title={tasksIds.length === 1 ? `Delete this task?`: "Delete these tasks?"}
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
            <Breadcrumb className={`${styles['all-task-texts']}`}>
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
            <div className={`table-responsive card  p-3 ${styles['all-task-texts']}`}>
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
                                    {isEditTaskName ? 
                                        <textarea
                                            rows="1"
                                            className={`${styles.textarea} p-2`}
                                            placeholder="Task name"
                                            value={val?.task_name}
                                            onChange={(e) => onhandleEditChangeTaskName(e, index)}
                                            id="floatingTextarea">
                                        </textarea>
                                    :
                                        <td
                                            onClick={onClickColumnTaskName}
                                            className={`${styles['task-col']}`}>
                                            {val?.task_name}
                                        </td>
                                    }
                                  
                                    <td className={`${styles['task-col']}`}>{val?.task_description}</td>
                                    <td className={`d-flex justify-content-center ${styles['task-col']}`}>
                                        <div className={val.task_status === "progress" ? `badge bg-danger`:`badge bg-success`}>
                                            {val?.task_status}
                                        </div>
                                    </td>
                                    <td className={`${styles['task-col']}`}>
                                        {val?.task_date}
                                    </td>
                                    {/* <td>
                                        <i className={`${styles.trash} bi bi-trash`}></i>
                                    </td> */}
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
                                            variant={status === "Done" ? "success" : "danger"}
                                            id="dropdown-basic" >
                                            {status}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            className={`${styles['dropdown-menu']}`}>
                                            <Dropdown.Item
                                                eventKey={statusDone === "Done" ? "Done" : "Progress"}
                                                className={statusDone === "Done" ? `${styles['dropdown-item-1']}` : `${styles['dropdown-item-2']}`}
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
                        <div className={`${styles.add_task_plus_sign} d-flex gap-2`} onClick={switchShowFillInput}>
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


    );
};

export default TaskTableList;
