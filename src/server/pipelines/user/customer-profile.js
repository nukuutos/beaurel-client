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
            appointmentsCount: { $arrayElemAt: ['$appointmentsCount.count', 0] },
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
    $project: {
      _id: 0,
    },
  },
  {
    $addFields: {
      // _id: { $convert: { input: '$_id', to: 'string' } },
      reviewsCount: { $arrayElemAt: ['$reviewsCount.reviewsCount', 0] },
      appointmentsData: { $arrayElemAt: ['$appointmentsData', 0] },
    },
  },
];

export default customerProfile;
