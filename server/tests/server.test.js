const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


//Testing lifecycle method running before each test case
beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    });
});

//describe block to organize it statements during test
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        //this is using supertest and expect modules FYI
        //Look at their documentation online to learn more
        request(app)
            .post('/todos')
            //new send method due to sending in data via todo
            .send({text})
            .expect(200)
            //ensures response text equals the text we sent in
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                //fetches all the todos
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            //sends in invalid data
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});







