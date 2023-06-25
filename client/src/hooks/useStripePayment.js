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
        const public_keyTest = "pk_test_51McF1jEHMSSFUM4oN3TEldrqEvncNMzwE4dsPn0yrQOCLV4nDrt6SDtNyPcn8E91pCSWgAU00PCJlJQgKes8bOaD00ImS9XRmF";
        publicKey = public_keyTest
    }else{
        const livePublicKey = "pk_live_51McF1jEHMSSFUM4oUOymcB4bgrrAQlHAuDF92t2gp4gTV1jr00bbUO8LNB6ehO1FhaFL1yCiT11ac0Fqq3Jo5y7s00wS13lJhO"
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
