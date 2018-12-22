-- app's user
create table user_account(
  user_id serial,
  login character varying,
  password character varying,
  firstname character varying,
  lastname character varying,
  bank_account character varying,
  created_at timestamp without time zone,
  is_deleted boolean,
  deleted_date timestamp without time zone,
  primary key(user_id)
);

-- ************************************************************

-- user info
create table user_info(
  u_info_id serial,
  user_id integer,
  street character varying,
  number character varying(10),
  local character varying(10),
  city character varying(255),
  country character varying,
  mobile character varying(15),
  email character varying,
  primary key(u_info_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- user's parterns info
create table partner_account(
  partner_id serial,
  user_id integer,
  firstname character varying,
  lastname character varying,
  street character varying,
  number character varying(10),
  local character varying(10),
  city character varying,
  country character varying,
  mobile character varying(15),
  email character varying,
  bank_account character varying,
  created_at timestamp without time zone,
  is_active boolean,
  is_deleted boolean,
  deleted_date timestamp without time zone,
  primary key(partner_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- loan details 
create table loan_details(
  loan_id serial,
  partner_id integer,
  user_id integer,
  loan_serial character varying,
  loan_date date,
  purpose text,
  value double precision,
  created_at timestamp without time zone,
  is_completed boolean,
  primary key(loan_id),
  foreign key(partner_id) references partner_account(partner_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- borrow details 
create table borrow_details(
  borrow_id serial,
  partner_id integer,
  user_id integer,
  borrow_serial character varying,
  borrow_date date,
  purpose text,
  value double precision,
  created_at timestamp without time zone,
  is_completed boolean,
  primary key(borrow_id),
  foreign key(partner_id) references partner_account(partner_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- details loaners payments
create table loan_payment_details(
  loan_payment_details_id serial,
  loan_id integer,
  user_id integer,
  payment_date date,
  payment_value double precision,
  created_at timestamp without time zone,
  primary key(loan_payment_details_id),
  foreign key(loan_id) references loan_details(loan_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- details payments to borrowers
create table borrow_payment_details(
  borrow_payment_details_id serial,
  borrow_id integer,
  user_id integer,
  payment_date date,
  payment_value double precision,
  created_at timestamp without time zone,
  primary key(borrow_payment_details_id),
  foreign key(borrow_id) references borrow_details(borrow_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- template of mail messages
create table template_mail(
  template_id serial,
  user_id integer,
  template_name character varying,
  title character varying,
  content text,
  end_line character varying,
  is_default boolean,
  created_at timestamp without time zone,
  primary key(template_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- template of sms messages
create table template_sms(
  template_id serial,
  user_id integer,
  template_name character varying,
  title character varying,
  content text,
  end_line character varying,
  is_default boolean,
  created_at timestamp without time zone,
  primary key(template_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************ 

-- outcome mail messages
create table mail_messages(
  mail_id serial,
  partner_id integer,
  mail_template_id integer,
  user_id integer,
  mail_title character varying,
  mail_content text,
  date_of_send timestamp without time zone,
  loan_details_serials text,
  created_at timestamp without time zone,
  primary key(mail_id),
  foreign key(partner_id) references partner_account(partner_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************ 

-- outcome sms messages
create table sms_messages(
  sms_id serial,
  partner_id integer,
  sms_template_id integer,
  user_id integer,
  sms_title character varying,
  sms_content text,
  date_of_send timestamp without time zone,
  loan_details_serials text,
  created_at timestamp without time zone,
  primary key(sms_id),
  foreign key(partner_id) references partner_account(partner_id),
  foreign key(user_id) references user_account(user_id)
);

-- ************************************************************

-- quotes
create table money_quotes(
  id serial,
  quote character varying,
  author_or_source character varying,
  primary key(id)
);

-- ************************************************************

insert into user_account(login, password, firstname, lastname, bank_account, is_deleted) values
('admin', 'pozniejzmienie', 'Zbigniew', 'Stasiak', '12345678900987654321123456', false);

insert into user_info(user_id, street, "number", "local", city, country, mobile, email) values
(1, 'Przykladowa', '123', '4', 'Poznan', 'Polska', '123456789', 'stasiakzb@gmail.com');
