import { ApolloServer } from 'apollo-server';
import { schema } from './graphql/schema';
import * as mongoose from 'mongoose';

const server = new ApolloServer({
    schema
});

server.listen(4000, () => {
    console.log('Server is running!');
    mongoose.connect(`mongodb+srv://f59Ngbd:Chineque123@postingr.pxxef.mongodb.net/Postingr?
    retryWrites=true&w=majority`)
    .then(() => console.log('MongoDB is connected successfully!'))
    .catch(err => console.log({'Connection with database failed': err}))
})