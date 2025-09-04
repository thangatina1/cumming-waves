import React from 'react';
import { PayPalButton, CreditCardButton } from 'react-paypal-button-v2';

const PayPalPaymentComponent = () => {
  const amount = 100;
    const handlePayment = (data, actions) => {
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
      },
    });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log('Payment approved:', details);
    });
  };

  return (
    <div>
      <h2>Pay $100</h2>
       {/* <CreditCardButton
        amount={amount}
        currency="USD"
        createPayment={(data, actions) => handlePayment(data, actions)}
        onApprove={(data, actions) => handleApprove(data, actions)}
      /> */}
      {/* <PayPalButton
        amount={amount}
        onSuccess={(details, data) => {
          console.log(details, data);
        }}
        onError={(error) => {
          console.error(error);
        }}
        onCancel={() => {
          console.log('Payment cancelled');
        }}
      /> */}
    </div>
  );
}

export default PayPalPaymentComponent;