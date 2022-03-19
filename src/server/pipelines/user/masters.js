const masters = (city) => [
  {
    $match: {
      role: 'master',
      city,
      'tools.isServices': true,
      'tools.isTimetable': true,
    },
  },
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
      _id: { $convert: { input: '$_id', to: 'string' } }, // for api we can omit it
      rating: { $round: [{ $arrayElemAt: ['$rating.rating', 0] }, 1] },
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
];

export default masters;
