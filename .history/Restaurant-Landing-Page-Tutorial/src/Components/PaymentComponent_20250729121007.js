import React, { useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const PaymentComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState(0);
  const [autoPay, setAutoPay] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAutoPayChange = (event) => {
    setAutoPay(event.target.checked);
  };

  const handlePayPalPayment = (payment) => {
    axios.post('/api/paypal-payment', {
      payment: payment,
      amount: amount,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStripePayment = (token) => {
    axios.post('/api/stripe-payment', {
      token: token,
      amount: amount,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Payment Method</h2>
      <select value={paymentMethod} onChange={handlePaymentMethodChange}>
        <option value="">Select a payment method</option>
        <option value="paypal">PayPal</option>
        <option value="stripe">Credit/Debit Card</option>
      </select>

      <h2>Amount</h2>
      <input type="number" value={amount} onChange={handleAmountChange} />

      <h2>Auto-Pay</h2>
      <input type="checkbox" checked={autoPay} onChange={handleAutoPayChange} />

      {paymentMethod === 'paypal' && (
        <PayPalButton
          amount={amount}
          onSuccess={handlePayPalPayment}
          onCancel={() => console.log('Payment cancelled')}
        />
      )}

      {paymentMethod === 'stripe' && (
        <StripeCheckout
          token={handleStripePayment}
          amount={amount * 100}
          currency="USD"
          stripeKey="YOUR_STRIPE_KEY"
        />
      )}
    </div>
  );
};

export default PaymentComponent;