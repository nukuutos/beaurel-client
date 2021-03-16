// without sessionTime
// const services = (masterId) => [
//   { $match: { masterId } },
//   {
//     $facet: {
//       // get services with params
//       servicesParameter: [
//         {
//           $match: {
//             $expr: { $ne: ['$parameter', null] },
//           },
//         },
//         {
//           $group: {
//             _id: '$title',
//             title: { $first: '$title' },
//             order: { $first: '$order' },
//             subServices: {
//               $push: {
//                 // id: '$_id',
//                 id: { $convert: { input: '$_id', to: 'string' } },
//                 parameter: '$parameter',
//                 duration: '$duration',
//                 price: '$price',
//                 subOrder: '$subOrder',
//               },
//             },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//           },
//         },
//       ],
//       // services without params
//       services: [
//         {
//           $match: {
//             $expr: { $eq: ['$parameter', null] },
//           },
//         },
//         {
//           $addFields: {
//             id: { $convert: { input: '$_id', to: 'string' } },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             masterId: 0,
//             parameter: 0,
//           },
//         },
//       ],
//     },
//   },
//   // concat seriveces with params and without
//   {
//     $project: { services: { $concatArrays: ['$servicesParameter', '$services'] } },
//   },

//   // {
//   //   $project: {
//   //     // _id: 0,
//   //     // timetable: 1,
//   //     // services: { $arrayElemAt: ['$servicesArray', 0] },
//   //   },
//   // },
// ];

// with sessionTime
const services = (masterId) => [
  { $match: { masterId } },
  {
    $project: {
      masterId: 1,
      timetable: {
        sessionTime: '$sessionTime',
        update: '$update',
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
                      parameter: '$parameter',
                      duration: '$duration',
                      price: '$price',
                      subOrder: '$subOrder',
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
];

export default services;
