import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const CreditCardPaymentComponent = () => {
  const amount = 100;

  return (
    <div>
      <h2>Pay $100</h2>
      <PayPalButton
        amount={amount}
        currency="USD"
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: amount,
                },
              },
            ],
          });
        }}
        onSuccess={(details, data) => {
          console.log('Payment approved:', details);
        }}
        onError={(error) => {
          console.error('Payment error:', error);
        }}
        onCancel={() => {
          console.log('Payment cancelled');
        }}
      />
    </div>
  );
};

export default PayPalPaymentComponent;