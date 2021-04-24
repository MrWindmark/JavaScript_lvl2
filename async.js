// function makeGETRequest(url, callback) {
//     var xhr;
  
//     if (window.XMLHttpRequest) {
//       xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) { 
//       xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }
  
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         callback(xhr.responseText);
//       }
//     }
  
//     xhr.open('GET', url, true);
//     xhr.send();
//   }
// ********************************************************

// а вот это уже я пытался разобраться, и оно работает
const makeGETRequest = (myUrl) => {
    fetch(myUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch (err => {console.info('Erron:', err, 'URL:', myUrl)})
        .then(result => {console.info('Result value:', result, 'URL:', myUrl)})
}

const urlAPI = 'https://jsonplaceholder.typicode.com/todos/';
const urlAPI2 = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';

makeGETRequest(urlAPI);
makeGETRequest(urlAPI2);