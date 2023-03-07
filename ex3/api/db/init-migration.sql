CREATE EXTENSION pgcrypto;

CREATE TABLE public."user" (
  id serial4 NOT NULL,
  email varchar(30) NOT NULL,
  password_hash varchar(255) NOT NULL,
  firstname varchar(255) NULL,
  lastname varchar(255) NULL,
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  is_admin bool NOT NULL DEFAULT false,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE role vocabulary_admin;

GRANT pg_read_all_data TO vocabulary_admin;

GRANT ALL ON ALL TABLES IN SCHEMA public TO vocabulary_admin;

INSERT INTO public."user" (id, email, password_hash, firstname, lastname, created_date, is_admin)
VALUES
(1, 'admin@saritasa.com', crypt('123', gen_salt('md5')), 'Stephan', 'Larok', '2022-12-22 09:01:01.720', TRUE),
(2, 'user1@example.com', crypt('234', gen_salt('md5')), 'John', 'Doe', '2023-03-06 10:00:00', FALSE),
(3, 'user2@example.com', crypt('345', gen_salt('md5')), 'Jane', 'Doe', '2023-03-06 11:00:00', FALSE),
(4, 'user3@example.com', crypt('456', gen_salt('md5')), 'Bob', 'Smith', '2023-03-06 12:00:00', FALSE),
(5, 'user4@example.com', crypt('567', gen_salt('md5')), 'Alice', 'Johnson', '2023-03-06 13:00:00', FALSE),
(6, 'user5@example.com', crypt('678', gen_salt('md5')), 'David', 'Brown', '2023-03-06 14:00:00', FALSE),
(7, 'user6@example.com', crypt('789', gen_salt('md5')), 'Emily', 'Davis', '2023-03-06 15:00:00', FALSE),
(8, 'user7@example.com', crypt('890', gen_salt('md5')), 'Michael', 'Jones', '2023-03-06 16:00:00', FALSE),
(9, 'user8@example.com', crypt('901', gen_salt('md5')), 'Sarah', 'Wilson', '2023-03-06 17:00:00', FALSE),
(10, 'user9@example.com', crypt('012', gen_salt('md5')), 'Thomas', 'Clark', '2023-03-06 18:00:00', FALSE);

CREATE TYPE public.jwt_token AS (
  role text,
  exp integer,
  user_id integer,
  is_admin boolean,
  email varchar
);

CREATE FUNCTION public.authenticate(
  email text, 
  password text
) RETURNS public.jwt_token AS $$ 
DECLARE
  account public.user;
BEGIN
  SELECT
    u.* INTO account
  FROM
    public.user AS u
  WHERE
    u.email = authenticate.email;

  IF account.password_hash = crypt(password, account.password_hash) THEN 
    RETURN (
      'vocabulary_admin',
      extract(
        epoch
        FROM NOW() + interval '30 days'
      ),
      account.id,
      account.is_admin,
      account.email
    )::public.jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;

$$ language plpgsql strict SECURITY DEFINER;

CREATE FUNCTION current_user_id() RETURNS integer AS $$
SELECT
  nullif(current_setting('jwt.claims.user_id', TRUE), '')::integer;

$$ language SQL stable;

CREATE FUNCTION public.user_profile() RETURNS "user" AS $$
SELECT
  *
FROM
  public.user
WHERE
  id = current_user_id();

$$ language SQL stable;

CREATE TABLE public."group" (
  id serial4 NOT NULL,
  name varchar(255) NOT NULL,
  CONSTRAINT group_pkey PRIMARY KEY (id)
);

INSERT INTO public."group" (id, name)
VALUES 
  (1, 'Group 1'),
  (2, 'Group 2'),
  (3, 'Group 3');


CREATE TABLE public.task (
  id serial4 NOT NULL,
  name varchar(255) NOT NULL,
  CONSTRAINT task_pkey PRIMARY KEY (id)
);

INSERT INTO public.task (id, name) VALUES
  (1, 'Vocabulary Lesson 1'),
  (2, 'Vocabulary Lesson 2'),
  (3, 'Vocabulary Lesson 3'),
  (4, 'Vocabulary Lesson 4'),
  (5, 'Vocabulary Lesson 5'),
  (6, 'Vocabulary Lesson 6'),
  (7, 'Vocabulary Lesson 7'),
  (8, 'Vocabulary Lesson 8'),
  (9, 'Vocabulary Lesson 9'),
  (10, 'Vocabulary Lesson 10');

CREATE TABLE public.group_task (
  group_id integer NOT NULL,
  task_id integer NOT NULL,
  CONSTRAINT group_task_pkey PRIMARY KEY (group_id, task_id),
  CONSTRAINT group_task_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.group (id) ON DELETE CASCADE,
  CONSTRAINT group_task_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task (id) ON DELETE CASCADE
);

INSERT INTO public.group_task (group_id, task_id)
VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 7);

