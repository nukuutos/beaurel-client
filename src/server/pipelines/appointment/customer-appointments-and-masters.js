const limit = 10;
// with sessionTime
const customerAppointmentsAndMasters = (customerId, status) => [
  { $match: { customerId } },
  {
    $facet: {
      appointmentsNotifications: [
        {
          $match: {
            $and: [
              { $expr: { $eq: ['$customerId', customerId] } },
              { $expr: { $eq: ['$isViewed.customer', false] } },
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
            customer: {
              $addToSet: {
                $cond: {
                  if: { $eq: ['$customerId', customerId] },
                  then: '$status',
                  else: '$$REMOVE',
                },
              },
            },
          },
        },
        { $addFields: { master: [] } },
        { $project: { _id: 0 } },
      ],
      appointments: [
        {
          $match: {
            status,
          },
        },
        { $sort: { date: 1, time: 1 } },
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
              masterId: '$masterId',
            },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$masterId'] } } },
              {
                $project: {
                  _id: { $convert: { input: '$_id', to: 'string' } },
                  role: 1,
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
        userId: customerId,
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
];

export default customerAppointmentsAndMasters;
