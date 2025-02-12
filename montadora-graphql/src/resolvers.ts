import { AppDataSource } from "../data-source";
import { MyGQLContext } from "./context-graphql";
import { Montadora } from "./montadora.entity";
import { Modelo } from "./modelo.entity";
import { Veiculo } from "./veiculo.entity";

const montadoraRepository = AppDataSource.getRepository(Montadora);
const modeloRepository = AppDataSource.getRepository(Modelo);
const veiculoRepository = AppDataSource.getRepository(Veiculo);

export const resolvers = {
  Query: {
    // montadoras: () => Montadora.find()
    montadoras: async (_parent: any, _args: any, context: MyGQLContext, _info: any) => {
      console.log(`User: ${context.user}`)

      return await montadoraRepository.find();
    },

    //modelos
    modelos: async (_parent: any, _args: any, context: MyGQLContext, _info: any) =>{
      console.log(`User: ${context.user}`);

      return await modeloRepository.find({
        relations: ['montadora', 'veiculos']
      });
    },

    //veiculos
    veiculos: async (_parent: any, _args: any, context: MyGQLContext, _info: any) =>{
      console.log(`User: ${context.user}`)

      return await veiculoRepository.find({
        relations: ['modelo']
      });
    } 
  },
  Mutation: {
    AddMontadora: async (_: any, { nome, pais, ano_fundacao }: Montadora) => {

      const novaMontadora = new Montadora();
      novaMontadora.nome = nome;
      novaMontadora.pais = pais;
      novaMontadora.ano_fundacao = ano_fundacao;

      await montadoraRepository.save(novaMontadora);

      return novaMontadora;
    },

    AddModelo: async (_: any, { nome, montadoraId }: { nome: String, montadoraId: number }) => {

      const montadora = await montadoraRepository.findOne({ where: { id: montadoraId } });
      if (!montadora) {
        throw new Error("Montadora não encontrada");
      }

      const novoModelo = new Modelo();
      novoModelo.nome = nome;
      novoModelo.montadora = montadora;

      await modeloRepository.save(novoModelo);

      return novoModelo;

    },

    AddVeiculo: async (_: any, { placa, valor, modeloId }: {placa: String, valor: number, modeloId: number}) => {

      const modelo = await modeloRepository.findOne({where: {id:modeloId}});
      if(!modelo){
        throw new Error("Modelo não encontrado");
      }

      const novoVeiculo = new Veiculo();
      novoVeiculo.placa = placa;
      novoVeiculo.valor = valor;
      novoVeiculo.modelo = modelo;

      await veiculoRepository.save(novoVeiculo);

      return novoVeiculo;

    },
  },
};


export default resolvers;
