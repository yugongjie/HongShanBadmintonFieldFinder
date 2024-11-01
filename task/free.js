import {
  apiKey,
  freeDayOffset,
  freeFieldType,
  netUserId,
} from '../constants.js';
import { queryVenue, submitOrder } from '../services.js';

const submitRound = 5;

export const freeTask = async () => {
  let queryResult = null;
  while (!queryResult || queryResult.length === 0) {
    queryResult = await queryVenue({
      dayOffset: freeDayOffset,
      netUserId: netUserId,
      fieldType: freeFieldType,
      apiKey: apiKey,
    });
  }

  // 记录提交结果信息
  const submitOrderRes = [];

  for (let i = 0; i < submitRound; i++) {
    queryResult.forEach(async (fieldItem) => {
      const fieldSegmentId = fieldItem.fieldSgementList[0].fieldSegmentId;

      const res = await submitOrder({
        dayOffset: freeDayOffset,
        fieldType: 1710,
        netUseId: netUserId,
        fieldInfo: fieldSegmentId,
        apiKey: apiKey,
      });

      submitOrderRes.push({
        fieldSegmentId,
        res,
      });
    });
  }
};
