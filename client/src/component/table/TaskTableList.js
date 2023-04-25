import React from 'react';
import styles from './table.module.css';
const TaskTableList = () => {
    return (
        <div class="table-responsive card">
            <table class="table table-bordered rounded rounded-3  ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
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
