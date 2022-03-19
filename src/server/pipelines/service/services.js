// with sessionTime
const services = (masterId) => [
  { $match: { masterId } },
  {
    $project: {
      masterId: 1,
      timetable: {
        sessionTime: '$sessionTime',
        // update: { date: '$update.date', sessionTime: '$update.sessionTime' },
        update: {
          date: {
            $convert: {
              input: '$update.date',
              to: 'string',
            },
          },
          sessionTime: '$update.sessionTime',
        },
      },
    },
  },
  {
    $lookup: {
      from: 'services',
      let: {
        masterId,
      },
      pipeline: [
        { $match: { $expr: { $eq: ['$masterId', '$$masterId'] } } },
        {
          $facet: {
            // get services with params
            servicesParameter: [
              {
                $match: {
                  $expr: { $ne: ['$parameter', null] },
                },
              },
              {
                $group: {
                  _id: '$title',
                  title: { $first: '$title' },
                  order: { $first: '$order' },
                  subServices: {
                    $push: {
                      id: { $convert: { input: '$_id', to: 'string' } },
                      // id: '$_id',
                      parameter: '$parameter',
                      duration: '$duration',
                      price: '$price',
                      subOrder: '$subOrder',
                      update: {
                        date: { $toString: '$update.date' },
                        status: '$update.status',
                        duration: '$update.duration',
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                },
              },
            ],
            // services without params
            services: [
              {
                $match: {
                  $expr: { $eq: ['$parameter', null] },
                },
              },
              {
                $addFields: {
                  id: { $convert: { input: '$_id', to: 'string' } },
                  update: { date: { $toString: '$update.date' } },
                },
              },
              {
                $project: {
                  _id: 0,
                  masterId: 0,
                  parameter: 0,
                },
              },
            ],
          },
        },
        // concat seriveces with params and without
        {
          $project: { servicesArray: { $concatArrays: ['$servicesParameter', '$services'] } },
        },
      ],
      as: 'services',
    },
  },
  {
    $project: {
      _id: 0,
      timetable: 1,
      services: { $arrayElemAt: ['$services.servicesArray', 0] },
    },
  },
  // notifications
  {
    $lookup: {
      from: 'appointments',
      let: {
        userId: masterId,
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
        userId: masterId,
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
      },
    },
  },
  {
    $project: {
      messages: 0,
      appointments: 0,
    },
  },
];

export default services;
