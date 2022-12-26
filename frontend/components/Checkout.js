import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components"
import SickButton from "./styles/SickButton";

const CheckoutFromStyle = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.06);
    border-radius:5px;
    padding:1rem;
    display:grid;
    grid-gap:1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
const handleSubmit = (e) => {
    e.preventDefault();
}

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
    <CheckoutFromStyle onSubmit={handleSubmit}>
  <CardElement />
  <SickButton> Check Out Now </SickButton>
    </CheckoutFromStyle>
    </Elements>
  )
}

export default Checkout