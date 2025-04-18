PGDMP                      }            dbpoolv1    17.2    17.2 "               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16387    dbpoolv1    DATABASE     |   CREATE DATABASE dbpoolv1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE dbpoolv1;
                     postgres    false                       0    0    DATABASE dbpoolv1    COMMENT     =   COMMENT ON DATABASE dbpoolv1 IS 'первая версия';
                        postgres    false    4884            X           1247    16421    roles    TYPE     K   CREATE TYPE public.roles AS ENUM (
    'user',
    'admin',
    'owner'
);
    DROP TYPE public.roles;
       public               postgres    false            �            1259    16440    groups    TABLE     a   CREATE TABLE public.groups (
    id integer NOT NULL,
    resources_id integer,
    name text
);
    DROP TABLE public.groups;
       public         heap r       postgres    false            �            1259    16439    groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.groups_id_seq;
       public               postgres    false    222                       0    0    groups_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;
          public               postgres    false    221            �            1259    16447 	   resources    TABLE     K   CREATE TABLE public.resources (
    id integer NOT NULL,
    title text
);
    DROP TABLE public.resources;
       public         heap r       postgres    false            �            1259    16446    resources_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.resources_id_seq;
       public               postgres    false    224                       0    0    resources_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;
          public               postgres    false    223            �            1259    16431    students    TABLE     �   CREATE TABLE public.students (
    id integer NOT NULL,
    parent_id integer,
    firstname text,
    lastname text,
    birthday date NOT NULL,
    gender text
);
    DROP TABLE public.students;
       public         heap r       postgres    false            �            1259    16430    students_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 &   DROP SEQUENCE public.students_id_seq;
       public               postgres    false    220                       0    0    students_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;
          public               postgres    false    219            �            1259    16388    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    firstname text,
    lastname text,
    password text,
    role text DEFAULT 'user'::text
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16395    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    217                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    218            l           2604    16443 	   groups id    DEFAULT     f   ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);
 8   ALTER TABLE public.groups ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            m           2604    16450    resources id    DEFAULT     l   ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);
 ;   ALTER TABLE public.resources ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    224    224            k           2604    16434    students id    DEFAULT     j   ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);
 :   ALTER TABLE public.students ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            i           2604    16396    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217                      0    16440    groups 
   TABLE DATA           8   COPY public.groups (id, resources_id, name) FROM stdin;
    public               postgres    false    222   ]"                 0    16447 	   resources 
   TABLE DATA           .   COPY public.resources (id, title) FROM stdin;
    public               postgres    false    224   �"       
          0    16431    students 
   TABLE DATA           X   COPY public.students (id, parent_id, firstname, lastname, birthday, gender) FROM stdin;
    public               postgres    false    220   �"                 0    16388    users 
   TABLE DATA           R   COPY public.users (id, username, firstname, lastname, password, role) FROM stdin;
    public               postgres    false    217   6#                  0    0    groups_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.groups_id_seq', 3, true);
          public               postgres    false    221                       0    0    resources_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.resources_id_seq', 1, false);
          public               postgres    false    223                       0    0    students_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.students_id_seq', 3, true);
          public               postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 33, true);
          public               postgres    false    218            s           2606    16454    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public                 postgres    false    222            u           2606    16456    resources resources_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.resources DROP CONSTRAINT resources_pkey;
       public                 postgres    false    224            q           2606    16438    students students_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public                 postgres    false    220            o           2606    16403    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    217               .   x�3�4�0�b�����p�!����1����B1p��qqq X��            x������ � �      
   n   x�3�46⼰����x�}vr^Xwa�����M�F��&��i���9�\F�z�0�5�Xr�us�r����O���;�AJLu��3Ə+F��� FC�           x�U��N�@�����p��R�ʢDl��@��P�qlW�ڍ�cll��~�Hjc��srߗ�*��k��V�ݮ����Y
�H�T.��d0��R�1Ǻ2�BY�|��:i�@���j�ST^���9a?lq_.sBx�W��5|��ϯ��H�r�WlL�Ѡ�Y�܉�i>+���e88���Jq� �`�oUU(8�<y�wxn�6W�����7�6wF�c�S�d�u�OI��n����a�ӣ�������B�q��H�oZ�     