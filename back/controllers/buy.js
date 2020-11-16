
// exports.checkoutProduct1 = function () {
//   var stripe = Stripe("pk_test_51HkSdNDXZyAsNyKOasOLrBiGaAbgoxHb8WzeD1fMyxhcFHXEWOOnKIuUAb0GR9LB5h3BsVkEUB38RcNVvZrk8WOd00OfoO2PLu");
//   var checkoutButton = document.getElementById("checkout-button");
//   checkoutButton.addEventListener("click", function () {
//     fetch("/buy/product1/create-session", {
//       method: "POST",
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (session) {
//         return stripe.redirectToCheckout({ sessionId: session.id });
//       })
//       .then(function (result) {
//         // If redirectToCheckout fails due to a browser or network
//         // error, you should display the localized error message to your
//         // customer using error.message.
//         if (result.error) {
//           alert(result.error.message);
//         }
//       })
//       .catch(function (error) {
//         console.error("Error:", error);
//       });
//   });
// }



