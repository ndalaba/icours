import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTable1675271267542 implements MigrationInterface {
    name = 'migrationTable1675271267542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`classes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` text NULL, INDEX \`IDX_5d90fb64c917e4a387987ed4cb\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`chapters\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chapters\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_a000cca60bcf04454e72769949\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`DROP INDEX \`IDX_5d90fb64c917e4a387987ed4cb\` ON \`classes\``);
        await queryRunner.query(`DROP TABLE \`classes\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\` (\`phone\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
