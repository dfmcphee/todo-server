var Tasks = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;
    var userId = self.session.get('userId');

    geddy.model.Task.all({userId: userId}, function(err, tasks) {
      self.respond({params: params, tasks: tasks});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this;
    var userId = self.session.get('userId');
    var task = geddy.model.Task.create(params);

    if (!task.isValid()) {
      this.respondWith(task);
    } else {
      geddy.model.User.first({id: userId}, function(err, user) {
        if (user) {
          task.setUser(user);
          task.complete = false;
          task.save(function(err, data) {
            if (err) {
              throw err;
            }
            self.respond(task, {format: 'json'});
          });
        } else {
          self.respond({error: 'User not found.'}, {format: 'json'});
        }
      });
    }
  };

  this.show = function (req, resp, params) {
    this.respond({params: params});
  };

  this.edit = function (req, resp, params) {
    this.respond({params: params});
  };

  this.update = function (req, resp, params) {
    var self = this;
    var userId = self.session.get('userId');

    geddy.model.Task.first({id: params.id, userId: userId}, function(err, task) {
      if (err) {
        throw err;
      }
      task.updateProperties(params);

      if (!task.isValid()) {
        self.respondWith(task);
      }
      else {
        task.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respond(task, {format: 'json'});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;
    var userId = self.session.get('userId');

    geddy.model.Task.first({id: params.id, userId: userId}, function(err, task) {
      if (err) {
        throw err;
      }
      else {
        geddy.model.Task.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respond({success: true}, {format: 'json'});
        });
      }
    });
  };

};

exports.Tasks = Tasks;
