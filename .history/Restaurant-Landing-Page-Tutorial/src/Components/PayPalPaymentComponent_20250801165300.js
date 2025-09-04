import React from 'react';
import { PayPalButtons } from 'react-paypal-button-v2';

const PayPalPaymentComponent = () => {
  const amount = 100;
    

  return (
    <div>
      <h2>Pay $100</h2>
      <PayPalButtons
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
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('Payment approved:', details);
          });
        }}
        style={{
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        }}
        fundingSource="paypal"
      />
      <PayPalButtons
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
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('Payment approved:', details);
          });
        }}
        style={{
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        }}
        fundingSource="card"
      />
    </div>
  )
}

export default PayPalPaymentComponent;