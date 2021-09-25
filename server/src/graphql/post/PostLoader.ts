const PostModel =  require("./PostModel");

export async function loadAllPosts() {
  try {
    const posts = await PostModel.find().sort({createdAt: -1});
    if (!posts) {
      return null;
    }
    return posts.map(post => {
        return {  ...post._doc, id: post._id}
    });
  } catch (err) {
    throw err;
  }
}