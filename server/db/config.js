const pg = require('pg');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('hobbyist', process.env.DB_USER, process.env.DP_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING // needs hashing
});

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  time: Sequelize.DATE,
  lat: Sequelize.NUMERIC,
  long: Sequelize.NUMERIC,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  }
});

const FollowedEvent = sequelize.define('followed_event', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  attending: Sequelize.BOOLEAN,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_event: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    }
  }
});

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  body: Sequelize.STRING,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_event: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: 'id',
    }
  }
});

const ThreadComment = sequelize.define('thread_comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  body: Sequelize.STRING,
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_comment: {
    type: Sequelize.INTEGER,
    references: {
      model: Comment,
      key: 'id',
    }
  }
});

const Group = sequelize.define('group', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
});

const GroupsUsers = sequelize.define('groups_users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    }
  },
  id_group: {
    type: Sequelize.INTEGER,
    references: {
      model: Group,
      key: 'id',
    }
  }
});

sequelize.sync();
