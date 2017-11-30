if (Meteor.isServer) {
  var fs = require('fs')
  RocketChat.theme.addPackageAsset(function() {
    return fs.readFileSync(__dirname + '\\styles.less')
  });
}

if (Meteor.isClient) {
  CommandWords = (function() {
    function CommandWords(message) {
      if (_.trim(message.msg)) {
        // NOTE : because something else in the rendering pipeline may have already altered the HTML
        // (e.g. converting @user to a mention-link), we look at the original message.msg but ultimately
        // replace the HTML, overwriting any markup previously added
        message.html = message.msg.replace(/\[\[([^@\]]*)@?([^\]]*)]]/gi, function(match, text, recipient) {
          if (recipient 
              && Meteor.user().username.toLowerCase() !== recipient.toLowerCase() // messaging yourself makes no sense
              && Meteor.users.findOne({ username: recipient })) {
            return "<span class=\"command-word\" data-recipient=\"" + recipient + "\">" + text + "</span>";
          } else {
            return "<span class=\"command-word\">" + text + "</span>";
          }
        });
      }
      return message;
    }

    return CommandWords;
  
  })();
  
  RocketChat.callbacks.add('renderMessage', CommandWords);

  Template.room.events({
    'click .command-word': function(event, instance) {
      var recipient;
      event.stopPropagation();
      recipient = event.currentTarget.getAttribute('data-recipient');
      if (!!recipient) {
        Meteor.call('createDirectMessage', recipient, function(error, result) {
          if (!error) {
            Meteor.call('sendMessage', {
              _id: Random.id(),
              rid: result.rid,
              msg: event.target.innerText
            });
            return FlowRouter.go('direct', {
              username: recipient
            });
          }
        });
      } else {
        Meteor.call('sendMessage', {
          _id: Random.id(),
          rid: instance.data._id,
          msg: event.target.innerText
        });
      }
      instance.find('.js-input-message').focus();
    }
  });
}