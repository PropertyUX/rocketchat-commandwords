# rocketchat-commandwords

Adds a `renderMessage` callback to Rocket.chat that converts text inside [[double square brackets]] into clickable 'buttons'. When clicked, these buttons behave as follows:

- `[[message]]` will paste _message_ into the current room <br/>
- `[[message@recipient]]` will DM _message_ to _recipient_ (if that recipient is online)

## Getting Started

This package contains both client and server side code. To use it under Rocket.chat, we recommend you create a file under your project root such as \common\commandwords.js that contains the following line:

`import CommandWords from 'rocketchat-commandwords'`
