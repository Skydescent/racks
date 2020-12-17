import React from 'react';
import PopupOrderForm from './PopupOrderForm';

const Total = ({ total, deliveryType }) => {
  const deliveryTitle = {
    self_delivery: 'Стеллаж в наличии',
    daytime: 'Доставим к определенному времени',
    evening: 'Доставим с 17:00 до 20:00, по городу до подъезда бесплатно',
  }[deliveryType];
  return (
    <div className="price">
      <div>
        <span className="js-total">{total}</span> &#8381;
        <input type="hidden" value={total} name="total" />
      </div>
      <div className="payment-comment">{deliveryTitle}</div>
      <div className="order">
        <PopupOrderForm />
      </div>
    </div>
  );
};

export default Total;