CREATE TABLE public.group_user (
  group_id integer NOT NULL,
  user_id integer NOT NULL,
  CONSTRAINT group_user_pkey PRIMARY KEY (group_id, user_id),
  CONSTRAINT group_user_group_id_fkey FOREIGN KEY (group_id) REFERENCES public."group" (id) ON DELETE CASCADE,
  CONSTRAINT group_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user" (id) ON DELETE CASCADE
);

INSERT INTO public.group_user (group_id, user_id)
VALUES 
  (1, 1),
  (1, 2),
  (1, 3),
  (2, 4),
  (2, 5),
  (2, 6),
  (3, 7);
  
CREATE FUNCTION public.get_tasks_by_group_id(group_id integer) RETURNS SETOF public.task AS $$
  SELECT task.*
  FROM public.task task
  INNER JOIN public.group_task group_task ON task.id = group_task.task_id
  WHERE group_task.group_id = get_tasks_by_group_id.group_id;
$$ LANGUAGE SQL STABLE;

CREATE TYPE public.updatedTask AS (
  group_id integer,
  task_id integer
);

GRANT ALL ON public.group_task TO vocabulary_admin;

CREATE FUNCTION public.add_remove_task_from_group(
  input_task_id INTEGER,
  input_group_id INTEGER,
  is_add BOOLEAN
) RETURNS public.updatedTask AS $$
DECLARE
  result public.updatedTask;
BEGIN
  IF is_add THEN
    INSERT INTO public.group_task (group_id, task_id) 
    VALUES (input_group_id, input_task_id);
    result.group_id := input_group_id;
    result.task_id := input_task_id;
  ELSE
    DELETE FROM public.group_task 
    WHERE group_task.group_id = input_group_id AND group_task.task_id = input_task_id;
    result.group_id := input_group_id;
    result.task_id := input_task_id;
  END IF;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE public.vocabulary (
  id SERIAL4 PRIMARY KEY,
  english VARCHAR(255) NOT NULL,
  vietnamese VARCHAR(255) NOT NULL,
  russian VARCHAR(255) NOT NULL
);

INSERT INTO public.vocabulary (id, english, vietnamese, russian)
VALUES
  (1, 'apple', 'quả táo', 'яблоко'),
  (2, 'banana', 'quả chuối', 'банан'),
  (3, 'orange', 'quả cam', 'апельсин'),
  (4, 'grape', 'quả nho', 'виноград'),
  (5, 'watermelon', 'dưa hấu', 'арбуз'),
  (6, 'pineapple', 'thơm', 'ананас'),
  (7, 'mango', 'xoài', 'манго'),
  (8, 'peach', 'đào', 'персик'),
  (9, 'pear', 'lê', 'груша'),
  (10, 'strawberry', 'dâu tây', 'клубника');

CREATE TABLE public.task_vocabulary (
  task_id INTEGER NOT NULL,
  vocabulary_id INTEGER NOT NULL,
  CONSTRAINT task_vocabulary_pkey PRIMARY KEY (task_id, vocabulary_id),
  CONSTRAINT task_vocabulary_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task (id) ON DELETE CASCADE,
  CONSTRAINT task_vocabulary_vocabulary_id_fkey FOREIGN KEY (vocabulary_id) REFERENCES public.vocabulary (id) ON DELETE CASCADE
);

INSERT INTO public.task_vocabulary (task_id, vocabulary_id)
VALUES 
  (1, 1), (1, 6),
  (2, 2), (2, 9),
  (3, 3), (3, 5),
  (4, 4), (4, 7),
  (5, 5), (5, 8),
  (6, 6), (6, 10),
  (7, 7), (7, 1),
  (8, 8), (8, 2),
  (9, 9), (9, 3),
  (10, 10), (10, 4);