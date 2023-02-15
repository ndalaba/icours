import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTable1675350986392 implements MigrationInterface {
    name = 'migrationTable1675350986392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`classe_course\` (\`classesId\` int NOT NULL, \`coursesId\` int NOT NULL, INDEX \`IDX_793fdb12be0c0d6f4ae0ac2279\` (\`classesId\`), INDEX \`IDX_86e4db37f2d9383c7f8cdc64c4\` (\`coursesId\`), PRIMARY KEY (\`classesId\`, \`coursesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`classe_course\` ADD CONSTRAINT \`FK_793fdb12be0c0d6f4ae0ac22791\` FOREIGN KEY (\`classesId\`) REFERENCES \`classes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`classe_course\` ADD CONSTRAINT \`FK_86e4db37f2d9383c7f8cdc64c41\` FOREIGN KEY (\`coursesId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`classe_course\` DROP FOREIGN KEY \`FK_86e4db37f2d9383c7f8cdc64c41\``);
        await queryRunner.query(`ALTER TABLE \`classe_course\` DROP FOREIGN KEY \`FK_793fdb12be0c0d6f4ae0ac22791\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_a000cca60bcf04454e72769949\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`DROP INDEX \`IDX_86e4db37f2d9383c7f8cdc64c4\` ON \`classe_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_793fdb12be0c0d6f4ae0ac2279\` ON \`classe_course\``);
        await queryRunner.query(`DROP TABLE \`classe_course\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\` (\`phone\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
