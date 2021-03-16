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
        // city
        // {
        //   $match: {
        //     city: 'vdk'
        //   }
        // },
        {
          $limit: 10,
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            avatar: 1,
            placeOfwork: 1,
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
            rating: { $arrayElemAt: ['$rating.rating', 0] },
            _id: { $convert: { input: '$_id', to: 'string' } }, // for api we can omit it
          },
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
