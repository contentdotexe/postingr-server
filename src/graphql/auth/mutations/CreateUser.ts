import { GraphQLNonNull, GraphQLString, isRequiredArgument } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
const UserModel = require("../UserModel");
import { UserEdge } from "../UserType";
const bcrypt = require("bcryptjs");

export default mutationWithClientMutationId({
  name: "CreateUser",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    const existingUser = await UserModel.find({ email: email });
    if (existingUser) {
      throw new Error("User already exists.");
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });
      const result = await user.save();
      return {
        user: {
          ...result._doc,
          id: result.id,
        },
        error: null,
        success: "Post created successfully",
      };
    } catch (err) {
      throw err;
    }
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: async ({ user }) => {
        if (!user) {
          return null;
        }

        return {
          cursor: toGlobalId("Post", user.id),
          node: user,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }: { error: string }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: { success: string }) => success,
    },
  },
});
