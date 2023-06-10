const { v4: uuidv4 } = require('uuid');
/**
 * 
 * @param {*} knex defaultTo(knex.fn.now()) it only auto update when insert, not update.
 * @returns 
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('last_name');
        table.string('first_name');
        table.string('email').notNullable();
        table.string('password');
        table.string('google_id').unique();
        table.string('auth_method').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('validated').notNullable().defaultTo(false);
    })
     .createTable('tokens', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
        table.string('verfication_code'),
        table.bigInteger('expired_in'),
        table.uuid('user_id').references('id').inTable('users'),
        table.timestamp('created_at').defaultTo(knex.fn.now());
     })
     .createTable('projects', function(table){
        table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
        table.string('project_name').notNullable(),
        table.string('project_description'),
        table.uuid('user_id').references('id').inTable('users'),
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
     })
    .createTable('tasks', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
        table.string('task_name'),
        table.string('task_description'),
        table.date("task_date"),
        table.enu('task_status', ['Done', 'Progress']).notNullable(),
        table.uuid('project_id').references('id').inTable('projects'),
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('user_consent_phone_numbers', function (table) {
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
    /**
     * user_consent_phone_numbers
     *  (
     *    phone_number,
     *    consent,
     *    updated_at,
     *    created_at,
     * 
     * )
     * user_consent_emails
     * (
     *    email,
     *    consent,
     *    updated_at,
     *    created_at,
     * 
     * )
     * user_consents 
     * (
     *   id,
     *   user_consent_phone_number_id
     *   user_consent_email_id
     *   updated_at,
     *   created_at
     * )
     */
    
    
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('tasks')
        .dropTable('projects')
        .dropTable('tokens')
        .dropTable('users');
;
};
