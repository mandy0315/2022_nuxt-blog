import 'dayjs/locale/zh-tw';
import dayjs from 'dayjs';
dayjs.locale('zh-tw');

export default function () {
  const nowToISO = dayjs().toISOString();
  return {
    nowToISO
  };
}
