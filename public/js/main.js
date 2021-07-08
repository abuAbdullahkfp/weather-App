
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  messageOne.textContent = 'Loading.....'
  messageTwo.textContent = ''
  const location = search.value
  fetch(`/weather?address=${encodeURIComponent(location)}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageTwo.textContent = ''
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = ''
          search.value = "";
          messageTwo.innerHTML = `
          <li>Forecast: ${data.forecast}</li>
          <li>Location: ${data.location}</li>
          `;
        }
      });
    }
  );
})


  