let url='https://api.coincap.io/v2/assets';

function getData() {
    return fetch(url)
        .then(response => response.json())
}


export default getData;