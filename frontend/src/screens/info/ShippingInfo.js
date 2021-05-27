import React from 'react';
import { Link } from 'react-router-dom';

const ShippingInfo = () => {
    return (
        <div className="shipping container-sm">
            <h2>Доставка</h2>
            <div className="shipping__title">
                <img src="https://www.bezpeka-shop.com/local/templates/main/images/services/footer_delivery_np.png" alt="icon"></img>
                <span className="shipping__title-h3">Доставка по Украине</span>
            </div>
            <p><strong>Доставка по Украине</strong> осуществляется транспортной компанией <strong>Новая Почта</strong> до отделения.</p>

            <div className="shipping__text">
                Стоимость:
                <ul>
                    <li><span>Доставка заказов на сумму от 1000 грн. производится бесплатно за счет отправителя;</span></li>
                    <li><span>Доставка заказов на сумму до 1000 грн. оплачивается получателем, согласно тарифам транспортной компании.</span></li>
                    <li><span>В случае выбора способа оплаты «наложенный платеж» комиссию за перевод денежных средств оплачивает получатель.</span></li>
                    <li><span>Cтоимость доставки габаритных/тяжелых товаров оговаривается с менеджером при заказе.</span></li>
                </ul>
            </div>

            <div className="shipping__text">
                Сроки доставки:
                <ul>
                    <li><span>Oтправка в день заказа при условии оформления заказа до 11.00 и наличии заказанного товара в офисе Гипермаркет БЕЗОПАСНОСТИ;</span></li>
                    <li><span>Отправка в течение 1-3 дней при условии наличия заказанного товара на складе Гипермаркет БЕЗОПАСНОСТИ (просьба уточнять наличие у менеджера).</span></li>
                </ul>
            </div>

            <div className="shipping__title">
                <img src="https://www.bezpeka-shop.com/local/templates/main/images/services/footer_pick_up.png" alt="icon"></img>
                <span className="shipping__title-h3">Самовывоз из Сум</span>
            </div>

            <p>Закажите на сайте – заберите в удобное время. </p>

            <button className="shipping__button">
                <Link to="/contacts">Контакты</Link>
            </button>
        </div>
    );
};

export default ShippingInfo;