import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
const PostModel = require("../PostModel");
import { PostEdge } from "../PostType";

export default mutationWithClientMutationId({
  name: "CreatePost",
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ title, body }) => {
    try {
      const post = new PostModel({
        title,
        body,
        createdAt: new Date().toISOString(),
        author: "IuINjkL3489gdfd4285485243759quweifhskdjdsaj=",
      });
      const result = await post.save();
      console.log(result._doc);
      return {
        post: {
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
    postEdge: {
      type: PostEdge,
      resolve: async ({ post }) => {
        if (!post) {
          return null;
        }

        return {
          cursor: toGlobalId("Post", post.id),
          node: post,
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
