import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMontadoraModeloVeiculo1738969711887 implements MigrationInterface {
    name = 'UpdateMontadoraModeloVeiculo1738969711887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "veiculo" ADD "valor" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "montadora" ADD "pais" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "montadora" ADD "ano_fundacao" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "montadora" DROP COLUMN "ano_fundacao"`);
        await queryRunner.query(`ALTER TABLE "montadora" DROP COLUMN "pais"`);
        await queryRunner.query(`ALTER TABLE "veiculo" DROP COLUMN "valor"`);
    }

}
