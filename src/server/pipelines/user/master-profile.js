const REVIEWS_LIMIT = 10;

const profileAndReviews = (masterMatchQuery, userId = null) => [
  {
    $facet: {
      tools: [
        {
          $match: {
            _id: userId,
          },
        },
        { $project: { _id: 0, tools: 1 } },
      ],
      // get masters
      favorites: [
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
      // get profile with reviews
      master: [
        {
          $match: masterMatchQuery,
        },
        {
          $project: {
            password: 0,
            isConfirmed: 0,
            createdAt: 0,
            masters: 0,
            phone: 0,
            wasOnline: 0,
            confirmation: 0,
            resetPassword: 0,
          },
        },
      ],
    },
  },
  {
    $addFields: {
      globalData: {
        tools: { $arrayElemAt: ['$tools.tools', 0] },
        notifications: { $arrayElemAt: ['$notifications', 0] },
        favorites: { $arrayElemAt: ['$favorites.masters', 0] },
      },

      master: { $arrayElemAt: ['$master', 0] },
    },
  },
  {
    $project: {
      tools: 0,
      notifications: 0,
      favorites: 0,
    },
  },
  // get review stats(avg, review counters by value, reviews)
  {
    $lookup: {
      from: 'reviews',
      let: {
        // masterId,
        masterId: '$master._id',
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
              { $sort: { createdAt: -1 } },
              { $limit: REVIEWS_LIMIT },
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
                        _id: { $convert: { input: '$_id', to: 'string' } },
                        role: 1,
                        username: 1,
                        firstName: 1,
                        lastName: 1,
                        isAvatar: 1,
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
      ratingStats: {
        $arrayElemAt: [{ $arrayElemAt: ['$ratingAndReviews.ratingStats', 0] }, 0],
      },
      reviews: { $arrayElemAt: ['$ratingAndReviews.reviews', 0] },
      'master.id': { $convert: { input: '$master._id', to: 'string' } },
    },
  },
  {
    $project: {
      ratingAndReviews: 0,
      'master._id': 0,
    },
  },
];

export default profileAndReviews;
