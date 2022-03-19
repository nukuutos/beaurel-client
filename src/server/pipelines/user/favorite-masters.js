const favoriteMasters = (userId) => [
  {
    $match: {
      _id: userId,
    },
  },
  {
    $facet: {
      masterIds: [
        {
          $project: {
            masterIds: {
              $map: {
                input: '$masters',
                as: 'id',
                in: { $convert: { input: '$$id', to: 'string' } },
              },
            },
          },
        },
      ],
      masters: [
        {
          $project: {
            _id: 0,
            masters: 1,
          },
        },
        {
          $unwind: '$masters',
        },
        {
          $limit: 10,
        },
        {
          $project: {
            masterId: '$masters',
          },
        },
        {
          $lookup: {
            from: 'users',
            let: {
              masterId: '$masterId',
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$masterId'] },
                },
              },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  avatar: 1,
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
                  // rating: { $arrayElemAt: ["$rating.rating", 0] },
                  rating: { $round: [{ $arrayElemAt: ['$rating.rating', 0] }, 1] },
                  _id: { $convert: { input: '$_id', to: 'string' } },
                },
              },
            ],
            as: 'master',
          },
        },
        {
          $addFields: {
            master: { $arrayElemAt: ['$master', 0] },
          },
        },
        {
          $replaceWith: '$master',
        },
      ],
    },
  },
  {
    $addFields: {
      masterIds: { $arrayElemAt: ['$masterIds.masterIds', 0] },
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
      notifications: {
        appointments: { $arrayElemAt: ['$appointments', 0] },
        messages: { $arrayElemAt: ['$messages', 0] },
      },
      favorites: '$masters',
    },
  },
  {
    $project: {
      messages: 0,
      appointments: 0,
      masters: 0,
    },
  },
];

export default favoriteMasters;
