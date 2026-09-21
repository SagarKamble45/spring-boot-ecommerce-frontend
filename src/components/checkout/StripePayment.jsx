import { CurrencySelectorElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import PaymentForm from './PaymentForm';
import { useDispatch, useSelector } from 'react-redux';
import { createStripePaymentSecret } from '../../store/action';
import Spinner from '../Spinner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StripePayment() {
    const dispatch = useDispatch();
    const {clientSecret } = useSelector((state) => state.auth);
    const {totalPrice } = useSelector((state) => state.carts);
    const {isLoading, errorMessage} =  useSelector((state)=> state.errors);
    const {user, selectedUserCheckoutAddress} =  useSelector((state)=> state.auth);

    useEffect(()=>{
        if(!clientSecret){
            const sendData ={
                amount: Number(totalPrice),
                currency:"INR",
                email: user.email,
                name: `${user.username}`,
                address: selectedUserCheckoutAddress,
                description:`Order for ${user.email}`,
                metadata:{
                    test:"1"
                }
            };
            dispatch(createStripePaymentSecret(sendData));
        }
    },[clientSecret]);

    if(isLoading){
        return(
            <div className='max-w-lg mx-auto'>
                <Spinner />
            </div>
        )
    }

    console.log(selectedUserCheckoutAddress);
  return (
    <>
    {clientSecret && (
        
        <Elements stripe={stripePromise} options={{ clientSecret}}>
            <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>)}
    </>
  )
}

export default StripePayment