test


  Start
Start Partner Router test
    Partner Router
      DELETE ALL FROM partner_account
        ✓ It should remove all from partner table
      /GET Partner
        ✓ It should get all partners (83ms)
      /POST Partner
        ✓ It should not POST Partner without firstname, lastname, email
        ✓ It should not POST Partner when firstname, lastname, email is null
        ✓ It should POST Partner with firstname, lastname, email (75ms)
        ✓ It should not POST  if Partner exist
        ✓ It should get partner data by lastname
      /PUT Partner
        ✓ It should update partner data by partner_id
Finished Partner Router test


  8 passing (340ms)

