import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Modelo } from "./modelo.entity";

@Entity()
export class Montadora extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: String

    @Column()
    pais: String

    @Column()
    ano_fundacao: number

    @OneToMany(() => Modelo, (modelo) => modelo.montadora)
    modelos: Modelo[]
}