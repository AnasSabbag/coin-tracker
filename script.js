
document.addEventListener("DOMContentLoaded",function(){
  let coinsArray;
  async function getData() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      coinsArray=json;
      displayData(json)
    } catch (error) {
      console.error(error.message);
    }
  }
  getData();
  
  function displayData(data){
    
    
    let rows = document.getElementById("table-body")
    
    rows.innerHTML=``;

    data.forEach((item,_index)=>{
      
      rows.innerHTML += `
       <tr>
            <td>
              <div class="coin-image">
                <img
                  src="${item.image}"
                />
                <div>${item.name}</div>
              </div>
            </td>

            <td>${item.symbol.toUpperCase()}</td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
            <td class="td-percent">${item.price_change_percentage_24h.toFixed(2)}%</td>
            <td>Mkr Cap:${item.market_cap}</td>
        </tr>
      `

    });


  }

  document.getElementById("btn-sort-mkt-cap").addEventListener("click",function(){
    
    coinsArray.sort((a,b)=>(a.market_cap >b.market_cap)?1:((b.market_cap > a.market_cap) ? -1 : 0));

    displayData(coinsArray);

  });

  document.getElementById("btn-sort-percent").addEventListener("click",function(){
    
    coinsArray.sort((a,b)=>(a.price_change_percentage_24h >b.price_change_percentage_24h)?1:((b.price_change_percentage_24h > a.price_change_percentage_24h) ? -1 : 0));

    displayData(coinsArray);

  });

  document.getElementById("ip-search").addEventListener("input",function(){
    let data = coinsArray;
    let ip =document.getElementById("ip-search").ariaValueMax.toLowerCase();
    data = data.filter((item)=>{
      return item.name.toLowerCase().includes(ip)
    }) 
    displayData(data);
  })



});