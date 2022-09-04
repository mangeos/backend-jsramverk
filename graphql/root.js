const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const TeacherType = require("./teacher.js");


const courses = require("../models/courses.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        document: {
            type: TeacherType,
            description: 'A single teacher',
            args: {
                acronym: { type: GraphQLString }
            },
            resolve: async function (parent, args) {
                let teachers = await getPeople("allowed_user");

                return teachers.find(teacher => teacher.acronym === args.acronym)
            }
        },
        documents: {
            type: new GraphQLList(TeacherType),
            description: 'List of teachers',
            resolve: async function () {
                return await courses.getAll();
            }
        }
    })
});

async function getPeople(entity) {
    let courseArray = await courses.getAll();
    let people = [];
    
   // console.log(courseArray);
    for (let index = 0; index < courseArray.length; index++) {
        people.push(courseArray[index]);
    }
   // courseArray.forEach(function (course) {
     //   console.log(course.entity);
       
      /*  course[entity].forEach(function (person) {
            if (acronyms.indexOf(person.acronym) === -1) {
                people.push(person);
                acronyms.push(person.acronym);
            }
        });*/
    //});

    return people;
}

module.exports = RootQueryType;