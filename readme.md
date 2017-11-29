rocketchat-commandwords adds a renderMessage callback to Rocket.chat that converts text inside [[double square brackets]] into clickable 'buttons'

[[message]] will paste <message> into the current room when clicked
[[message@recipient]] will DM <message> to <recipient> (if that recipient is online) when clicked
