import React, {useState} from 'react';
import styles from './table.module.css';
import {
   Breadcrumb
} from 'react-bootstrap';
const TaskTableList = ({projectNameHeading}) => {
    const [tasks, setTasks] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [showInputFill, setShowInputFill] = useState(false);
    

    /**
     * Project id 
     *  tasks: [
                    {
                        task_description: "this is descrpition",
                        task_name: "this task name",
                        created_at: new Date(),
                        project_id: projectId
                    },
                    {
                        task_description: "this is descrpition",
                        task_name: "this task name",
                        created_at: new Date(),
                        project_id: projectId
                    },
                    {
                        task_description: "this is descrpition",
                        task_name: "this task name",
                        created_at: new Date(),
                        project_id: projectId
                    }
                ]
     */
    const onhandleAddTask = () => {
        const newTasks = {
            task_description: "this is descrpition",
            task_name: "this task name",
            created_at: new Date(),
            project_id: "id"
        }
        setTasks([...tasks, newTasks])
    }
    const onhandleDeleteTask = (position) => {
        const newTask = tasks.filter((val, index) => index != position)
     
        setTasks(newTask);
    }
    const onhandleChangeProjectName = (e) => {

    }
    const onhandleChangeDescriptionName = (e) => {

    }
    const onhandleChangeStatus = (e) => {

    }
    const switchShowFillInput = () => {
        setShowInputFill(true);
    }
    const onhandleCloseInputFill = () => {
        setShowInputFill(false);
    }
    return (
        <div>
            <div className='d-flex gap-4 mb-5'>
                <div className='d-flex align-items-center'>
                    <i className="bi bi-book"></i>
                </div>
                <h1 className='fw-bold'>{projectNameHeading}</h1>
            </div> 
            <Breadcrumb>
                <Breadcrumb.Item href="#">All Tasks</Breadcrumb.Item>
                <Breadcrumb.Item active>This week</Breadcrumb.Item>
            </Breadcrumb>
            <div class="table-responsive card">
                <table class="table table-bordered rounded rounded-3 text-center  ">
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
                            <th scope="col" className=''>Status</th>
                            <th scope="col" className=''>Date</th>
                            <th scope="col" className={`${styles.trash_heading}`}>
                                {/* <i className={`${styles.trash} bi bi-trash`}></i> */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ?
                            tasks.map((val, index) =>
                                <tr key={index}>
                                    <th scope="col">
                                        <div className='d-flex justify-content-center mt-1 '>
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                        </div>
                                    </th>
                                    <td className=''>{val?.task_name}</td>
                                    <td>{val?.task_description}</td>
                                    <td className='d-flex justify-content-center'>
                                        <div className="d-flex gap-2 justify-content-center badge bg-success text-wrap"
                                            style={{ width: '6rem' }}>
                                            <div className='mt-1 fw-bold '></div>
                                            <div>
                                                <i className="bi bi-check fs-5 fw-bold "></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td>
                                        <i className={`${styles.trash} bi bi-trash`}></i>
                                    </td>
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
                                <td className={``}>
                                    <textarea
                                        rows="1"
                                        className={`${styles.textarea}`}

                                        placeholder="Task name"
                                        id="floatingTextarea"></textarea>
                                </td>
                                <td>
                                    <textarea 
                                    rows="1"
                                        className={`${styles.textarea}`} 
                                    
                                    placeholder="Leave a comment here" 
                                    id="floatingTextarea"></textarea>
                                </td>
                                <td className=' d-flex justify-content-center '>
                                    <div className="d-flex gap-2 justify-content-center badge bg-success text-wrap"
                                        style={{ width: '50px' }}>

                                        <div>
                                            <i className="bi bi-check fs-5 fw-bold "></i>
                                        </div>
                                    </div>
                                </td>
                                <td className=''></td>
                                <td className=''><i className={`${styles.trash} bi bi-trash`}></i></td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className='d-flex'>
                    <div className={`${styles.add_task_plus_sign} d-flex gap-2`} onClick={switchShowFillInput}>
                        <div className={` ms-3 fw-bold`} >+</div>
                        <p>Create new TaskList</p>
                    </div>
                    {showInputFill &&
                        <div className='ms-auto d-flex gap-2 me-3 mb-1 mt-auto'>
                            <button className='btn btn-light ' onClick={onhandleCloseInputFill}>Cancel</button>
                            <button className=' btn btn-danger  '>Add task</button>
                        </div>
                    }
                </div>
            </div >
        </div>
       
       
    );
};

export default TaskTableList;
