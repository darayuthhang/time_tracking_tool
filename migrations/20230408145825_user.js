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
        table.timestamp('update_at').defaultTo(knex.fn.now());
     })
    .createTable('tasks', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('(gen_random_uuid())'));
        table.string('task_name'),
        table.string('task_description'),
        table.date("task_date"),
        table.enu('task_status', ['done', 'progress']).notNullable(),
        table.uuid('project_id').references('id').inTable('projects'),
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    })
    
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('tasks')
        .dropTable('projects')
        .dropTable('tokens')
        .dropTable('users');
;
};
