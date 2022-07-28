const limit = 10;

const masterAppointmentsAndCustomers = (masterId, status) => [
  { $match: { $or: [{ masterId }, { customerId: masterId }] } },
  {
    $facet: {
      appointmentsNotifications: [
        {
          $match: {
            $and: [
              {
                $or: [
                  {
                    $and: [
                      { $expr: { $eq: ['$customerId', masterId] } },
                      { $expr: { $eq: ['$isViewed.customer', false] } },
                    ],
                  },
                  {
                    $and: [
                      { $expr: { $eq: ['$masterId', masterId] } },
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
                  if: { $eq: ['$masterId', masterId] },
                  then: '$status',
                  else: '$$REMOVE',
                },
              },
            },
            customer: {
              $addToSet: {
                $cond: {
                  if: { $eq: ['$customerId', masterId] },
                  then: '$status',
                  else: '$$REMOVE',
                },
              },
            },
          },
        },
        { $project: { _id: 0 } },
      ],
      appointments: [
        {
          $match: {
            masterId,
            status,
          },
        },
        { $sort: { date: 1, 'time.startAt': 1 } },
        { $limit: limit },
        {
          $addFields: {
            status: { status: '$status', user: { $last: '$history.user' } },
          },
        },
        {
          $lookup: {
            from: 'users',
            let: {
              customerId: '$customerId',
            },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$customerId'] } } },
              {
                $project: {
                  _id: { $convert: { input: '$_id', to: 'string' } },
                  role: 1,
                  username: 1,
                  firstName: 1,
                  lastName: 1,
                  isAvatar: 1,
                },
              },
            ],
            as: 'user',
          },
        },
        {
          $project: {
            masterId: 0,
            customerId: 0,
          },
        },
        {
          $addFields: {
            _id: { $convert: { input: '$_id', to: 'string' } },
            user: { $arrayElemAt: ['$user', 0] },
            'service.update.date': { $convert: { input: '$service.update.date', to: 'string' } },
          },
        },
        {
          $group: {
            _id: { $dateToString: { date: '$date' } },
            appointments: {
              $push: {
                _id: '$_id',
                status: '$status',
                user: '$user',
                review: '$review',
                service: '$service',
                time: '$time',
                isViewed: '$isViewed',
                date: { $convert: { input: '$date', to: 'string' } },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            appointments: '$appointments',
          },
        },
      ],
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
      as: 'messagesNotifications',
    },
  },
  {
    $addFields: {
      globalData: {
        notifications: {
          messages: { $arrayElemAt: ['$messagesNotifications', 0] },
          appointments: { $arrayElemAt: ['$appointmentsNotifications', 0] },
        },
      },
    },
  },
  { $project: { messagesNotifications: 0, appointmentsNotifications: 0 } },
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

export default masterAppointmentsAndCustomers;
