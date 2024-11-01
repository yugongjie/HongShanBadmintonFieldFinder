import {
  apiKey,
  netUserId,
  paidDayOffset,
  paidFieldType,
} from '../constants.js';

import { queryVenue, submitOrder } from '../services.js';

export const paidTask = async () => {
  let queryResult = null;
  while (!queryResult || queryResult.length === 0) {
    queryResult = await queryVenue({
      dayOffset: paidDayOffset,
      netUserId: netUserId,
      fieldType: paidFieldType,
      apiKey: apiKey,
    });
  }

  console.log('查询付费场地', queryResult);

  queryResult.forEach((item, index) => {
    if (index === 13) {
      console.log('场地信息', item);
    }
  });

  const submitOrderRes = [];

  queryResult.forEach(async (fieldItem) => {
    const fieldSgementList = fieldItem.fieldSgementList;
    const fieldSgement1 = fieldSgementList.at(-3);
    // const fieldSgement2 = fieldSgementList.at(-2);
    // const info = `${fieldSgement1.fieldSegmentId},${fieldSgement2.fieldSegmentId}`;
    const info = `${fieldSgement1.fieldSegmentId}`;

    const res = await submitOrder({
      dayOffset: paidDayOffset,
      fieldType: paidFieldType,
      netUserId: netUserId,
      fieldInfo: info,
      apiKey: apiKey,
    });

    submitOrderRes.push({
      info,
      res,
    });
  });

  //   for (const fieldItem of queryResult) {
  //     const fieldSgementList = fieldItem.fieldSgementList;
  //     const fieldSgement1 = fieldSgementList.at(-1);
  //     const fieldSgement2 = fieldSgementList.at(-2);
  //     const info = `${fieldSgement1.fieldSegmentId},${fieldSgement2.fieldSegmentId}`;

  //     await submitOrder({
  //       dayOffset: paidDayOffset,
  //       fieldType: paidFieldType,
  //       netUseId: netUserId,
  //       fieldInfo: info,
  //       apiKey: apiKey,
  //     });
  //   }
};
