import React from 'react';
import styles from './table.module.css';
const TaskTableList = () => {
    return (
        <div class="table-responsive card">
            <table class="table table-bordered rounded rounded-3 text-center  ">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Project name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            <div className='d-flex justify-content-center mt-1 '>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />   
                            </div>    
                        </th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td className='d-flex justify-content-center'>
                            <div className="d-flex gap-2 justify-content-center badge bg-success text-wrap" 
                            style={{ width: '6rem' }}>
                                <div className='mt-1 fw-bold '>Done</div>
                                <div>
                                    <i className="bi bi-check fs-5 fw-bold "></i>
                                </div>
                            </div>
                        </td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
         
            <div className='d-flex gap-2'>
                <div className='ms-3'>+</div>
                <p>Create new TaskList</p>
            </div>
        </div>
       
    );
};

export default TaskTableList;
