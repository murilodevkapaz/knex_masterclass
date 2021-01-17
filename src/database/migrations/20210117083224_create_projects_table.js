
exports.up = knex => knex.schema.createTable('projects', table => {
    table.increments('id')
    table.text('title')

    //relationship - relacionamentos  da tabela um usuário com n projetos
    table.integer('user_id')
        .references('users.id')
        .notNullable()
        .onDelete('CASCADE')//quando um usuário for deletado os projetos também serão

    table.timestamps(true, true)
})


exports.down = knex => knex.schema.dropTable('projects');
