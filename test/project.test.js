
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
//         //     .set("authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

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
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI3OTY0ODgsImV4cCI6MTY4Mjc5NzY4OH0.IOWupunOnf-faUEv_jc9ZOh5-XzbxzGa2Qf2RPnmAWg"
const userId = "37df9195-0260-47c8-aaab-ebc2749c6d13"
describe('POST /api/v1/projects', function () {
    it("return status 200 ", async function () {
     
        const response = await request.post(`/${userId}/projects`)
        .send({
            projectName: "This is my project",
            projectDescription: "My usual layover when visiting family"
        })
        .set("authorization", `Bearer ${accessToken}`);
        expect(response.status).to.eql(200);

        // expect(response.status).to.eql(401);
        // const getResponse = await request
        //     .get(`/favorites/${favoriteId}`)
        //     .set("authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

     
    });
});

describe('GET /api/v1/{userId}/projects', function () {
    it("return status 200 ", async function () {
        const response = await request
                        .get(`/${userId}/projects`)
            .set("authorization", `Bearer ${accessToken}`);
        expect(response.status).to.eql(200);

    });
});

