import 'dayjs/locale/zh-tw';
import dayjs from 'dayjs';
dayjs.locale('zh-tw');

export default function () {
  const nowDataTime = dayjs();

  const nowToISO = date => (date ? date.toISOString() : '');

  const dateFormat = (date, formet = 'YYYY/MM/DD') => (date ? dayjs(date).format(formet) : null);

  return {
    dateFormat,
    nowToISO,
    nowDataTime
  };
}
