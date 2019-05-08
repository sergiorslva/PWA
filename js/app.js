document.addEventListener('DOMContentLoaded', function(){        
    getDataWeather();    
})

function getDataWeather(){            

    card = document.querySelector('#cards-weather');

    const fragment = document.createDocumentFragment();

    temperatures.forEach(temperature => {
        const div = document.createElement('div');
        div.className = "card";

        const img = document.createElement('img');
        img.setAttribute("src", "../images/icons/icon-32x32.png")

        const city = document.createElement('span');
        city.className = "city";
        city.textContent = temperature.city

        const value = document.createElement('span');
        value.className = "value";
        value.textContent = temperature.value;


        div.appendChild(img);
        div.appendChild(city);
        div.appendChild(value);
    
        fragment.appendChild(div);        
    }); 
    
    card.appendChild(fragment);             
}

temperatures = [
    {
        id: 1, 
        city: "Campinas",
        value: 34
    },
    {
        id: 2, 
        city: "Valinhos",
        value: 37
    },
    {
        id: 2, 
        city: "Vinhedo",
        value: 32
    },
    {
        id: 2, 
        city: "Sumaré",
        value: 35
    }     
]