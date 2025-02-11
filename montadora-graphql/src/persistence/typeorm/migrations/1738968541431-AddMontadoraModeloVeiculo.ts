import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMontadoraModeloVeiculo1738968541431 implements MigrationInterface {
    name = 'AddMontadoraModeloVeiculo1738968541431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "veiculo" ("id" SERIAL NOT NULL, "placa" character varying NOT NULL, "modeloId" integer, CONSTRAINT "PK_0fcc9d29b16ed347447f8f9356e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modelo" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "montadoraId" integer, CONSTRAINT "PK_4d5d3a7d7efe7e5f03944aa15d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "veiculo" ADD CONSTRAINT "FK_8f52f96f420f2138cf6bf246a8e" FOREIGN KEY ("modeloId") REFERENCES "modelo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "modelo" ADD CONSTRAINT "FK_67771d4ab6d45aac5082b1f5262" FOREIGN KEY ("montadoraId") REFERENCES "montadora"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modelo" DROP CONSTRAINT "FK_67771d4ab6d45aac5082b1f5262"`);
        await queryRunner.query(`ALTER TABLE "veiculo" DROP CONSTRAINT "FK_8f52f96f420f2138cf6bf246a8e"`);
        await queryRunner.query(`DROP TABLE "modelo"`);
        await queryRunner.query(`DROP TABLE "veiculo"`);
    }

}
