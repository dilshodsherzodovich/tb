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
  } ${now.getFullYear()}-yil. ${uzbekDays[now.getDay() - 1]} ${String(now.getHours()).padStart(
    2,
    '0'
  )}:${String(now.getMinutes()).padStart(2, '0')}`;

  return formattedDateTime;
};

export function isoToCustomFormat(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
