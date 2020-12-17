import React from 'react';
import Popup from 'reactjs-popup';

export default () => (
  <Popup trigger={<a href="#order">Заказать</a>} modal nested>
    {close => (
      <div className="modal">
        <button type="button" className="close" onClick={close}>
          &times;
        </button>
        <form className="form ajax_form" name="order_form">
          <div className="popup_header">Отправка заказа</div>

          <input
            type="phone"
            name="phone"
            maxLength="30"
            placeholder="Контактный телефон"
          />
          <p>
            <em>и/или</em>
          </p>
          <input
            type="email"
            name="mail"
            maxLength="30"
            placeholder="Электронная почта"
          />
          <textarea
            name="comment"
            placeholder="Комментарий к заказу"
            rows="3"
          />
          <input type="hidden" name="action" value="order" />
          <input
            type="submit"
            value="Отправить"
            name="submit"
            className="sbmt"
          />
        </form>
      </div>
    )}
  </Popup>
);
