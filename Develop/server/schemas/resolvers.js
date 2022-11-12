const { AuthenticationError } = require('apollo-server-express');
const { Book , User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    books: async () => {
      return Book.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
   
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

   
    addBook: async (parent, args, context) => {
      
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: args.userId },
          {
            $addToSet: {
              saveBook: { authors: args.authors, description: args.description, title: args.title, bookId: args.bookId, image: args.image,link: args.link },
            }
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
   
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    removeBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { saveBook:{ bookId} },
        },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
