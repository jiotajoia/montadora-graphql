import { AppDataSource } from "../data-source";
import { Veiculo } from "./veiculo.entity";

export const montadoraRepository = AppDataSource.getRepository(Veiculo);