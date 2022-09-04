const form = {
  name: document.getElementById('card-holder'),
  cardNumber: document.getElementById('card-number'),
  cvv: document.getElementById('cvv'),
  expireMonth: document.getElementById('ccmonth'),
  expireYear: document.getElementById('ccyear'),
  submit: document.getElementById('btn-submit'),
  messages: document.getElementById('form-messages'),
};

form.submit.addEventListener('click', () => {
  const request = new XMLHttpRequest();

  request.onload = () => {
    let responseObject = null;

    try {
      responseObject = JSON.parse(request.responseText);
    } catch (e) {
      console.error('Could not parse JSON!');
    }

    if (responseObject) {
      handleResponse(responseObject);
    }
  };

  const requestData = {
    name: form.name.value,
    number: form.cardNumber.value,
    cvv: form.cvv.value,
    expiresOn: {
      month: form.expireMonth.value,
      year: form.expireYear.value,
    },
  };

  request.open('post', 'http://localhost:3000/api/credit-card');
  request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify(requestData));
});

function handleResponse(responseObject) {
  if (responseObject.success) {
    window.alert('Your credit card information has been submitted!');
  } else {
    window.alert(`Credit card info couldn't be submitted. Please retry.`); // Can be configured to display more specific error messages
  }
}
