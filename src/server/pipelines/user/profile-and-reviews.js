const profileAndReviews = (masterId, userId = null) => [
  {
    $facet: {
      // get masters
      favorites: [
        {
          $match: {
            _id: userId,
          },
        },
        {
          $project: {
            _id: 0,
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
      // get profile with reviews
      master: [
        {
          $match: {
            _id: masterId,
          },
        },
        {
          $project: {
            _id: 0,
            email: 0,
            password: 0,
            isConfirmed: 0,
            role: 0,
            createdAt: 0,
            masters: 0,
          },
        },
      ],
    },
  },
  // get review stats(avg, review counters by value, reviews)
  {
    $lookup: {
      from: 'reviews',
      let: {
        masterId,
      },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$masterId', '$$masterId'] },
          },
        },
        {
          $facet: {
            // getting reviews
            reviews: [
              {
                $lookup: {
                  from: 'users',
                  let: {
                    customerId: '$customerId',
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$customerId'] },
                      },
                    },
                    {
                      $project: {
                        _id: 0,
                        id: { $convert: { input: '$_id', to: 'string' } },
                        firstName: 1,
                        lastName: 1,
                        avatar: 1,
                      },
                    },
                  ],
                  as: 'customer',
                },
              },
              {
                $project: {
                  _id: 0,
                  review: {
                    comment: '$comment',
                    value: '$value',
                    date: {
                      $dateToString: {
                        date: '$createdAt',
                        format: '%d-%m-%Y',
                      },
                    },
                  },
                  customer: { $arrayElemAt: ['$customer', 0] },
                },
              },
            ],
            // get rating stats
            ratingStats: [
              {
                $project: {
                  _id: 0,
                  value: 1,
                },
              },
              {
                $group: {
                  _id: '$value',
                  counter: { $sum: 1 },
                },
              },
              {
                $group: {
                  _id: null,
                  ratingCounters: { $push: { value: '$_id', counter: '$counter' } },
                  sumRating: { $sum: { $multiply: ['$_id', '$counter'] } },
                  reviewsCount: { $sum: '$counter' },
                },
              },
              {
                $project: {
                  _id: 0,
                  ratingCounters: 1,
                  reviewsCount: 1,
                  // avgRating: { $divide: ['$sumRating', '$reviewsCount'] },
                  avgRating: { $round: [{ $divide: ['$sumRating', '$reviewsCount'] }, 1] },
                },
              },
            ],
          },
        },
      ],
      as: 'ratingAndReviews',
    },
  },
  {
    $addFields: {
      // 2 lvls up from [[]]
      ratingStats: {
        $arrayElemAt: [{ $arrayElemAt: ['$ratingAndReviews.ratingStats', 0] }, 0],
      },
      reviews: { $arrayElemAt: ['$ratingAndReviews.reviews', 0] },
      master: { $arrayElemAt: ['$master', 0] },
      favorites: { $arrayElemAt: ['$favorites.masters', 0] },
    },
  },
  {
    $project: {
      ratingAndReviews: 0,
    },
  },
  // ],
  //   },
  // },
];

export default profileAndReviews;
