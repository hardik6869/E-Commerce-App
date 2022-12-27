import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import nProgress from "nprogress";
import { useState } from "react";
import styled from "styled-components";
import SickButton from "./styles/SickButton";

const CheckoutFromStyle = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe()
  
  const handleSubmit = async (e) => {
    // 1. Stop the form from submitting and turn the loader are
    e.preventDefault();
    setLoading(true);
    // 2. Start the page Transition
    nProgress.start();
    // 3. Create the payment method via stripe(Token come back here if Successfull)
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if(error){
      setError(error)
    }
    console.log(result);
    // 4. Handle any errors from stripe
    // 5. Send the token from step 3 to out keystone server, via a custom mutation!
    // 6. Change the page to view our order
    // 7. Close the cart
    // 8. Turn the loader off
    setLoading(false);
    nProgress.done()
  };
  return (
    <CheckoutFromStyle onSubmit={handleSubmit}>
      {error && <p style={{fontSize:12}}> {error.message} </p>}
      <CardElement />
      <SickButton> Check Out Now </SickButton>
    </CheckoutFromStyle>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
