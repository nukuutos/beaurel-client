const dialogs = (profileId) => [
  {
    $match: {
      $or: [{ senderId: profileId }, { recipientId: profileId }],
    },
  },
  {
    $sort: { createdAt: -1 },
  },
  {
    $group: {
      _id: {
        $cond: { if: { $ne: ['$senderId', profileId] }, then: '$senderId', else: '$recipientId' },
      },
      message: { $first: '$message' },
      senderId: { $first: '$senderId' },
      createdAt: { $first: '$createdAt' },
      isUnread: { $first: '$isUnread' },
    },
  },
  {
    $lookup: {
      from: 'users',
      let: {
        userId: '$_id',
      },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
        {
          $project: {
            _id: { $convert: { input: '$_id', to: 'string' } },
            username: 1,
            firstName: 1,
            lastName: 1,
            avatar: 1,
          },
        },
      ],
      as: 'user',
    },
  },
  {
    $addFields: {
      _id: { $convert: { input: '$_id', to: 'string' } },
      senderId: { $convert: { input: '$senderId', to: 'string' } },
      createdAt: { $convert: { input: '$createdAt', to: 'string' } },
      user: { $first: '$user' },
    },
  },
  {
    $sort: { createdAt: -1 },
  },
];

export default dialogs;
