/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pet(_, {input}, ctx, info) {
      return ctx.models.Pet.findOne(input)
    },
    pets(_, {input}, ctx, info) {
      return ctx.models.Pet.findMany(input)
    },
    user(_, args, ctx, info) {
      return ctx.models.User.findOne()
    },
  },
  // Mutation: {

  // },
  // Pet: {
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  // },
  // User: {

  // }
}
