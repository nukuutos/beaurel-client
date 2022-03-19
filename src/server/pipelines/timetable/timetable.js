const timetable = (masterId) => [
  { $match: { masterId } },
  {
    $addFields: {
      _id: { $convert: { input: '$_id', to: 'string' } },
      masterId: { $convert: { input: '$masterId', to: 'string' } },
      'update.date': { $convert: { input: '$update.date', to: 'string' } },
    },
  },
  // notifications
  {
    $lookup: {
      from: 'appointments',
      let: {
        userId: masterId,
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
        userId: masterId,
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
      },
    },
  },
  {
    $project: {
      messages: 0,
      appointments: 0,
    },
  },
  {
    $lookup: {
      from: 'users',
      let: {
        masterId,
      },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', '$$masterId'] },
          },
        },
        { $project: { _id: 0, tools: 1 } },
      ],
      as: 'tools',
    },
  },
  {
    $addFields: {
      'globalData.tools': { $arrayElemAt: ['$tools.tools', 0] },
    },
  },
  {
    $project: {
      tools: 0,
    },
  },
];

export default timetable;
