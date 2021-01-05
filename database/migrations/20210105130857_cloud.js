exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable().unique();
    })
    .createTable("timezones", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable().unique();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 128).notNullable().unique();
      tbl
        .integer("role")
        .unsigned()
        .references("id")
        .inTable("roles")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
        .defaultTo(3);
    })
    .createTable("admins", (tbl) => {
      tbl.increments();
      tbl.string("school-district", 128);
      tbl.string("school-name", 128);
      tbl.string("state", 128);
      tbl.string("country", 128);
      tbl
        .integer("user-id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("mentors", (tbl) => {
      tbl.increments();
      tbl.string("first-name", 128).notNullable();
      tbl.string("last-name", 128).notNullable();
      tbl.string("interests");
      tbl.string("career");
      tbl.string("state", 128);
      tbl.string("country", 128);
      tbl.string("preferred-times");
      tbl
        .integer("user-id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("timezone")
        .unsigned()
        .references("id")
        .inTable("timezones")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
    .createTable("students", (tbl) => {
      tbl.increments();
      tbl.string("first-name", 128).notNullable();
      tbl.string("last-name", 128).notNullable();
      tbl.string("interests");
      tbl.string("career-goals");
      tbl.string("state", 128);
      tbl.string("country", 128);
      tbl.string("preferred-times");
      tbl
        .integer("user-id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("timezone")
        .unsigned()
        .references("id")
        .inTable("timezones")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("students")
    .dropTableIfExists("mentors")
    .dropTableIfExists("admins")
    .dropTableIfExists("users")
    .dropTableIfExists("timezones")
    .dropTableIfExists("roles")
};
