'use strict';

const updatedComment = 'Should be set every UPDATE (for migrations)';
const createdComment = 'Should be set only on INSERT (for migrations)';

module.exports = function tstamps(table) {
  table.timestamp('created_at').notNullable().comment(createdComment);
  return table.timestamp('updated_at').notNullable().comment(updatedComment);
};
