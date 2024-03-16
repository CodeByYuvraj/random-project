
(async () => {

  async function getdata(fetchUrl) {
    const req = await fetch(fetchUrl);
    const res = await req.json();
    return res;
  }

  function renderCard(displayName, displayIcon) {
    // para
    let cardPara = document.createElement('p');
    cardPara.innerText = "comming soon....."

    // heading
    let cardHeadingUndeline = document.createElement('u');
    let cardHeading = document.createElement('h2');
    cardHeading.innerText = displayName
    cardHeading.appendChild(cardHeadingUndeline);    
    
    // innerCard
    let innerCardDiv = document.createElement('div');
    innerCardDiv.className = "card-content";
    innerCardDiv.appendChild(cardHeading);
    innerCardDiv.appendChild(cardPara);

    // hr
    let hr = document.createElement('hr');

    // card image
    let cardImg = document.createElement('img');
    cardImg.src = displayIcon

    // main card
    let cardDiv = document.createElement('div');
    cardDiv.className = "card";
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(hr);
    cardDiv.appendChild(innerCardDiv);

    return cardDiv;
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

  weaponsData.sort((w1, w2) => w1["displayName"].localeCompare(w2["displayName"]));

  weaponsData.forEach(ele => {
    cardDiv.appendChild(renderCard(ele["displayName"], ele["displayIcon"]));
  });

})();