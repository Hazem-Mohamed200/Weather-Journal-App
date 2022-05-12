let date = new Date();
let goodFormatDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

const apiKey = '&appid=87f817a605d02d97f5f925d6667d95af';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?id=';


document.getElementById('generate').addEventListener('click', function(){
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getWeatherData(baseUrl, zipCode, apiKey).then(function(data){
    console.log(data);
    postData('/postRoute', {date: goodFormatDate, city: data.name, temperature: data.main.temp, feeling: feeling});
    updateUI();
    });    
})



const getWeatherData = async (url, zip, key) => {
    
    const response = await fetch(url + zip + key);
    console.log(response);

    if(response.status === 404)
        invalidZipCode();
    else
        validZipCode();

    try{
        return response.json();// The weather data returned from the API

    }catch(error){
        console.log('Error: ' + error);    
    }
}

const postData = async (url = '', data = {}) => {

    console.log(data);
    const response = await fetch(url, {
        method : 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try{
        return response.json();
    }catch(error){
        console.log('Error: ' + error);
    }
}

const updateUI = async () => {

    const request = await fetch('/getRoute');
    try{
        
        const data = await request.json();
        console.log(data);
        document.getElementById('date').textContent = `Date: ${data[0].date}`;
        document.getElementById('city').textContent = `City: ${data[0].city}`;
        document.getElementById('content').textContent = `Feeling: ${data[0].feeling}`;
        document.getElementById('temp').textContent = `Temperature: ${Math.round(data[0].temperature)} degrees`;


    }catch(error){
        console.log('Error: ' + error);
    }

}

const invalidZipCode = () => {

    alert('Invalid Zip Code');
    const zip = document.getElementById('zip');
    zip.classList.add('invalid');
    zip.classList.remove('valid');

}

const validZipCode = () => {

    const zip = document.getElementById('zip');
    zip.classList.remove('invalid');
    zip.classList.add('valid');
}