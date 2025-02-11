import { AppDataSource } from "../data-source";
import { MyGQLContext } from "./context-graphql";
import { Montadora } from "./montadora.entity";

export const resolvers = {
  Query: {
    // montadoras: () => Montadora.find()
    montadoras: async (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)
      const montadoraRepository = AppDataSource.getRepository(Montadora);

      return await montadoraRepository.find();
    },
  },
  Mutation: {
    AddMontadora: async (_: any, { nome, pais, ano_fundacao }: Montadora) => {
      const montadorarepository = AppDataSource.getRepository(Montadora);

      const novaMontadora = new Montadora();
      novaMontadora.nome = nome;
      novaMontadora.pais = pais;
      novaMontadora.ano_fundacao = ano_fundacao;

      await montadorarepository.save(novaMontadora);

      return novaMontadora;
    },
  },
};

export default resolvers;
