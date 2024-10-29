-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)
