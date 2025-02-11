import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Modelo } from "./modelo.entity";

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: string;

  @Column()
  valor: number;

  @ManyToOne(() => Modelo, (modelo) => modelo.veiculos)
  modelo: Modelo;
}
