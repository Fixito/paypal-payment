import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

import Message from './Message.jsx';

const initialOptions = {
  'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
  'enable-funding': 'venmo',
  'disable-funding': '',
  'buyer-country': 'FR',
  currency: 'EUR',
  'data-page-type': 'product-details',
  components: 'buttons',
  'data-sdk-integration-source': 'developer-studio',
};

function App() {
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const amountRef = useRef(null);

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  const createOrder = async () => {
    try {
      const { data: orderData } = await axios.post('/api/v1/orders', {
        total: amountRef.current,
      });

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const { data: orderData } = await axios(
        `/api/v1/orders/${data.orderID}/capture`
      );

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );
        console.log(
          'Capture result',
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      setMessage(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  return (
    <main className='section'>
      <div className='form'>
        <h1>Me récompenser</h1>
        <div className='form-row'>
          <label htmlFor='amount' className='form-label'>
            Insérer le montant de votre donation :
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            className='form-input'
            min='0'
            step='.1'
            placeholder='0'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: 'rect',
              layout: 'horizontal',
              color: 'gold',
              label: 'donate',
            }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
        <Message content={message} />
      </div>
    </main>
  );
}

export default App;
