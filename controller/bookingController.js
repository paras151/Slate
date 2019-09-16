const stripe = require('stripe')('sk_test_MgFRWqSGP7RlXOY2Tn7fs1V900KzGb6WvH');

const planModel = require("../model/planModel");

module.exports.getCheckout = async (req,res)=>{
    var id = req.params["id"];

    const plan = await planModel.findById(id);
    
    (async () => {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            name: `${plan.name}`,
            description: `${plan.description}`,
            // images: ['https://example.com/t-shirt.png'],
            amount: 500,
            currency: 'usd',
            quantity: 1,
          }],
          success_url: 'http://localhost:3000/home',
          cancel_url: 'http://localhost:3000/login',
        });
        res.status(201).json(
            session
        );
        
      })();

}



