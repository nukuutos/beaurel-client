const masters = (matchQuery) => [
  {
    $match: matchQuery,
  },
  {
    $project: {
      firstName: 1,
      lastName: 1,
      avatar: 1,
      placeOfwork: 1,
    },
  },
  {
    $limit: 10,
  },
  // rating
  {
    $lookup: {
      from: "reviews",
      let: {
        masterId: "$_id",
      },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$masterId", "$$masterId"] },
          },
        },
        {
          $project: {
            _id: 0,
            rating: { $avg: "$value" },
          },
        },
      ],
      as: "rating",
    },
  },

  {
    $addFields: {
      // rating: { $arrayElemAt: ['$rating.rating', 0] },
      rating: { $round: [{ $arrayElemAt: ["$rating.rating", 0] }, 1] },
    },
  },
];

export default masters;
