// Dependencies
const Op = require('sequelize').Op;

const userAssociations = [
  {
    association: 'posts',
    include: [
      {
        association: 'author',
        attributes: ['userId', 'userName'],
        include: [
          {
            association: 'incoming',
            through: { attributes: ['status'] },
            attributes: ['userId'],
          },
          {
            association: 'outgoing',
            through: { attributes: ['status'] },
            attributes: ['userId'],
          },
          {
            association: 'friends',
            through: { attributes: ['status'] },
            attributes: ['userId'],
          },
          {
            association: 'denied',
            through: { attributes: [] },
            attributes: ['userId'],
          },
          {
            association: 'blocked',
            through: { attributes: [] },
            attributes: ['userId'],
          }
        ]
      },
      {
        association: 'comments',
        include: {
          association: 'author',
          attributes: ['userId', 'userName']
        }
      }
    ]
  },
  {
    association: 'groups',
    attributes: ['groupId', 'groupName']
  },
  {
    association: 'memberships',
    attributes: ['groupId', 'groupName']
  },
  {
    association: 'incoming',
    through: { attributes: ['status'] },
    attributes: ['userId', 'userName'],
  },
  {
    association: 'outgoing',
    through: { attributes: ['status'] },
    attributes: ['userId', 'userName'],
  },
  {
    association: 'friends',
    through: { attributes: ['status'] },
    attributes: ['userId', 'userName'],
  },
  {
    association: 'denied',
    through: { attributes: [] },
    attributes: ['userId'],
  },
  {
    association: 'blocked',
    through: { attributes: [] },
    attributes: ['userId'],
  }
];

// GROUP ASSOCIATIONS
const groupAssociations = [
  {
    association: 'owner',
    attributes: ['userId', 'userName']
  },
  {
    association: 'members',
    attributes: ['userId', 'userName']
  },
  {
    association: 'admins',
    attributes: ['userId', 'userName']
  },
  {
    association: 'posts',
    include: [
      {
        association: 'author',
        attributes: ['userId', 'userName'],
        include: {
          association: 'blocked',
          through: { attributes: [] },
          attributes: ['userId'],
        }
      },
      {
        association: 'comments',
        include: {
          association: 'author',
          attributes: ['userId', 'userName']
        }
      }
    ]
  }
];

// POST ASSOCIATIONS
const postAssociations = [
  {
    association: 'author',
    attributes: ['userId', 'userName'],
    include: [
      {
        association: 'incoming',
        through: { attributes: ['status'] },
        attributes: ['userId'],
      },
      {
        association: 'outgoing',
        through: { attributes: ['status'] },
        attributes: ['userId'],
      },
      {
        association: 'friends',
        through: { attributes: ['status'] },
        attributes: ['userId'],
      },
      {
        association: 'denied',
        through: { attributes: [] },
        attributes: ['userId'],
      },
      {
        association: 'blocked',
        through: { attributes: [] },
        attributes: ['userId'],
      }
    ]
  },
  {
    association: 'comments',
    include: {
      association: 'author',
      attributes: ['userId', 'userName']
    }
  }
];

module.exports = {
  userAssociations,
  groupAssociations,
  postAssociations,
}