var express = require('express');
var MailchimpApi = require('mailchimp-api');
var mc = new MailchimpApi.Mailchimp('afc944703ad56407ba567f5aaf0a1845-us5');
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
                id: 'fc9a5b95ad',
                email: {
                    email: req.body.email
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
    res.send(200, {
        'status': true
    });
    //subscribeToNewsLetter()

});

module.exports = router;
