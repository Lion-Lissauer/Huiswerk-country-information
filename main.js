const dataForm = document.querySelector("form");
const searchfield = document.querySelector(".search-field")

async function fetchData() {
    try {
        const inputCountry = document.getElementById("input-country").value;
        const result = await axios.get('https://restcountries.eu/rest/v2/name/'+inputCountry);
        console.log(document.getElementById("input-country"));
        let resultSet;
        resultSet = "<div><img src='"+result.data[0].flag+"' alt=''></div>"
        resultSet += "<div>" + result.data[0].name + "</div>";
        resultSet += "<div>" + result.data[0].name + " is situated in " + result.data[0].subregion + ". It has a population of " + result.data[0].population + " people." + "</div>";
        resultSet += "<div>" + "The capital is " + result.data[0].capital + valuta(result.data[0].currencies) + "s" + "</div>";
        resultSet += "<div>" + languages(result.data[0].languages) + "</div>";
        const currencies = valuta(result.data[0].currencies);
        const language = languages(result.data[0].languages)
        searchfield.innerHTML = resultSet;
        document.getElementById("input-country").value = "";
        console.clear();
    } catch (error) {
        console.error(error);
        console.log("unknown");
    }
}

function valuta (array) {
    if (array.length === 1) {
        return " and you can pay with " + array[0].name;
    } else return " and you can pay with " + array[0].name + " or " + array[1].name;
}

function languages (array) {
    if (array.length === 1) {
        return "They speak " + array[0].name;
    } else if (array.length === 2) {
        return "They speak " + array[0].name + " and " + array[1].name;
    } else {
        return "They speak " + array[0].name + ", " + array[1].name + " and " + array[2].name;
    }
}

dataForm.addEventListener("submit", function(e) {
    e.preventDefault();

    fetchData();
});
