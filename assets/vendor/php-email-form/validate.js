(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      let thisForm = this;
      let action = thisForm.getAttribute('action'); // Get the form action

      // Check if the action attribute is set
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show the loading indicator and hide any previous messages
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm); // Prepare form data

      // Call the function to submit the form via AJAX
      php_email_form_submit(thisForm, action, formData);
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    .then(response => {
      if (response.ok) {
        return response.text(); // If the response is OK, process the response text
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`);
      }
    })
    .then(data => {
      console.log('Response:', data); // Debugging: log response
      thisForm.querySelector('.loading').classList.remove('d-block'); // Hide the loading indicator

      if (data.trim() === 'OK') {
        // If the server returns 'OK', show the success message and reset the form
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        // Display error message returned from the server
        displayError(thisForm, data);
      }
    })
    .catch((error) => {
      // If there is an error, display the error message
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block'); // Hide the loading indicator
    thisForm.querySelector('.error-message').innerHTML = error; // Show the error message
    thisForm.querySelector('.error-message').classList.add('d-block'); // Display the error message
  }
})();