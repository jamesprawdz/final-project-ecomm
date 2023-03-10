// import React from 'react'
// import { injectStripe } from 'react-stripe-elements'

// class PaymentForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       amount: '',
//     };
//   }

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     // Use the Stripe object injected into props to create a payment token
//     const { stripe } = this.props;
//     const { token, error } = await stripe.createToken({ type: 'card' });

//     // Handle any errors returned by Stripe
//     if (error) {
//       console.error(error);
//       return;
//     }

//     // Send the payment token and amount to your Rails backend to create a charge
//     const response = await fetch('/charges', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token: token.id, amount: this.state.amount }),
//     });

//     // Handle the response from your backend
//     const data = await response.json();
//     console.log(data);
//   };

//   handleAmountChange = (event) => {
//     this.setState({ amount: event.target.value });
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Amount:
//           <input
//             type="text"
//             value={this.state.amount}
//             onChange={this.handleAmountChange}
//           />
//         </label>
//         <label>
//           Card details:
//           <CardElement />
//         </label>
//         <button type="submit">Pay</button>
//       </form>
//     );
//   }
// }

// export default injectStripe(PaymentForm);
