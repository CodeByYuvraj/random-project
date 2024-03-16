
(async () => {

  async function getdata(fetchUrl) {
    const req = await fetch(fetchUrl);
    const res = await req.json();
    return res;
  }

  const versionJson = await getdata('https://valorant-api.com/v1/version');
  let versionData = versionJson["data"];
  let weaponsData = [];
  const cardDiv = document.getElementById("card-div");

  let localVersion = JSON.parse(localStorage.getItem("version"));
  let loacalWeaponsData = JSON.parse(localStorage.getItem("weapons-data"));

  // console.log(localVersion, versionData["version"], loacalWeaponsData);

  if(localVersion && localVersion["version"] === versionData["version"]) {
    weaponsData = loacalWeaponsData;
  } else {
    localStorage.setItem("version", JSON.stringify(versionData));
    const weaponsJson = await getdata('https://valorant-api.com/v1/weapons');
    weaponsData = weaponsJson["data"];
    localStorage.setItem("weapons-data", JSON.stringify(weaponsData));
  }


  weaponsData.forEach(ele => {
    cardDiv.innerHTML += `
    
    <div class="col">
    <div class="card h-100">
      <img class="m-4 img-fluid" src= ${ele["displayIcon"]}
        alt=${ele["displayName"]} loading="lazy"/>
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