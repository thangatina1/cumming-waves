import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

const PayPalPaymentComponent = () => {
  const amount = 100;
    

  return (
    <div>
      <h2>Pay $100</h2>
      
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