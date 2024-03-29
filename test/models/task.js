var assert = require('assert')
  , tests
  , Task = geddy.model.Task;

tests = {

  'after': function (next) {
    // cleanup DB
    Task.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var task = Task.create({});
    task.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
