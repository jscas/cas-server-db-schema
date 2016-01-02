'use strict';

const tstamps = require('../lib/tstamps');

exports.up = function(knex) {
  return knex.schema
    .createTable('login_tickets', function(table) {
      table.increments();
      table.string('tid').unique().notNullable().comment('the LT- identifier');
      table.dateTime('created').notNullable();
      table.dateTime('expires').notNullable();
      table.boolean('valid').notNullable().defaultTo(true);

      tstamps(table);
      return table.comment('tracks login tickets');
    })
    .createTable('ticket_granting_tickets', function(table) {
      table.increments();
      table.integer('lt_id').references('id').inTable('login_tickets');
      table.string('tid').unique().notNullable().comment('the TGT- identifier');
      table.dateTime('created').notNullable();
      table.dateTime('expires').notNullable();
      table.string('user_id').notNullable();
      table.boolean('valid').notNullable().defaultTo(true);

      tstamps(table);
      return table.comment('tracks ticket granting ticket tickets');
    })
    .createTable('service_tickets', function(table) {
      table.increments();
      table.integer('tgt_id')
        .references('id').inTable('ticket_granting_tickets');
      table.string('tid').unique().notNullable().comment('the ST- identifier');
      table.dateTime('created').notNullable();
      table.dateTime('expires').notNullable();
      table.boolean('valid').notNullable().defaultTo(true);
      table.string('service_id')
        .index()
        .comment('a id the server can use to crossref in the service registry');

      tstamps(table);
      return table.comment('tracks service tickets');
    })
    .createTable('services', function(table) {
      // we didn't do a proper join in 'service_tickets' because the service
      // registry _could_ be provided by a different plugin
      // it's up to the server to deal with the relationship between
      // service and service tickets (for SLO)
      table.increments();
      table.string('name').unique().notNullable();
      table.string('url').notNullable();
      table.string('comment');
      table.json('extra', true).comment('meta data');

      tstamps(table);
      return table.comment('tracks services that are allowed');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('services')
    .dropTable('service_tickets')
    .dropTable('ticket_granting_tickets')
    .dropTable('login_tickets');
};
