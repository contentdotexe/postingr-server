import { GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User Type",
  fields: () => ({
    id: globalIdField("User"),
    name: {
      type: GraphQLString,
      resolve: (post) => post.name,
    },
    email: {
      type: GraphQLString,
      resolve: (post) => post.email,
    },
    password: {
      type: GraphQLString,
      resolve: (post) => post.password,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (post) => post.createdAt,
    },
  }),
});

const { connectionType: UserConnection, edgeType: UserEdge } = connectionDefinitions({
    nodeType: UserType
});

export {
    UserConnection,
    UserEdge
}

export default UserType;
