/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_consent_phone_numbers', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
        table.string('phone_number').notNullable();
        table.string('country_code').notNullable(); //store without plus sign
        table.boolean('consent').defaultTo(false).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.uuid('user_id').references('id').inTable('users');
    })
    .createTable('user_consent_emails', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
        table.string('email').notNullable();
        table.boolean('consent').defaultTo(false).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.uuid('user_id').references('id').inTable('users');
    })
    .createTable('schedules', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
        table.date('schedule_date').notNullable();
        table.string("schedule_time").notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.uuid('user_consent_email_id').references('id').inTable('user_consent_emails');
        table.uuid('user_consent_phone_number_id').references('id').inTable('user_consent_phone_numbers');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable('user_consent_emails')
        .dropTable('user_consent_phone_numbers')
        .dropTable('schedules')
};
