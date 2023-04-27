
const chai = require('chai');
const expect = chai.expect;
const app = require('../app'); // Replace with the path to your Express app file
const request = require("supertest")("http://localhost:5000/api/v1");

// describe('GET /api/v1/projects', function () {
//     it("return status 200 ", async function () {
//         // const response = await request.post("/favorites").send({
//         //     airport_id: "JFK",
//         //     note: "My usual layover when visiting family",
//         // });

//         // expect(response.status).to.eql(401);
//         // const getResponse = await request
//         //     .get(`/favorites/${favoriteId}`)
//         //     .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

//         const response = await request.get("/projects");

//         expect(response.status).to.eql(200);
//         // expect(response.body.data.length).to.eql(30);
//     });
// });
// const attributes = response.body.data.attributes;
// expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
// expect(attributes.kilometers).to.eql(8692.066508240026);
// expect(attributes.miles).to.eql(5397.239853492001);
// expect(attributes.nautical_miles).to.eql(4690.070954910584);
describe('POST /api/v1/projects', function () {
    it("return status 200 ", async function () {
        const userId = "8bbf9411-a225-4d31-8f73-356e8bf98e37"
        const response = await request.post(`/${userId}/projects`).send({
            projectName: "This is my project",
            projectDescription: "My usual layover when visiting family"
        });
        expect(response.status).to.eql(200);

        // expect(response.status).to.eql(401);
        // const getResponse = await request
        //     .get(`/favorites/${favoriteId}`)
        //     .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

     
    });
});
