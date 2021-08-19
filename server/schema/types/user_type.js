const graphql = require('graphql');
const {
    GraphQLObjecType,
    GraphQLString,

} = graphql;

const UserType = new GraphQLObjecType({
    name: 'UserType',
    fields: {
        email: { type: GraphQLString }
    },
});

module.exports = UserType;

