import { getOrderSign, getQuerySign } from './signTools.js';
import axios from 'axios';
import { format, addDays } from 'date-fns';

/**
 * @description 查询场地
 * @param {dayOffset,netUserId,fieldType,apiKey} value
 */

export const queryVenue = async (value) => {
  const { dayOffset, netUserId, fieldType, apiKey } = value;
  const baseURL =
    'https://web.xports.cn/aisports-api/wechatAPI/venue/fieldList';

  const now = new Date();
  const timestamp = now.getTime();
  const day = format(addDays(now, dayOffset), 'yyyyMMdd');
  const querySign = getQuerySign(
    timestamp,
    fieldType,
    parseInt(day),
    netUserId
  );

  const url = `${baseURL}?apiKey=${apiKey}&timestamp=${timestamp}&channelId=11&netUserId=${netUserId}&serviceId=1002&venueId=4201110002&day=${day}&selectByfullTag=0&centerId=42011100&associationTag=0&fieldType=${fieldType}&tenantId=24&sign=${querySign}`;

  const headers = {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x18003237) NetType/WIFI Language/zh_CN',
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(url, { headers });

    if (response.data.fieldList) {
      return response.data.fieldList;
    }
  } catch (error) {
    console.error('Error querying venue:', error);
    throw error; // 处理错误
  }
};

/**
 *
 * @description 提交订单
 * @param {dayOffset,fieldType,netUseId,fieldType,apiKey} value
 */

export const submitOrder = async (value) => {
  const { dayOffset, fieldType, netUserId, fieldInfo, apiKey } = value;

  const baseURL = 'https://web.xports.cn/aisports-api/wechatAPI/order/newOrder';

  const now = new Date();

  const timestamp = now.getTime();

  const day = format(addDays(now, dayOffset), 'yyyyMMdd');

  const url = `${baseURL}?apiKey=${apiKey}&timestamp=${timestamp}&channelId=11&venueId=4201110002&serviceId=1002&centerId=42011100&day=${day}&associationTag=0&fieldType=${fieldType}&fieldInfo=${fieldInfo}&ticket=&randStr=&checkToken=&id=&netUserId=${netUserId}&tenantId=24`;

  const querySign = getOrderSign(
    timestamp,
    fieldType,
    parseInt(day),
    fieldInfo,
    netUserId
  );

  const finalUrl = `${url}&sign=${querySign}`;

  const headers = {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x18003237) NetType/WIFI Language/zh_CN',
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(finalUrl, { headers });
    console.log(response.data); // 打印响应内容
  } catch (error) {
    console.error('Error submitting order:', error.message);
  }
};
