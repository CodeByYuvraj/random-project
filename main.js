(async () => {
  const req = await fetch('https://valorant-api.com/v1/weapons');
  const res = await req.json();
  const data = res["data"];
  const cardDiv = document.getElementById("card-div");



  data.forEach(ele => {
    cardDiv.innerHTML += `
    
    <div class="col">
    <div class="card h-100">
      <img class="m-4 img-fluid" src= ${ele["displayIcon"]}
        alt=${ele["displayName"]} />
      <div class="card-body">
        <h5 class="card-title">${ele["displayName"]}</h5>
        <p class="card-text">
            comming soon.
        </p>
      </div>
      <div class="card-footer">
        <small class="text-muted">comming soon.</small>
      </div>
    </div>
  </div>

    `
  });

})();