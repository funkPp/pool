-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username text COLLATE pg_catalog."default",
    firstname text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    role text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

ALTER SEQUENCE public.users_id_seq
    OWNED BY public.users.id;

ALTER SEQUENCE public.users_id_seq
    OWNER TO postgres;


-- Table: public.students

-- DROP TABLE IF EXISTS public.students;

CREATE SEQUENCE IF NOT EXISTS public.students_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;


CREATE TABLE IF NOT EXISTS public.students
(
    id integer NOT NULL DEFAULT nextval('students_id_seq'::regclass),
    parent_id integer,
    firstname text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    birthday timestamp without time zone NOT NULL,
    gender text COLLATE pg_catalog."default",
    CONSTRAINT students_pkey PRIMARY KEY (id)
)


TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.students
    OWNER to postgres;

ALTER SEQUENCE public.students_id_seq
    OWNED BY public.students.id;

ALTER SEQUENCE public.students_id_seq
    OWNER TO postgres;




-- Table: public.groups

-- DROP TABLE IF EXISTS public.groups;

CREATE SEQUENCE IF NOT EXISTS public.groups_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;


CREATE TABLE IF NOT EXISTS public.groups
(
    id integer NOT NULL DEFAULT nextval('groups_id_seq'::regclass),
    resources_id integer,
    name text COLLATE pg_catalog."default"
    CONSTRAINT groups_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.groups
    OWNER to postgres;


ALTER SEQUENCE public.groups_id_seq
    OWNED BY public.groups.id;

ALTER SEQUENCE public.groups_id_seq
    OWNER TO postgres;



    -- Table: public.resources

-- DROP TABLE IF EXISTS public.resources;
CREATE SEQUENCE IF NOT EXISTS public.resources_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;


CREATE TABLE IF NOT EXISTS public.resources
(
    id integer NOT NULL DEFAULT nextval('resources_id_seq'::regclass),
    title text COLLATE pg_catalog."default"
    CONSTRAINT resources_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.resources
    OWNER to postgres;

ALTER SEQUENCE public.resources_id_seq
    OWNED BY public.resources.id;

ALTER SEQUENCE public.resources_id_seq
    OWNER TO postgres;