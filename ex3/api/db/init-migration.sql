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

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname, created_date, is_admin)
VALUES
(
    1,
    'admin@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'Larok',
    '2022-12-22 09:01:01.720',    
    TRUE
  );

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