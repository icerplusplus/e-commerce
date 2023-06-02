import currencyFormatter from 'currency-formatter';

export const currency = (price: number) =>
  currencyFormatter.format(price, {locale: 'vn-VN'});
