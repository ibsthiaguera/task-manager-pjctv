PGDMP                  	    |            task-manager-projectiva    16.2    16.2 )               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    31447    task-manager-projectiva    DATABASE     �   CREATE DATABASE "task-manager-projectiva" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
 )   DROP DATABASE "task-manager-projectiva";
                postgres    false                        2615    31580    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5                       0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    31581    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    31620 
   attachment    TABLE     �   CREATE TABLE public.attachment (
    id integer NOT NULL,
    description text NOT NULL,
    task_id integer NOT NULL,
    file_name text NOT NULL,
    original_name text NOT NULL
);
    DROP TABLE public.attachment;
       public         heap    postgres    false    5            �            1259    31619    attachment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attachment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.attachment_id_seq;
       public          postgres    false    223    5                       0    0    attachment_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.attachment_id_seq OWNED BY public.attachment.id;
          public          postgres    false    222            �            1259    31593    squad    TABLE     O   CREATE TABLE public.squad (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.squad;
       public         heap    postgres    false    5            �            1259    31592    squad_id_seq    SEQUENCE     �   CREATE SEQUENCE public.squad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.squad_id_seq;
       public          postgres    false    217    5                       0    0    squad_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.squad_id_seq OWNED BY public.squad.id;
          public          postgres    false    216            �            1259    31611    task    TABLE     �   CREATE TABLE public.task (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    limit_date timestamp(3) without time zone NOT NULL,
    status text NOT NULL,
    user_id integer
);
    DROP TABLE public.task;
       public         heap    postgres    false    5            �            1259    31610    task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.task_id_seq;
       public          postgres    false    221    5                       0    0    task_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;
          public          postgres    false    220            �            1259    31602    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text NOT NULL,
    squad_id integer
);
    DROP TABLE public."user";
       public         heap    postgres    false    5            �            1259    31601    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    5    219                       0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    218            h           2604    31623    attachment id    DEFAULT     n   ALTER TABLE ONLY public.attachment ALTER COLUMN id SET DEFAULT nextval('public.attachment_id_seq'::regclass);
 <   ALTER TABLE public.attachment ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            e           2604    31596    squad id    DEFAULT     d   ALTER TABLE ONLY public.squad ALTER COLUMN id SET DEFAULT nextval('public.squad_id_seq'::regclass);
 7   ALTER TABLE public.squad ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            g           2604    31614    task id    DEFAULT     b   ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);
 6   ALTER TABLE public.task ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            f           2604    31605    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219                      0    31581    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �,                 0    31620 
   attachment 
   TABLE DATA           X   COPY public.attachment (id, description, task_id, file_name, original_name) FROM stdin;
    public          postgres    false    223   .                 0    31593    squad 
   TABLE DATA           )   COPY public.squad (id, name) FROM stdin;
    public          postgres    false    217   �.                 0    31611    task 
   TABLE DATA           S   COPY public.task (id, title, description, limit_date, status, user_id) FROM stdin;
    public          postgres    false    221   �.       	          0    31602    user 
   TABLE DATA           K   COPY public."user" (id, name, email, password, role, squad_id) FROM stdin;
    public          postgres    false    219   A1                  0    0    attachment_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.attachment_id_seq', 8, true);
          public          postgres    false    222                       0    0    squad_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.squad_id_seq', 3, true);
          public          postgres    false    216                       0    0    task_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.task_id_seq', 75, true);
          public          postgres    false    220                       0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 17, true);
          public          postgres    false    218            j           2606    31589 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            r           2606    31627    attachment attachment_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attachment DROP CONSTRAINT attachment_pkey;
       public            postgres    false    223            l           2606    31600    squad squad_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.squad
    ADD CONSTRAINT squad_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.squad DROP CONSTRAINT squad_pkey;
       public            postgres    false    217            p           2606    31618    task task_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.task DROP CONSTRAINT task_pkey;
       public            postgres    false    221            n           2606    31609    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    219            u           2606    31638 "   attachment attachment_task_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attachment
    ADD CONSTRAINT attachment_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.task(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public.attachment DROP CONSTRAINT attachment_task_id_fkey;
       public          postgres    false    223    4720    221            t           2606    31856    task task_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 @   ALTER TABLE ONLY public.task DROP CONSTRAINT task_user_id_fkey;
       public          postgres    false    219    4718    221            s           2606    31851    user user_squad_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_squad_id_fkey FOREIGN KEY (squad_id) REFERENCES public.squad(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_squad_id_fkey;
       public          postgres    false    219    217    4716               o  x�m�Mn1���)r��4��	(��Hm �Mo_�)�@h�'=��HT�{��=Ik#U�4ikd�c�ySQ�b&�
wp��!EX�s���+h3�L���I�@@�f=a^�.��)�r��" �;\�[�~���ỷ�8<��׷B����������-4�՞� I��� �b�sT*h�"㖩ۖ[�2����+����-�XW�2EY��S1�߾� ��_�z����������׺]�u���m�ޮ�7���瞤|P���G2�H��R�il�2�\v�C�,<�s��̛`�|�������[�<��V�F���}N�O���4�J�rO�������ϸ�)�gztSF�@z>�����:         t   x�3�t�K��W(I,�V0TH�O�4�447�4�053337���H,)v,(P��MLOU0202�54�50TH,Q04�31����t.ΐ����diiia`ddJ�A
���b���� �'�         +   x�3�.,MLQp�)�H�2��RK�������D�=... D         V  x���An�0е���͐��{�,�l-�6v��'�"��:�������&�|��~}�9����r~~x{�s.���[-U������sxڮ����T���mO۞���zY����5$ؐ���7�o�������3��=���KK�.{��ǟ����������,��-��LN����U��+DI=��
��B>�'�(��q�F����HP%	iD�+HC
y�D�Q�7�1���9,b�C�z�РCϓ9�8��"�^A:4�p#Z��+H�z�th��$�t�"�^A94<��$ʡ�k��C���C�{�qʡŃ��CË�H�Z<�^A9�`S=O94<��dʡ5r��C��'ɤ�p���t�w��C��'����C��:J&!��\;H�x�kIN��i1���Ab������s� 9�y��G��5O��v�"�B�I!E�];H�x�k)���'Rd�ҵ����$S_d��4���}����CzA_d+H�%�"[>q����Q��L}�-?Eg�����1Ç��V��K�}�-�/1�E~t�����̤HEz)R�H/ E*�yR��"�����Kr�      	   /  x����n�0����s�F��v�4-���ZQUB��$�ĆR���o�Y~i,;xHe(@Uה��3e�T4C�������bq�G����j6��C��;�R����(>x�r��M�߸�+��E.T!�0�G �A���B��R��0�<��m���x�RF��ڥ:�KQZި������@���^r2GW�Y�߇3#!#���U��qI
�Ī�09ElM�B��ag��)�,����W��
]�q��q\�(Mu~Av���6�$m�L,K�Cʡ�Z�zX&�b��n�Ο����V$     