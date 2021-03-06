const renderTime = (dateStr) => {
    if (!/T/.test(dateStr)) return new Date(dateStr);
    const ymd = dateStr.split('T')[0];
    const his = dateStr.split('T')[1].split('.')[0];
    const currentDate = `${ymd.replace(/-/g, '/')} ${his}`;
    return new Date(new Date(currentDate).getTime() + 8 * 60 * 60 * 1000);
  }
  // 日期格式化
  export const dateFormat = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    if (!date) return '';
    if (typeof date === 'string') {
      // date = new Date(date.replace(/-/g, '/'));
      date = renderTime(date);
    }
    if (typeof date === 'number') {
      date = new Date(date);
    }
    const o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };
    const week = {
      0: '\u65e5',
      1: '\u4e00',
      2: '\u4e8c',
      3: '\u4e09',
      4: '\u56db',
      5: '\u4e94',
      6: '\u516d'
    };
    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '')
        + week[`${date.getDay()}`]
      );
    }
    Object.keys(o).map(k => {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
      }
    });
    return fmt;
  };