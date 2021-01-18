const {onUpdatedTrigger}  = require('../../../knexfile');

exports.up = async knex => knex.schema.createTable('projects', table => {
    table.increments('id')
    table.text('title')

    //relationship - relacionamentos  da tabela um usuário com n projetos
    table.integer('user_id')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')//quando um usuário for deletado os projetos também serão

    table.timestamps(true, true)
}).then(()=> knex.raw(onUpdatedTrigger('projects')))


exports.down = async knex => knex.schema.dropTable('projects');
