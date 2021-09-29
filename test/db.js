/**
* Test for class Car, parameterized version of testsuite.
 */
"use strict";

/* global describe it */

//var assert = require("assert");


process.env.NODE_ENV = 'test';

const db = require("../db/database.js");

const chai = require('chai');
const chaiHttp = require('chai-http');
var assert = require("assert");

const server = require('../app.js');

chai.should();

chai.use(chaiHttp);


describe('app', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH getting base', (done) => {
            chai.request(server)
                .get("/db")
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.should.be.an("object");
                   // res.body[1]._id.should.be.an("string");
                    for (let i = 0; i < res.body.length; i++) {
                        res.body[i]._id.should.be.an("string");
                    }
                    done();
                });
        });

    });
});

describe('app', () => {
    describe('POST /', () => {
        it('should send parameters to : /db POST', (done) => {
            chai.request(server)
                .post("/db")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(
                    {
                        title: "testing",
                        html: "Testing"
                    }
                )
                .end((err, res) => {
                    console.log(res.body);
                    done();
                });
        });

    });
});
