insert into money_quotes(quote, author_or_source) values
('Pieniądze są dobrym sługą, ale złym panem', 'przysłowie francuskie'),
('Inteligencję człowieka można zobaczyć w tym, jak zarabia pieniądze. Jego mądrość w tym, jak je wydaje', 'przysłowie greckie'),
('Nasze życie jest piekłem nie dlatego, że pieniądze są dla nas tak ważne, ale dlatego, że nie są wystarczająco ważne', 'Jacob Needleman'),
('Młodym ludziom wydaje się, że pieniądze są najważniejszą rzeczą w życiu. Gdy się zestarzeją, są tego pewni', 'Oskar Wilde'),
('Najtrudniej dźwigać pusty portfel', 'Harry Kemelman'),
('Skoro pracujesz na swoje pieniądze co najmniej czterdzieści godzin tygodniowo, to skrajną nieodpowiedzialnością jest niepoświęcanie im uwagi', 'Suze Orman'),
('Dyscyplina jest matką dobrobytu', 'Ajschylos'),
('Lepiej jest godzinę pomyśleć o swoich pieniądzach, niż tydzień na nie pracować', 'Andre Costolany');

-- *****************************************************************************

insert into partner_account
(user_id, firstname, lastname, street, "number", "local", city, country, mobile, email, bank_account, is_active, is_deleted) 
values
(1, 'Rafi', 'Halewood', 'Victoria', '1019', '16', 'Pyatigorsk', 'Russia', '332-654-4670', 'rhalewood0@ovh.net', '14291123988656917058', true, false),
(1, 'Josie', 'Kike', 'Beilfuss', '8', '7', 'Qohord-e Bālā', 'Iran', '747-303-3808', 'jkike1@harvard.edu', '75286877951884730799', true, false),
(1, 'Darby', 'Lowfill', 'Hayes', '70', '23', 'Kořenov', 'Czech Republic', '454-774-8075', 'dlowfill2@goo.ne.jp', '26400951384186579853', true, false),
(1, 'Kendal', 'Stranaghan', 'Elka', '13', '44', 'Kaset Wisai', 'Thailand', '674-741-7069', 'kstranaghan3@imdb.com', '21664336073182661180', true, false),
(1, 'Nonnah', 'Matityahu', 'Menomonie', '295', '15', 'Pampas', 'Peru', 'United States', 'nmatityahu4@friendfeed.com', '78287024405185660845', true, false),
(1, 'Candice', 'Hoofe', 'Oakridge', '2', '70', 'Uhryniv', 'Ukraine', '852-466-0833', 'bgodney7@unc.edu', '71623407957783531625', true, false);

-- *****************************************************************************

insert into loan_details
(partner_id, user_id, loan_serial, loan_date, purpose, value, is_completed) 
values
(1, 1, 'serial/example/1/1', '2018-10-08', 'Buy PS4', 600.00, false),
(2, 1, 'serial/example/2/1', '2018-09-08', 'Buy pants', 100.00, false),
(2, 1, 'serial/example/2/2', '2018-07-11', 'Go to cinema', 52.00, false),
(3, 1, 'serial/example/3/1', '2018-02-16', 'repair bike', 200.00, false),
(3, 1, 'serial/example/3/2', '2018-03-18', 'repair auto', 400.00, false),
(3, 1, 'serial/example/3/3', '2018-04-19', 'pay insurance', 215.00, false);

-- *****************************************************************************

insert into borrow_details
(partner_id, user_id, borrow_serial, borrow_date, purpose, value, is_completed) 
values
(4, 1, 'serial/example/4/1', '2018-11-08', 'Buy XONE', 500.00, false),
(5, 1, 'serial/example/5/1', '2018-10-08', 'Buy jacket', 110.00, false),
(5, 1, 'serial/example/5/2', '2018-08-11', 'Go to club', 72.00, false),
(6, 1, 'serial/example/6/1', '2018-03-16', 'repair fridge', 2500.00, false),
(6, 1, 'serial/example/6/2', '2018-04-18', 'repair iphone', 350.00, false),
(6, 1, 'serial/example/6/3', '2018-05-19', 'pay bills', 210.00, false);

-- *****************************************************************************

delete from user_account where user_id <> 1;
delete from user_info where user_id <> 1;
delete from borrow_payment_details;
delete from loan_payment_details;
delete from borrow_details;
delete from loan_details;
delete from partner_account;
delete from template_mail;
delete from template_sms;
delete from sms_messages;
delete from mail_messages;
-- delete from money_quotes;

update user_account set
login = '2bigniew',
"password" = 'eafe2d20ba29ab327e7143c1931073e410215ffee5d895692e89225db354e4fe'
where user_id = 1;

