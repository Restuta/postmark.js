var mocha = require('mocha');
var assert = require('assert');
var nconf = require('nconf');
var testingKeys = nconf.env().file({
  file: __dirname + '/../testing_keys.json'
});
var util = require('util');
var merge = require('merge');

var postmark = require('../lib/postmark/index.js');

describe('client stats operations', function() {
  // allow some of the more intensive tests to take longer.
  this.timeout(30000);
  var _client = null;

  beforeEach(function() {
    _client = new postmark.Client(testingKeys.get('READ_SELENIUM_TEST_SERVER_TOKEN'));
  });

  it('can get delivery statistics', function(done) {
    _client.getDeliveryStatistics(done);
  });

  it('can get sent counts', function(done) {
    _client.getSentCounts(done);
  });

  it('can get bounce counts', function(done) {
    _client.getBounceCounts(done);
  });

  it('can get spam complaints', function(done) {
    _client.getSpamComplaints(done);
  });

  it('can get tracked email counts', function(done) {
    _client.getTrackedEmailCounts(done);
  });

  it('can get bounce counts', function(done) {
    _client.getBounceCounts(done);
  });

  it('can get outbound overview', function(done) {
    var now = new Date();
    var yesterday = new Date(now.valueOf() - (24 * 3600 * 1000));
    var toDate = '' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    var fromDate = '' + yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate();

    _client.getOuboundOverview({
      fromdate: fromDate,
      todate: toDate
    }, done);
  });

});