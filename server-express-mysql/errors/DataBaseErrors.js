class DataNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataNotFound';
    this.statusCode = 404;
  }
}

class UsersNotFound extends DataNotFound {
  constructor() {
    super("User/s not found");
    this.name = 'UsersNotFound';
    this.statusCode = 404;
  }
}

class PostsNotFound extends DataNotFound {
  constructor() {
    super("Posts not found");
    this.name = 'PostsNotFound';
    this.statusCode = 404;
  }
}

module.exports = {
  DataNotFound,
  UsersNotFound,
  PostsNotFound,
}