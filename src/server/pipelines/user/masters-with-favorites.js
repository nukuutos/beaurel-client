const mastersWithFavorites = (userId, city) => [
  {
    $facet: {
      favoriteMasters: [
        {
          $match: {
            _id: userId,
          },
        },
        {
          $lookup: {
            from: 'users',
            let: {
              masters: '$masters',
            },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ['$_id', '$$masters'] },
                },
              },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  isAvatar: 1,
                  placeOfWork: 1,
                  specialization: 1,
                },
              },
              // get avg rating
              {
                $lookup: {
                  from: 'reviews',
                  let: {
                    masterId: '$_id',
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$masterId', '$$masterId'] },
                      },
                    },
                    {
                      $project: {
                        _id: 0,
                        rating: { $avg: '$value' },
                      },
                    },
                  ],
                  as: 'rating',
                },
              },
              {
                $addFields: {
                  // rating: { $arrayElemAt: ["$rating.rating", 0] },
                  rating: { $round: [{ $arrayElemAt: ['$rating.rating', 0] }, 1] },
                  _id: { $convert: { input: '$_id', to: 'string' } },
                },
              },
            ],
            as: 'masters',
          },
        },
      ],
      masters: [
        { $match: { city, 'tools.isServices': true, 'tools.isTimetable': true, role: 'master' } },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            isAvatar: 1,
            placeOfWork: 1,
            specialization: 1,
          },
        },
        // rating
        {
          $lookup: {
            from: 'reviews',
            let: {
              masterId: '$_id',
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$masterId', '$$masterId'] },
                },
              },
              {
                $group: {
                  _id: null,
                  rating: { $avg: '$value' },
                },
              },
              {
                $project: {
                  _id: 0,
                },
              },
            ],
            as: 'rating',
          },
        },
        {
          $addFields: {
            rating: { $round: [{ $arrayElemAt: ['$rating.rating', 0] }, 1] },
            _id: { $convert: { input: '$_id', to: 'string' } }, // for api we can omit it
          },
        },
        {
          $sort: {
            rating: -1,
          },
        },
        {
          $limit: 10,
        },
      ],
      // notifications
      notifications: [
        {
          $match: {
            _id: userId,
          },
        },
        { $project: { _id: 1 } },
        {
          $lookup: {
            from: 'appointments',
            let: {
              userId: '$_id',
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
              userId: '$_id',
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
        { $project: { _id: 0 } },
        {
          $addFields: {
            appointments: { $arrayElemAt: ['$appointments', 0] },
            messages: { $arrayElemAt: ['$messages', 0] },
          },
        },
      ],
    },
  },
  {
    $addFields: {
      globalData: {
        notifications: { $arrayElemAt: ['$notifications', 0] },
        favorites: { $arrayElemAt: ['$favoriteMasters.masters', 0] },
      },
    },
  },
  {
    $project: {
      notifications: 0,
      favoriteMasters: 0,
    },
  },
  {
    $lookup: {
      from: 'users',
      let: {
        userId,
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

export default mastersWithFavorites;
