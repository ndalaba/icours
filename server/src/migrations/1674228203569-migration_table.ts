import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTable1674228203569 implements MigrationInterface {
    name = 'migrationTable1674228203569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`first_name\` varchar(150) NOT NULL, \`last_name\` varchar(150) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(50) NOT NULL, \`role\` smallint NOT NULL, \`gender\` tinyint NULL, \`birth_day\` datetime NULL, \`address\` text NULL, \`active\` tinyint NOT NULL, \`last_login\` datetime NULL, \`password\` varchar(100) NOT NULL, \`photo\` varchar(150) NULL, INDEX \`IDX_6e20ce1edf0678a09f1963f958\` (\`uid\`),UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tokens\` ADD CONSTRAINT \`FK_8769073e38c365f315426554ca5\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tokens\` DROP FOREIGN KEY \`FK_8769073e38c365f315426554ca5\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_6e20ce1edf0678a09f1963f958\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
