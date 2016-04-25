'use strict';

exports.up = function(knex) {
  return knex.schema.table('services', function(table) {
    table
      .boolean('slo')
      .notNullable()
      .defaultTo(false)
      .comment('enable or disable single logout support for service');

    table
      .integer('slo_type')
      .notNullable()
      .defaultTo(0)
      .comment('0 = backchannel/server side, 1 = client 302');

    return table
      .string('slo_url')
      .nullable()
      .comment('URL to use for SLO. Overrides ST validation URL capture');
  });
};

exports.down = function(knex) {
  return knex.schema.table('services', function(table) {
    return table.dropColumns('slo', 'slo_type', 'slo_url');
  });
};
