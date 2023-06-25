import React, {useState} from 'react';
import { API_VERSION } from '../constant/index';
import { loadStripe } from "@stripe/stripe-js";
import axios from '../axios/Axios';
import Cookie from '../uti/Cookie';
const useStripePayment = (initialValue, loadingValue) => {

    const [stripePayment, setStripePayment] = useState(initialValue);
    const [loading, setLoading] = useState(loadingValue);
    const user = Cookie.getUser();
    let publicKey = "";
  
    if (process.env.REACT_APP_STAGE === 'local'){
        const public_keyTest = process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY
        publicKey = public_keyTest
    }else{
        const livePublicKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
        publicKey = livePublicKey
    }
   
    // const [product, setProduct] = useState({
    //     name: "Pro",
    //     price: 8,
    //     productOwner: "Taskkru",
    //     description:
    //         "This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
    //     quantity: 1,
    // });
    const makePayment = async () => {
        setLoading(true)
        const stripe = await loadStripe(publicKey);
        // const body = { product };
        const body = { userId: user?.userId}
        try {
            let response = await axios.post(`${API_VERSION}/create-checkout-session`, body)
            const session = response;;
            const result = stripe.redirectToCheckout({
                sessionId: session?.data?.id,
            });
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };
    return [stripePayment, makePayment, loading]
};

export default useStripePayment;
