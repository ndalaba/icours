import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTable1675334822096 implements MigrationInterface {
    name = 'migrationTable1675334822096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`chapters\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP COLUMN \`published\``);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD \`published\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`chapters\` DROP COLUMN \`published\``);
        await queryRunner.query(`ALTER TABLE \`chapters\` ADD \`published\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chapters\` DROP COLUMN \`published\``);
        await queryRunner.query(`ALTER TABLE \`chapters\` ADD \`published\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP COLUMN \`published\``);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD \`published\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_a000cca60bcf04454e72769949\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`chapters\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\` (\`phone\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
