import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTable1676295280557 implements MigrationInterface {
    name = 'migrationTable1676295280557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uid\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`question\` tinytext NOT NULL, \`response\` longtext NOT NULL, \`chatId\` int NULL, INDEX \`IDX_a6a720d4dfa56cfa3f4d5db85b\` (\`uid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP COLUMN \`question\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP COLUMN \`response\``);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD \`title\` tinytext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_36bc604c820bb9adc4c75cd4115\` FOREIGN KEY (\`chatId\`) REFERENCES \`chats\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_36bc604c820bb9adc4c75cd4115\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_a000cca60bcf04454e72769949\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`chats\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD \`response\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chats\` ADD \`question\` tinytext NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_a6a720d4dfa56cfa3f4d5db85b\` ON \`messages\``);
        await queryRunner.query(`DROP TABLE \`messages\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\` (\`phone\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
