let url='https://api.coincap.io/v2/assets';

function getData(size=50) {
    return fetch(url + "?limit=" + size.toString())
        .then(response => response.json())
}

export default getData;