const mastersWithFavorites = (userId) => [
  {
    $match: {
      role: 'master',
    },
  },
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
        {
          $project: {
            firstName: 1,
            lastName: 1,
            avatar: 1,
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
    },
  },
  {
    $addFields: {
      favoriteMasters: { $arrayElemAt: ['$favoriteMasters.masters', 0] },
    },
  },
];

export default mastersWithFavorites;
