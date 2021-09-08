// with sessionTime
const masterAppointmentsAndCustomers = (masterId, status) => [
  {
    $match: {
      masterId,
      status,
    },
  },
  {
    $lookup: {
      from: "users",
      let: {
        customerId: "$customerId",
      },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$customerId"] } } },
        {
          $project: {
            _id: { $convert: { input: "$_id", to: "string" } },
            firstName: 1,
            lastName: 1,
            avatar: 1,
          },
        },
      ],
      as: "user",
    },
  },
  {
    $project: {
      masterId: 0,
      customerId: 0,
    },
  },
  {
    $addFields: {
      _id: { $convert: { input: "$_id", to: "string" } },
      user: { $arrayElemAt: ["$user", 0] },
      // date: { $convert: { input: "$date", to: "string" } },
      // createdAt: { $convert: { input: "$createdAt", to: "string" } },
      "service.update.date": { $convert: { input: "$service.update.date", to: "string" } },
    },
  },
  {
    $group: {
      _id: { $dateToString: { format: "%d-%m-%Y", date: "$date" } },
      appointments: {
        $push: {
          user: "$user",
          review: "$review",
          service: "$service",
          time: "$time",
          date: { $convert: { input: "$date", to: "string" } },
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      appointments: { $push: { k: "$_id", v: "$appointments" } },
    },
  },
  {
    $project: {
      _id: 0,
      appointments: { $arrayToObject: "$appointments" },
    },
  },
  { $replaceRoot: { newRoot: "$appointments" } },
];

export default masterAppointmentsAndCustomers;
