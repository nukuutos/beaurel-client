const settings = (userId) => [
  { $match: { _id: userId } },
  {
    $project: {
      _id: 0,
      username: 1,
      firstName: 1,
      lastName: 1,
      phone: 1,
      tools: 1,
    },
  },
  // notifications
  {
    $lookup: {
      from: 'appointments',
      let: {
        userId,
      },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $or: [
                  {
                    $and: [
                      { $expr: { $eq: ['$customerId', '$$userId'] } },
                      { $expr: { $eq: ['$isViewed.customer', false] } },
                    ],
                  },
                  {
                    $and: [
                      { $expr: { $eq: ['$masterId', '$$userId'] } },
                      { $expr: { $eq: ['$isViewed.master', false] } },
                    ],
                  },
                ],
              },
              {
                $expr: {
                  $in: ['$status', ['confirmed', 'onConfirmation', 'unsuitable']],
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            masterId: 1,
            customerId: 1,
            status: 1,
          },
        },
        {
          $group: {
            _id: null,
            master: {
              $addToSet: {
                $cond: {
                  if: { $eq: ['$masterId', '$$userId'] },
                  then: '$status',
                  else: '$$REMOVE',
                },
              },
            },
            customer: {
              $addToSet: {
                $cond: {
                  if: { $eq: ['$customerId', '$$userId'] },
                  then: '$status',
                  else: '$$REMOVE',
                },
              },
            },
          },
        },
        { $project: { _id: 0 } },
      ],
      as: 'appointments',
    },
  },
  {
    $lookup: {
      from: 'messages',
      let: {
        userId,
      },
      pipeline: [
        {
          $match: {
            isUnread: true,
            $expr: { $eq: ['$recipientId', '$$userId'] },
          },
        },
        {
          $group: {
            _id: null,
            isUnread: { $first: '$isUnread' },
          },
        },
        { $project: { _id: 0 } },
      ],
      as: 'messages',
    },
  },
  {
    $addFields: {
      globalData: {
        notifications: {
          appointments: { $arrayElemAt: ['$appointments', 0] },
          messages: { $arrayElemAt: ['$messages', 0] },
        },
        tools: '$tools',
      },
    },
  },
  {
    $project: {
      messages: 0,
      appointments: 0,
      tools: 0,
    },
  },
];

export default settings;
