export const formatCurrentDate = () => {
  const uzbekMonths = [
    'yanvar',
    'fevral',
    'mart',
    'aprel',
    'may',
    'iyun',
    'iyul',
    'avgust',
    'sentabr',
    'oktabr',
    'noyabr',
    'dekabr',
  ];
  const uzbekDays = [
    'Dushanba',
    'Seshanba',
    'Chorshanba',
    'Payshanba',
    'Juma',
    'Shanba',
    'Yakshanba',
  ];

  // Get current date and time
  const now = new Date();

  // Format the date and time
  const formattedDateTime = `${now.getDate()}-${
    uzbekMonths[now.getMonth()]
  } ${now.getFullYear()}-yil. ${uzbekDays[now.getDay()]} ${String(now.getHours()).padStart(
    2,
    '0'
  )}:${String(now.getMinutes()).padStart(2, '0')}`;

  return formattedDateTime;
};
