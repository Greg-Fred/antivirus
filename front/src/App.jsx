import './App.css';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm'

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
