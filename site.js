/** site.js 
 * You should add your JavaScript code to this file.  
 * See the assignment description in Guide for what
 * your code needs to accomplish.
 */

var standardsData;
window.addEventListener('load', (event) => {
  console.log('page is loaded');
  useXHR();
});

function useXHR(){
  const xhr = new XMLHttpRequest();
  var size = window.matchMedia("(max-width: 700px)");
  xhr.addEventListener('load', ()=>{
    standardsData = JSON.parse(xhr.responseText);
    changeWidth(size);
  });
  xhr.onreadystatechange = function(event){
    if(xhr.readyState === 4 && xhr.status === 200) {
      standardsData = JSON.parse(xhr.responseText);
      changeWidth(size);
    }
  }
  size.addListener(changeWidth)
  const url = "standards.json";
  xhr.open("GET", url);
  xhr.send();
}

function changeWidth(size){
  document.body.innerHTML = "";
  var title = document.createTextNode("Kansas Computer Science Standards");
  var header = document.createElement("h1");
  header.className = "title";
  header.appendChild(title);
  document.body.appendChild(header);

  var standardsGrid = document.createElement("div");
  standardsGrid.className = "standards-grid";
  standardsGrid.Id = "grid";
  document.body.appendChild(standardsGrid);
  
  if (size.matches) { // If media query matches
    
  for(let i = 0; i<standardsData.length; i++){
    let id = document.createElement("span");
    id.className = "subject";
    id.innerHTML = standardsData[i].identifier;
    document.querySelector(".standards-grid").appendChild(id);

    let standard = document.createElement("span");
    standard.className = "subject";
    standard.innerHTML = standardsData[i].statement;
    document.querySelector(".standards-grid").appendChild(standard);
    
    let description = document.createElement("span");
    description.className = "desc";
    description.innerHTML = standardsData[i].description;
    document.querySelector(".standards-grid").appendChild(description);
    description.style.display = "none";
    
    let concept = document.createElement("span");
    concept.className = "hidden";
    concept.innerHTML = "Subconcepts " + standardsData[i].subconcept;
    document.querySelector(".standards-grid").appendChild(concept);
    concept.style.display = "none";
    
    let practices = document.createElement("span");
    practices.className = "hidden";
    practices.innerHTML = "Practices <br />";
    for(let j = 0; j<standardsData[i].practices.length; j++){
      var subpractices = document.createElement("span");
      subpractices.className = "subpractices";
      subpractices.innerHTML = standardsData[i].practices[j] + "<br />";
      practices.appendChild(subpractices);
    }
    document.querySelector(".standards-grid").appendChild(practices);
    practices.style.display = "none";
    
    let lessButton = document.createElement("button");
    lessButton.className = "less-button"
    lessButton.innerHTML = "less...";
    lessButton.style.display = "none";
    document.querySelector(".standards-grid").appendChild(lessButton);
    
    let moreButton = document.createElement("button");
    moreButton.className = "more-button";
    moreButton.innerHTML = "more...";
    moreButton.style.display = "inline";
    document.querySelector(".standards-grid").appendChild(moreButton);
    
    moreButton.addEventListener("click", function(){
      moreButton.style.display = "none";
      description.style.display = "inline";
      concept.style.display = "inline";
      practices.style.display = "inline";
      lessButton.style.display = "inline";
      });
    
    lessButton.addEventListener("click", function(){
      moreButton.style.display = "inline";
      lessButton.style.display = "none";
      description.style.display = "none";
      concept.style.display = "none";
      practices.style.display = "none";
      });
    }
  } 
  else {

  var headerId = document.createElement("span");
  headerId.className = "header";
  headerId.innerHTML = "Identifier";
  document.querySelector(".standards-grid").appendChild(headerId);

  var headerStandard = document.createElement("span");
  headerStandard.className = "header";
  headerStandard.innerHTML = "Standard";
  document.querySelector(".standards-grid").appendChild(headerStandard);

  var headerConcept = document.createElement("span");
  headerConcept.className = "header";
  headerConcept.innerHTML = "Subconcept";
  document.querySelector(".standards-grid").appendChild(headerConcept);

  var headerPractices = document.createElement("span");
  headerPractices.className = "header";
  headerPractices.innerHTML = "Practices";
  document.querySelector(".standards-grid").appendChild(headerPractices);

  for(let i = 0; i<standardsData.length; i++){
    let id = document.createElement("span");
    id.innerHTML = standardsData[i].identifier;
    document.querySelector(".standards-grid").appendChild(id);

    let standard = document.createElement("span");
    standard.innerHTML = standardsData[i].statement + "<br />" + "<br />" + standardsData[i].description;
    document.querySelector(".standards-grid").appendChild(standard);

    let concept = document.createElement("span");
    concept.innerHTML = standardsData[i].subconcept;
    document.querySelector(".standards-grid").appendChild(concept);

    let practices = document.createElement("span");
    for(let j = 0; j<standardsData[i].practices.length; j++){
      var subpractices = document.createElement("span");
      subpractices.className = "subpractices";
      subpractices.innerHTML = standardsData[i].practices[j] + "<br />";
      practices.appendChild(subpractices);
    }
    document.querySelector(".standards-grid").appendChild(practices);
    }
  }
}

