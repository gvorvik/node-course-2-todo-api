const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
    _id: new ObjectID(),
    text: "first test"
}, {
    _id: new ObjectID(),
    text: "second test"
}];

//Testing lifecycle method running before each test case
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
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
                Todo.find({text}).then((todos) => {
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
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});


// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);
//     });
// });


describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        //make a reqest using a real object id
        //use to hex string
        //call newObjectID to create a new one
        //make sure we get 404 back
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('it should return 404 for non-object ids',(done) => {
        // /todos/123 for example
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id.toBe(hexId));
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                //query database using findById and toNotExist
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});



