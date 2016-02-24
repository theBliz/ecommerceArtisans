var express = require('express');
var MailchimpApi = require('mailchimp-api');
var mc = new MailchimpApi.Mailchimp('95b024d51cd1e3854fa26743684c5c40-us12');
var fs = require('fs');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/newsletter/subscribe', function(req, res) {
    /*if (req.body.email.indexOf('@marketcloud.it') > -1) {
        console.log("Received new subsciption from " + req.body.email)
        res.send({
            status: true
        })
        return;
    }*/
    console.log('data',req.body)
    function subscribeToNewsLetter() {
        mc.lists.subscribe({
                id: '1a3284892f',
                email: {
                    email: req.body.newMail
                }
            }, function() {
                //function(data)
                res.send({
                    status: true
                });
            },
            function(error) {
                if (error.error) {
                    fs.appendFileSync('mandrill_error.txt', (new Date()) + ' ' + JSON.stringify(error) + '\n');
                    res.send({
                        'status': false,
                        'error': error.error
                    });
                } else {
                    res.send(200, {
                        'status': true
                    });
                }

            });
    }
    subscribeToNewsLetter()

});

module.exports = router;
