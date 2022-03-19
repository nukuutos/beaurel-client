const dialogs = (profileId) => [
  {
    $facet: {
      dialogs: [
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
              $cond: {
                if: { $ne: ['$senderId', profileId] },
                then: '$senderId',
                else: '$recipientId',
              },
            },
            message: { $first: '$message' },
            senderId: { $first: '$senderId' },
            createdAt: { $first: '$createdAt' },
            isUnread: { $first: '$isUnread' },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 20 },
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
                  role: 1,
                  wasOnline: 1,
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
      ],
      messageNotifications: [
        {
          $match: {
            $or: [{ senderId: profileId }, { recipientId: profileId }],
            isUnread: true,
            $expr: { $eq: ['$recipientId', profileId] },
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
      appointmentNotifications: [
        {
          $group: {
            _id: null,
            isUnread: { $first: '$isUnread' },
          },
        },
        {
          $lookup: {
            from: 'appointments',
            let: {
              userId: profileId,
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
        { $project: { appointments: 1, _id: 0 } },
      ],
    },
  },
  {
    $addFields: {
      globalData: {
        notifications: {
          appointments: {
            $arrayElemAt: [{ $arrayElemAt: ['$appointmentNotifications.appointments', 0] }, 0],
          },
          messages: { $arrayElemAt: ['$messageNotifications', 0] },
        },
      },
    },
  },
  {
    $project: {
      appointmentNotifications: 0,
      messageNotifications: 0,
    },
  },
  {
    $lookup: {
      from: 'users',
      let: {
        userId: profileId,
      },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', '$$userId'] },
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

export default dialogs;
