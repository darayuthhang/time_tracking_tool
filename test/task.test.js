
const chai = require('chai');
const expect = chai.expect;
const app = require('../app'); // Replace with the path to your Express app file
const request = require("supertest")("http://localhost:5000/api/v1");

/**
 * @Problemsolve i run it two time between local host and docker
 * just run in docker it will pass.
 */
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI3OTY0ODgsImV4cCI6MTY4Mjc5NzY4OH0.IOWupunOnf-faUEv_jc9ZOh5-XzbxzGa2Qf2RPnmAWg"
const projectId = "a9c69f98-c90a-4329-bdcc-3d39d958dd50"
describe('POST /api/v1/${projectId}/tasks', function () {
    it('should return status 200', async function () {
        const response = await request.post(`/${projectId}/tasks`)
            .send({
                tasks: [
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
            })
            // .set("authorization", `Bearer ${accessToken}`);

        await expect(response.status).to.eql(200);
    });
    it('should return status 422', async function () {
        const response = await request.post(`/${projectId}/tasks`)
            .send({
                tasks:""
            })
        // .set("authorization", `Bearer ${accessToken}`);

        await expect(response.status).to.eql(422);
    });
});
