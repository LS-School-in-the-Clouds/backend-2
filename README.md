# School In The Clouds

## Welcome to the back-end of 'School In The Clouds', to find endpoints please use the model below.

## Back-End url https://github.com/LS-School-in-the-Clouds/backend-2

## Tables
(all tables below have value 'id' which is an integer incrementally generated by the server)

### users

| data       | type                  | required |
| ---------- | --------------------- | -------- |
| username   | string                | yes      |
| password   | string                | yes      |
| email      | string                | yes      |
| role       | integer               | no       |

* roles are 1 (admin), 2 (mentor), 3 (student) is default

### admins

| data            | type                  | required |
| --------------- | --------------------- | -------- |
| school_district | string                | no       |
| school_name     | string                | no       |
| state           | string                | no       |
| country         | string                | no       |
| img_url         | string                | no       |
| user_id *       | integer               | no       |

* refers to users table

### mentors

| data            | type                  | required |
| --------------- | --------------------- | -------- |
| first_name      | string                | yes      |
| last_name       | string                | yes      |
| interests       | string                | no       |
| state           | string                | no       |
| country         | string                | no       |
| career          | string                | no       |
| preferred_times | string                | no       |
| timezone **     | integer (1-4)         | no       |
| img_url         | integer               | no       |
| user_id *       | integer               | no       |

* refers to users table
** can be 1 (pacific), 2 (mountain), 3 (central), 4 (eastern)

### students

| data            | type                  | required |
| --------------- | --------------------- | -------- |
| first_name      | string                | yes      |
| last_name       | string                | yes      |
| interests       | string                | no       |
| state           | string                | no       |
| country         | string                | no       |
| career_goals    | string                | no       |
| preferred_times | string                | no       |
| timezone **     | integer (1-4)         | no       |
| img_url         | integer               | no       |
| user_id *       | integer               | no       |

* refers to users table
** can be 1 (pacific), 2 (mountain), 3 (central), 4 (eastern)

### tasks

| data            | type                  | required |
| --------------- | --------------------- | -------- |
| description     | string                | yes      |
| type            | string                | no       |
| date            | string                | no       |
| completed **    | boolean               | no       |
| assigned_by *   | integer               | yes      |
| assigned_to *   | integer               | yes      |

* refers to users table (by id)
** defaults to false

### steps 

| data            | type                 | required |
| --------------- | -------------------- | -------- |
| description     | string               | yes      |
| step_num        | integer              | yes      |
| task_id *       | integer              | no       |

* refers to tasks table

### mentor_to_student

| data          | type               | required |
| --------------| ------------------ | -------- |
| mentor_id *   | integer            | yes      |
| student_id *  | integer            | yes      |

* refers to users table.
mentor_id must refer to a user with role 2
student_id must refer to a user with role 1

### admin_to_mentor

| data          | type               | required |
| --------------| ------------------ | -------- |
| admin_id *    | integer            | yes      |
| mentor_id *   | integer            | yes      |

* refers to users table.
mentor_id must refer to a user with role 2
student_id must refer to a user with role 1

## Endpoints (all are prefixed with '/api')

### auth routes (see users table)

| Method | Endpoint           | Token Required | Description                   |
| ------ | ------------------ | -------------- | ----------------------------- |
| POST   | `/auth/register`   | no             | See user table requirements   |
| POST   | `/auth/login`      | no             | username & password           |

### admins routes

| Method | Endpoint          | Token Required | Description                  |
| ------ | ------------------| -------------- | -----------------------------|
| GET    | `/admins`         | yes            | returns all admins *         |
| GET    | `/admins/:id`     | yes            | returns admin by user id     |
| POST   | `/admins/`        | yes            | adds admin to database       |
| PUT    | `/admins/:id`     | yes            | replaces admin by id         |

* client must have role of admin

### mentors routes

| Method | Endpoint           | Token Required | Description                   |
| ------ | ------------------ | -------------- | ----------------------------- |
| GET    | `/mentors`         | yes            | returns all mentors           |
| GET    | `/mentors/:id`     | yes            | returns mentor by user id     |
| POST   | `/mentors/`        | yes            | adds mentor to database       |
| PUT    | `/mentors/:id`     | yes            | replaces mentor by id         |


### students routes

| Method | Endpoint           | Token Required | Description                   |
| ------ | ------------------ | -------------- | ----------------------------- |
| GET    | `/students`        | yes            | returns all students          |
| GET    | `/students/:id`    | yes            | returns student by user id    |
| POST   | `/students/`       | yes            | adds student to database      |
| PUT    | `/students/:id`    | yes            | replaces student by id        |

* client must have role of admin to return all students

### tasks routes

| Method | Endpoint           | Token Required | Description                           |
| ------ | ------------------ | -------------- | ------------------------------------- |
| GET    | `/tasks`           | yes            | returns all tasks                     |
| GET    | `/tasks/:id`       | yes            | returns task by task id               |
| POST   | `/tasks/`          | yes            | adds task to database                 |
| PUT    | `/tasks/:id`       | yes            | replaces task by task id              |
| DELETE | `/tasks/:id`       | yes            | removes task from database by task id |

### mentor-student routes

| Method | Endpoint                       | Token Required | Description                                               |
| ------ | ------------------------------ | -------------- | --------------------------------------------------------- |
| GET    | `/mentor-student/:id/students` | yes            | returns all students by mentor id                         |
| GET    | `/mentor-student/:id/mentors`  | yes            | returns mentor by student id                              |
| POST   | `/mentor-student`              | yes            | adds new mentor_to_student dataset                        |
| DELETE | `/mentor-student`              | yes            | removes mentor_to_student pair in dataset by mentor_to_student pair id |

### admin-mentor routes

| Method | Endpoint                     | Token Required | Description                                             |
| ------ | -----------------------------| -------------- | ------------------------------------------------------- |
| GET    | `/admin-mentor/:id/mentors`  | yes            | returns all mentors by admin id                         |
| GET    | `/admin-mentor/:id/admins`   | yes            | returns admin by mentor id                              |
| POST   | `/admin-mentor`              | yes            | adds new admin_to_mentor dataset                        |
| DELETE | `/admin-mentor`              | yes            | removes admin_to_mentor pair in dataset by admin_to_mentor pair id   |
