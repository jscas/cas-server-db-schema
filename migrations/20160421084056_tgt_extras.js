'use strict';

exports.up = function(knex) {
  return knex.schema.table('ticket_granting_tickets', table =>
    table
      .json('extra', true)
      .comment('used for extra data like which services have been logged in to')
  );
};

exports.down = function(knex) {
  return knex.schema
    .table('ticket_granting_tickets', table => table.dropColumn('extra'));
};
