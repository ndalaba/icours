import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationTable1675272260594 implements MigrationInterface {
    name = 'migrationTable1675272260594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`subject\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`)`);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`chapters\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chapters\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`published\` \`published\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_a000cca60bcf04454e72769949\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` CHANGE \`name\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\` (\`phone\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
