import { AppDataSource } from "../data-source";
import { Montadora } from "./montadora.entity";

export const montadoraRepository = AppDataSource.getRepository(Montadora);