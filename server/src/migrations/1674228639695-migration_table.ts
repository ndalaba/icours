import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTable1674228639695 implements MigrationInterface {
    name = 'migrationTable1674228639695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`subjects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`subject\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`description\` text NULL, INDEX \`IDX_880061503ffd2ab3162a225da0\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`tag\` varchar(255) NULL, \`content\` text NOT NULL, \`image\` varchar(255) NULL, \`published\` bit NOT NULL DEFAULT 0, \`views\` int NOT NULL DEFAULT '0', \`subjectId\` int NULL, INDEX \`IDX_f444d60e410ad88079dc5d3024\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chapters\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`tag\` varchar(255) NULL, \`content\` text NOT NULL, \`image\` varchar(255) NULL, \`published\` bit NOT NULL DEFAULT 0, \`views\` int NOT NULL DEFAULT '0', \`courseId\` int NULL, INDEX \`IDX_60104a199b8a8010293542dc34\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_4fc71ca03df7fa563050d553c39\` FOREIGN KEY (\`subjectId\`) REFERENCES \`subjects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chapters\` ADD CONSTRAINT \`FK_becd2c25ed5b601e7a4466271c8\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chapters\` DROP FOREIGN KEY \`FK_becd2c25ed5b601e7a4466271c8\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_4fc71ca03df7fa563050d553c39\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_a000cca60bcf04454e72769949\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`DROP INDEX \`IDX_60104a199b8a8010293542dc34\` ON \`chapters\``);
        await queryRunner.query(`DROP TABLE \`chapters\``);
        await queryRunner.query(`DROP INDEX \`IDX_f444d60e410ad88079dc5d3024\` ON \`courses\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP INDEX \`IDX_880061503ffd2ab3162a225da0\` ON \`subjects\``);
        await queryRunner.query(`DROP TABLE \`subjects\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\` (\`phone\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
