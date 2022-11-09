const { ApolloServer } = require("apollo-server");
const LRU = require("lru-cache");
const { generate } = require("shortid");

const typeDefs = `
  type Query {
    todos: [Todo]
		todo(id: String!): Todo
  }

	type Todo {
		id: String!
    title: String!
    completed: Boolean!
	}

	type Mutation {
		addTodo(title: String!): Todo
    updateTodo(id: String!, completed: Boolean!): Todo
    deleteTodo(id: String!): String
	}
`;

let todos = [];
todos.push({ id: generate(), title: "Our first item", completed: false });

const resolvers = {
  Query: {
    todos: () => {
      return todos;
    },
    todo: (_, { _id }) => {
      return todos.find((todo) => todo.id === _id);
    },
  },
  Mutation: {
    addTodo: (_, { title }) => {
      const id = generate();
      const completed = false;
      const todo = { id, title, completed };
      todos.push(todo);
      return todo;
    },
    updateTodo: (_, { id, completed }) => {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) todo.completed = completed;
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const index = todos.indexOf((todo) => todo.id === id);
      todos = todos.filter((todo) => todo.id !== id);
      return "Deleted!";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
