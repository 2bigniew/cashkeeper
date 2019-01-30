test


  Start
Start testing app...
    Partner Router
      DELETE ALL FROM partner_account
        ✓ It should remove all from partner table
      /GET Partner
        ✓ It should get all partners (80ms)
      /POST Partner
        ✓ It should not POST Partner without firstname, lastname, email
        ✓ It should not POST Partner when firstname, lastname, email is null
        ✓ It should POST Partner with firstname, lastname, email (85ms)
        ✓ It should not POST if Partner exist
        ✓ It should get partner data by lastname
      /PUT Partner
        ✓ It should update partner data by partner_id
        ✓ It should update only partner account number and city by partner_id
        ✓ It should not update partner data by partner_id with not alpha type firstname and lastname, or not email type email input
    Borrow Router
      DELETE ALL FROM borrow_details
        ✓ It should remove all from borrow_details table
      /GET Borrow
        ✓ It should get all borrows
      /POST Borrow
        ✓ It should not post without borrow-date or purpose
        ✓ It should not post if value is not decimal
        ✓ It should not post without partner id
        ✓ It should POST new borrow (45ms)
      /PUT Borrow
        ✓ It should not update borrow without borrow id, or partner id
        ✓ It should update borrow, set complete to true (38ms)
    Borrow Payment Router
      DELETE ALL FROM borrow_payment_details
        ✓ It should remove all from borrow_borrow_payment_detailsdetails table
      /GET Borrow Payment Details
        ✓ It should get borrow_payment_detaild basic data
        ✓ It should get sum of all borrow_payments
      /POST Borrow Payment Details
        ✓ It should not post without payment date
        ✓ It should not post if value is not decimal
        ✓ It should post with payment date, if value is decimal and
    Delete Dummy Data
      /DELETE Borrow payment
        ✓ It should delete borrow payment by borrow_payment_details_id (38ms)
      /DELETE Borrow
        ✓ It should delete borrow by borrow_id partner_id
      /DELETE Partner
        ✓ It should delete partner by partner_id
End of app test


  27 passing (678ms)

