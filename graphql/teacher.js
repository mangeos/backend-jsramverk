const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const TeacherType = new GraphQLObjectType({
    name: 'documents',
    description: 'This represents the documents',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) }
       
    })
})

module.exports = TeacherType;