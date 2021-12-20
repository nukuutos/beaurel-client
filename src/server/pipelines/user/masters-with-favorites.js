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
          $project: {
            _id: 0,
            // for api we can omit it
            masters: {
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
