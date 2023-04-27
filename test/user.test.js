
const chai = require('chai');
const expect = chai.expect;
const app = require('../app'); // Replace with the path to your Express app file
const request = require("supertest")("http://0.0.0.0:5000/api/v1");

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
describe('POST /api/v1/user/signup', function () {
    it("return status 422 expected password incorrect ", async function () {
        const response = await request.post("/user/signup").send({
            email: "yuth@gmail.com",
            firstName: "darayuth",
            lastName:"hang",
            password:"Yuth"
        });
        expect(response.status).to.eql(422);
    });
});

describe('POST /api/v1/user/signup', function () {
    it("return status 200 expected user can sign up ", async function () {
        const response = await request.post("/user/signup").send({
            email: "yuth@gmail.com",
            firstName: "darayuth",
            lastName: "hang",
            password: "Yuthhang!@3"
        });
        expect(response.status).to.eql(200);
        // const verifyResponse = await request.post("/user/verify").send({
        //     email: "yuth@gmail.com",
        //     verificationCode:""
            
        // });
        // expect(response.status).to.eql(200);
        // const attributes = response.body.data;
        // console.log(attributes);
        // const projectResponse = await request.post("/projects").send({
        //     project_name: "This is my project",
        //     description: "My usual layover when visiting family",
        //     user_id:attributes?.user_id
        // });
        // expect(response.status).to.eql(200);
        // const response = await request.post("/user/verify").send({
        //     email: attributes?.email,
        //     firstName: "darayuth",
        //     lastName: "hang",
        //     password: "Yuthhang!@3"
        // });
    });
});

