import { AppDataSource } from "../data-source";
import { Modelo } from "./modelo.entity";

export const montadoraRepository = AppDataSource.getRepository(Modelo);