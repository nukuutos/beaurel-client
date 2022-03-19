const customerProfile = (matchQuery) => [
  // get profile and favorites
  {
    $match: matchQuery,
  },
  {
    $project: {
      role: 1,
      firstName: 1,
      lastName: 1,
      avatar: 1,
      city: 1,
      aboutText: 1,
      masters: 1,
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
            firstName: 1,
            lastName: 1,
            avatar: 1,
            specialization: 1,
            username: 1,
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
            rating: { $round: [{ $arrayElemAt: ['$rating.rating', 0] }, 1] },
            _id: { $convert: { input: '$_id', to: 'string' } },
          },
        },
      ],
      as: 'favorites',
    },
  },
  { $project: { masters: 0 } },
  // last appointment and stats
  {
    $lookup: {
      from: 'appointments',
      let: {
        customerId: '$_id',
      },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$customerId', '$$customerId'] },
          },
        },

        {
          $facet: {
            siblingAppointment: [
              { $match: { status: { $in: ['onConfirmation', 'confirmed'] } } },
              {
                $sort: {
                  createdAt: 1,
                },
              },
              {
                $group: {
                  _id: null,
                  masterId: { $last: '$masterId' },
                  service: { $last: '$service' },
                  time: { $last: '$time' },
                  date: { $last: '$date' },
                  status: { $last: '$status' },
                  isViewed: { $last: '$isViewed' },
                },
              },
              { $project: { _id: 0 } },
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
                        firstName: 1,
                        lastName: 1,
                        avatar: 1,
                        _id: { $convert: { input: '$_id', to: 'string' } },
                      },
                    },
                  ],
                  as: 'user',
                },
              },
              { $addFields: { masterId: 0, user: { $arrayElemAt: ['$user', 0] } } },
            ],
            appointmentsCount: [
              { $match: { status: 'history' } },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
        {
          $addFields: {
            siblingAppointment: { $arrayElemAt: ['$siblingAppointment', 0] },
            appointmentsCount: { $ifNull: [{ $arrayElemAt: ['$appointmentsCount.count', 0] }, 0] },
          },
        },
      ],
      as: 'appointmentsData',
    },
  },
  {
    $lookup: {
      from: 'reviews',
      let: {
        customerId: '$_id',
      },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$customerId', '$$customerId'] },
          },
        },
        {
          $group: {
            _id: null,
            reviewsCount: { $sum: 1 },
          },
        },
      ],
      as: 'reviewsCount',
    },
  },

  {
    $addFields: {
      id: { $convert: { input: '$_id', to: 'string' } },
      reviewsCount: { $arrayElemAt: ['$reviewsCount.reviewsCount', 0] },
      appointmentsData: { $arrayElemAt: ['$appointmentsData', 0] },
    },
  },
  // notifications
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
  {
    $addFields: {
      globalData: {
        notifications: {
          appointments: { $arrayElemAt: ['$appointments', 0] },
          messages: { $arrayElemAt: ['$messages', 0] },
        },
        favorites: '$favorites',
      },
    },
  },
  {
    $project: {
      _id: 0,
      messages: 0,
      appointments: 0,
      favorites: 0,
    },
  },
];

export default customerProfile;
