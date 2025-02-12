import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Montadora } from "./montadora.entity";
import { Veiculo } from "./veiculo.entity";


@Entity()
export class Modelo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: String;

  @ManyToOne(() => Montadora, (montadora) => montadora.modelos)
  montadora: Montadora;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.modelo)
  veiculos: Veiculo[];
}
