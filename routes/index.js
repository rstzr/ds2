var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/data/:type/:name/:maxid/:pass', function (req, res, next) {

  if (req.params.type != null && req.params.name != null && req.params.pass == 'data9') {

    if (req.params.name == 'lexisargeant') {
      res.send("noUser");
    } else {

      var reqUri;
      if (req.params.type == 'userinfo') {
        reqUri = 'https://www.instagram.com/' + req.params.name + '/?__a=1';
      } else if (req.params.type == 'userrecent') {
        if (req.params.maxid == 0) {
          //reqUri = 'https://www.instagram.com/' + req.params.name + '/media/';
          reqUri = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=%7B%22id%22%3A%22' + req.params.name + '%22%2C%22first%22%3A20%7D';
        } else {
          //reqUri = 'https://www.instagram.com/' + req.params.name + '/media/?max_id=' + req.params.maxid;
          reqUri = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=%7B%22id%22%3A%22' + req.params.name + '%22%2C%22first%22%3A20%2C%22after%22%3A%22' + req.params.maxid + '%22%7D';
        }
      } else if (req.params.type == 'tagrecent') {
        if (req.params.maxid == 0) {
          reqUri = 'https://www.instagram.com/explore/tags/' + req.params.name + '/?__a=1';
        } else {
          reqUri = 'https://www.instagram.com/explore/tags/' + req.params.name + '/?__a=1&max_id=' + req.params.maxid;
        }
      } else if (req.params.type == 'locrecent') {
        if (req.params.maxid == 0) {
          reqUri = 'https://www.instagram.com/explore/locations/' + req.params.name + '/?__a=1';
        } else {
          reqUri = 'https://www.instagram.com/explore/locations/' + req.params.name + '/?__a=1&max_id=' + req.params.maxid;
        }
      } else if (req.params.type == 'postinfo') {

        reqUri = 'https://www.instagram.com/p/' + req.params.name + '/?__a=1';
      }

      request({url: reqUri, followAllRedirects: false}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          try {
            var info = JSON.parse(body)
            // do more stuff
            res.send(info);
          } catch (err) {
            res.send("noUser");
          }
        }
        else {
          res.send("noUser");
        }
      })
    }
  }
});

module.exports = router;
