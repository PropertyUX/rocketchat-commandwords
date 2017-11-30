#rocketchat-commandwords

Adds a `renderMessage` callback to Rocket.chat that converts text inside [[double square brackets]] into clickable 'buttons'. When clicked, these buttons behave as follows:

`[[message]]` will paste <message> into the current room <br/>
`[[message@recipient]]` will DM _message_ to _recipient_ (if that recipient is online)
