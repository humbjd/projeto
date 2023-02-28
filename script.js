function calcular() {
    // Obtem o valor da compra, o valor do FEE e o valor da taxa de embarque
    var valor = parseFloat(document.getElementById("valor").value);
    var fee = parseFloat(document.getElementById("fee").value);
    var taxa = parseFloat(document.getElementById("taxa").value);

    // Obtem a forma de pagamento selecionada
    var pagamento = document.getElementById("pagamento").value;

    // Define o endpoint da API e realiza a requisição
    var url = "https://api.exchangerate-api.com/v4/latest/USD";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Obtem a cotação do dólar
            var cotacao = data.rates.BRL;

            // Calcula o valor total de acordo com a forma de pagamento e os valores adicionais
            switch (pagamento) {
                case "avista":
                    var total = valor + fee + taxa;
                    break;
                case "cartao1":
                    var total = (valor * 1.0309) + fee + taxa;
                    break;
                case "cartao2":
                    var total = (valor * 1.0349) + fee + taxa;
                    break;
            }

            // Calcula o valor total em dólar
            var totalAPagar = total * cotacao;

            // Exibe o valor total na página
            document.getElementById("valorTotal").innerHTML = "USD$ " + total.toFixed(2);
            document.getElementById("valorDolar").innerHTML = "R$ " + totalAPagar.toFixed(2);
        })
        .catch(error => {
            // Exibe uma mensagem de erro caso a requisição falhe
            alert("Erro ao buscar a cotação do dólar!");
        });
}
