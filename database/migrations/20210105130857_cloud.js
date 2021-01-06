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
      tbl.string("school_district", 128);
      tbl.string("school_name", 128);
      tbl.string("state", 128);
      tbl.string("country", 128);
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("mentors", (tbl) => {
      tbl.increments();
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl.string("interests");
      tbl.string("career");
      tbl.string("state", 128);
      tbl.string("country", 128);
      tbl.string("preferred_times");
      tbl
        .integer("user_id")
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
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl.string("interests");
      tbl.string("career_goals");
      tbl.string("state", 128);
      tbl.string("country", 128);
      tbl.string("preferred_times");
      tbl
        .integer("user_id")
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
    .createTable("tasks", (tbl) => {
      tbl.increments();
      tbl.string("description").notNullable();
      tbl.string("type");
      tbl.string("date");
      tbl.boolean("completed").defaultTo("false");
      tbl
        .integer("assinged_by")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("assinged_to")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("steps", (tbl) => {
      tbl.increments();
      tbl.integer("step_num").unsigned();
      tbl
        .integer("task_id")
        .unsigned()
        .references("id")
        .inTable("tasks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("mentor_to_student", (tbl) => {
      tbl.increments();
      tbl
        .integer("mentor")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("student")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("admin_to_mentor", (tbl) => {
      tbl.increments();
      tbl
        .integer("mentor")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("student")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("admin_to_mentor")
    .dropTableIfExists("mentor_to_student")
    .dropTableIfExists("steps")
    .dropTableIfExists("tasks")
    .dropTableIfExists("students")
    .dropTableIfExists("mentors")
    .dropTableIfExists("admins")
    .dropTableIfExists("users")
    .dropTableIfExists("timezones")
    .dropTableIfExists("roles");
};
