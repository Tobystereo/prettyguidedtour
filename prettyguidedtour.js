//////////////////////////////////////////////////////////////////////////////////////////////////
///////
///////     Pretty Guided Tour v0.1 by Tobias Treppmann
///////
//////////////////////////////////////////////////////////////////////////////////////////////////

// User defined parameters

var onboardingMaskColor = "rgba(193, 128, 210, .35)";
var onboardingFontFamily = "Proxima Nova";
var onboardingPopupWidth = 400;
var onboardingPopupGap = 24;
var onboardingIntro = {
  title: "Organize your data in workspaces",
  description: "Workspaces are Neebo's collaborative project areas. Add references to datasets and documents that you need for your project.<br><br>Document with comments, tags, and the description field so that your work is more discoverable and you can easily distinguish between related projects.",
  buttonText: "Get started"
}
var onboardingHighlights = [
  {
	id:"test1",
	title: "Area number 1",
	description: "Porttitor aliquam ante adipiscing semper nostra orci proin vehicula cursus, auctor conubia suscipit sagittis magna venenatis quis netus hendrerit duis, curae commodo integer lacinia eu mus hac morbi."
  }, 
  {
	id: "test2",
	title: "Area number 2",
	description: "Porttitor aliquam ante adipiscing semper nostra orci proin vehicula cursus, auctor conubia suscipit sagittis magna venenatis quis netus hendrerit duis, curae commodo integer lacinia eu mus hac morbi. Porttitor aliquam ante adipiscing semper nostra orci proin vehicula cursus, auctor conubia suscipit sagittis magna venenatis quis netus hendrerit duis, curae commodo integer lacinia eu mus hac morbi."
  }, 
  {
	id: "test3",
	title: "Capture knowledge and give a voice to your data",
	description: "Any user can comment on a Workspace or reply to existing comments<br><br>Users subscribed to the Workspace will receive a notification for new comments and replies."
  }
];


//////////////////////////////////////////////////////////////////////////////////////////////////
/////// Library 
//////////////////////////////////////////////////////////////////////////////////////////////////

// variables
var currentOnboardingStep = 0;
var showOnboarding = true;
var viewportWidth = document.documentElement.clientWidth;
var viewportHeight = document.documentElement.clientHeight;


// once the page is rendered, start the onboarding
window.addEventListener('load', (event) => {
  if(showOnboarding) {
	setupOnboarding(); 
	addOnboardingStyles();
  }
});

window.addEventListener('resize', onboardingOnResize);

function onboardingOnResize() {
  getHighlights();
  
  viewportWidth = document.documentElement.clientWidth;
  viewportHeight = document.documentElement.clientHeight;
}

// setup functions
function addOnboardingStyles() {
  let onboardingStyles = document.createElement("style");
  onboardingStyles.id = "onboardingStyles";
  onboardingStyles.innerHTML = "#onboardingMask{opacity:0;transition:all 1s ease-in-out;position:absolute;outline-width:200vw;outline-style:solid;outline-color:"+onboardingMaskColor+";overflow:hidden;pointer-events:none;animation-delay:1s;animation-duration:1s;animation-fill-mode:forwards;animation-timing-function:ease-in-out;animation-name:fadeIn}#onboardingMask #onboardingRoundedBorder{transition:all 1s ease-in-out;box-sizing:content-box;border-style:solid;border-color:"+onboardingMaskColor+"}#onboardingContainer{position:absolute;opacity:0;box-sizing:border-box;width:754px;height:425px;background:#fff;border:1px solid "+onboardingMaskColor+";left:45vw;top:40vh;animation-delay:2.3s;animation-duration:.6s;animation-fill-mode:forwards;animation-timing-function:ease-in-out;animation-name:fadeIn}#onboardingTitle{font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-weight:400;font-size:20px;color:#c180d2;letter-spacing:0;padding:40px 40px 0;box-sizing:border-box}#onboardingDescription{font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-size:14px;color:#2f394e;letter-spacing:0;padding:0 40px;box-sizing:border-box}#onboardingButtonNext{position:absolute;bottom:0;height:64px;width:100%;background:#fff;font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-size:14px;color:#a874b6;letter-spacing:0;border:0;border-top:1px solid #c180d2;text-align:right;padding-right:40px;cursor:pointer}#onboardingButtonClose{position:absolute;top:16px;right:24px;background:0;border:0;width:16px;height:16px;color:#ccc;font-size:18px;cursor:pointer}#onboardingStepPopup{opacity:0;transition:all 1s ease-in-out;box-sizing:border-box;font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;padding:0;position:absolute;width:"+onboardingPopupWidth+"px;z-index:1000;color:white;background:#a46db3;box-shadow:0 1px 20px 0 rgba(0,0,0,0.20);border-radius:4px;top:45vh;left:45vw}#onboardingStepPopup.zeroState{animation-delay:.3s;animation-duration:.6s;animation-fill-mode:forwards;animation-timing-function:ease-in-out;animation-name:fadeIn}#onboardingStepPopup.start{display:block;animation-duration:.2s;animation-name:fadeIn}#onboardingStepPopupTitle{transition:all 1s ease-in-out;box-sizing:border-box;padding:0 16px 16px;border-bottom:1px solid rgba(255,255,255,0.20);font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-weight:600;font-size:20px;color:#fff;letter-spacing:0}#onboardingStepPopupDescription{transition:all 1s ease-in-out;box-sizing:border-box;padding:0 16px 16px;font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-size:16px;color:#fff;letter-spacing:0}#onboardingStepPopupPrev{float:right;min-width:80px;box-sizing:border-box;padding:4px 12px;border:1px solid rgba(255,255,255,0.20);border-radius:16px;font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-size:14px;color:#fff;letter-spacing:0;text-align:center;background:0;margin:0 0 16px 8px;cursor:pointer}#onboardingStepPopupNext{float:right;min-width:80px;box-sizing:border-box;padding:4px 12px;background:#fff;border-radius:16px;font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-size:14px;color:#2f394e;letter-spacing:0;text-align:center;border:0;margin:0 16px 16px 8px;cursor:pointer}#onboardingStepPopupClose{position:absolute;top:16px;right:16px;background:0;border:0;width:16px;height:16px;color:white;font-size:12px;cursor:pointer}#onboardingStepPopupSteps{position:absolute;font-family:"+onboardingFontFamily+",'Helvetica Neue',sans-serif;font-weight:300;font-size:14px;color:#fff;letter-spacing:0;left:16px;bottom:8px}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}"
  document.body.appendChild(onboardingStyles); 
  
}
function setupOnboarding() {

  let viewportWidth = document.documentElement.clientWidth;
  let viewportHeight = document.documentElement.clientHeight;
  // let onboardingContainer = document.getElementById("onboardingContainer");
  
  
  // should be triggered by intro panel
  getHighlights();
  createOnboardingMaskLayer();
  showOnboardingContainer();
  // onboardingNavigateNext();
}

function showOnboardingContainer() {
  let onboardingContainer = document.createElement("div");
  onboardingContainer.setAttribute("id", "onboardingContainer");
  onboardingContainer.id = "onboardingContainer";
  
	let onboardingTitle = document.createElement("p");
	onboardingTitle.setAttribute("id", "onboardingTitle");
	onboardingTitle.id = "onboardingTitle";
	onboardingTitle.innerHTML = onboardingIntro.title;
	onboardingContainer.appendChild(onboardingTitle);
  
	let onboardingDescription = document.createElement("p");
	onboardingDescription.setAttribute("id", "onboardingDescription");
	onboardingDescription.id = "onboardingDescription";
	onboardingDescription.innerHTML = onboardingIntro.description;
	onboardingContainer.appendChild(onboardingDescription);
 
	let onboardingButtonNext = document.createElement("button");
	onboardingButtonNext.setAttribute("id", "onboardingButtonNext");
	onboardingButtonNext.id = "onboardingButtonNext";
  onboardingButtonNext.innerHTML = "next &rang;";
	onboardingContainer.appendChild(onboardingButtonNext);

	let onboardingButtonClose = document.createElement("button");
	onboardingButtonClose.setAttribute("id", "onboardingButtonClose");
	onboardingButtonClose.id = "onboardingButtonClose";
	onboardingButtonClose.innerHTML = "&#10005;";
	onboardingContainer.appendChild(onboardingButtonClose);  

  document.body.appendChild(onboardingContainer); 

  let rederedOnboardingContainer = document.getElementById("onboardingContainer");
  let onboardingContainerWidth = rederedOnboardingContainer.offsetWidth;
  let onboardingContainerHeight = rederedOnboardingContainer.offsetHeight;
  rederedOnboardingContainer.setAttribute("style", "top:"+ (viewportHeight/2-onboardingContainerHeight/2) + "px; left: " + (viewportWidth/2-onboardingContainerWidth/2) + "px;");
  
  // let onboardingButtonNext = document.getElementById("onboardingButtonNext");
  onboardingButtonNext.addEventListener("click", startOnboardingTour);
  
  // let onboardingButtonClose = document.getElementById("onboardingButtonClose");
  onboardingButtonClose.addEventListener("click", closeOnboarding);
}

function hideOnboardingContainer() {
  let rederedOnboardingContainer = document.getElementById("onboardingContainer");
  rederedOnboardingContainer.setAttribute("style", "display: none;");
  document.body.removeChild(rederedOnboardingContainer);
}

function startOnboardingTour() {
  hideOnboardingContainer();
  let onboardingStepPopup = document.createElement("div");
  onboardingStepPopup.setAttribute("id","onboardingStepPopup");
  onboardingStepPopup.id = "onboardingStepPopup";  
  onboardingStepPopup.setAttribute("class","zeroState");
  
  let onboardingStepPopupTitle = document.createElement("p");
  onboardingStepPopupTitle.setAttribute("id","onboardingStepPopupTitle");
  onboardingStepPopupTitle.id = "onboardingStepPopupTitle";  
  onboardingStepPopup.appendChild(onboardingStepPopupTitle);
  
  let onboardingStepPopupDescription = document.createElement("p");
  onboardingStepPopupDescription.setAttribute("id","onboardingStepPopupDescription");
  onboardingStepPopupDescription.id = "onboardingStepPopupDescription";  
  onboardingStepPopup.appendChild(onboardingStepPopupDescription);
  
  let onboardingStepPopupSteps = document.createElement("p");
  onboardingStepPopupSteps.setAttribute("id","onboardingStepPopupSteps");
  onboardingStepPopupSteps.id = "onboardingStepPopupSteps";  
  
	let step = document.createElement("span");
	step.innerHTML = "Step ";
	onboardingStepPopupSteps.appendChild(step);

	let onboardingStepPopupStepsCurrent = document.createElement("span");
	onboardingStepPopupStepsCurrent.setAttribute("id", "onboardingStepPopupStepsCurrent");
	onboardingStepPopupStepsCurrent.id = "onboardingStepPopupStepsCurrent";
	onboardingStepPopupSteps.appendChild(onboardingStepPopupStepsCurrent);

	let of = document.createElement("span");
	of.innerHTML = " of ";
	onboardingStepPopupSteps.appendChild(of);
  
	let onboardingStepPopupStepsTotal = document.createElement("span");
	onboardingStepPopupStepsTotal.setAttribute("id", "onboardingStepPopupStepsTotal");
	onboardingStepPopupStepsTotal.id = "onboardingStepPopupStepsTotal";
	onboardingStepPopupSteps.appendChild(onboardingStepPopupStepsTotal);
  
  onboardingStepPopup.appendChild(onboardingStepPopupSteps);
  
  let onboardingStepPopupNext = document.createElement("button");
  onboardingStepPopupNext.setAttribute("id", "onboardingStepPopupNext");
  onboardingStepPopupNext.id = "onboardingStepPopupNext";
  onboardingStepPopupNext.innerHTML = "Next";
  onboardingStepPopup.appendChild(onboardingStepPopupNext);
  
  let onboardingStepPopupPrev = document.createElement("button");
  onboardingStepPopupPrev.setAttribute("id", "onboardingStepPopupPrev");
  onboardingStepPopupPrev.id = "onboardingStepPopupPrev";
  onboardingStepPopupPrev.innerHTML = "Previous";
  onboardingStepPopup.appendChild(onboardingStepPopupPrev);
  
  let onboardingStepPopupClose = document.createElement("button");
  onboardingStepPopupClose.setAttribute("id", "onboardingStepPopupClose");
  onboardingStepPopupClose.id = "onboardingStepPopupClose";
  onboardingStepPopupClose.innerHTML = "&#10005;";
  onboardingStepPopup.appendChild(onboardingStepPopupClose);
  
  document.body.appendChild(onboardingStepPopup); 
  
  onboardingStepPopupNext.addEventListener('click', onboardingNavigateNext, false);
  onboardingStepPopupPrev.addEventListener('click', onboardingNavigatePrev, false);
  
  onboardingNavigateNext(); 
	  
}


function getHighlights() {
  for (var highlight in onboardingHighlights) {
	let obj = document.getElementById(onboardingHighlights[highlight].id);
	
	let highlightParams = {
	  'width': obj.offsetWidth,
	  'height': obj.offsetHeight,
	  'top': obj.offsetTop,
	  'left': obj.offsetLeft
	};
	
	onboardingHighlights[highlight].params = highlightParams;
  }
}

function createOnboardingMaskLayer() {
//   create the onboarding mask layer
  var mask  = document.createElement("div");
  mask.setAttribute("id","onboardingMask");
  var onboardingRoundedBorder  = document.createElement("div");
  onboardingRoundedBorder.setAttribute("id","onboardingRoundedBorder"); 
  mask.appendChild(onboardingRoundedBorder);
  document.body.appendChild(mask);
}

function onboardingNavigatePrev(){
  if(currentOnboardingStep > 1) {
	currentOnboardingStep = currentOnboardingStep-2;
	let onboardingStepPopupNext = document.getElementById("onboardingStepPopupNext");
	onboardingStepPopupNext.innerHTML = "Next";
	onboardingNavigateNext();
  } 
  
}

function onboardingNavigateNext() {
  if(currentOnboardingStep == onboardingHighlights.length) {
	closeOnboarding();
  } else {
	let movingMask = document.getElementById("onboardingMask");
	let movingMaskRoundedBorder = document.getElementById("onboardingRoundedBorder");

	let maskWidth = onboardingHighlights[currentOnboardingStep].params.width+30;
	let maskHeight = onboardingHighlights[currentOnboardingStep].params.height+30;
	let maskTop = onboardingHighlights[currentOnboardingStep].params.top-10;
	let maskLeft = onboardingHighlights[currentOnboardingStep].params.left-10;

	// check for maskColor or use default color
	var maskColor;
	if(onboardingMaskColor != "") {
	  maskColor = onboardingMaskColor;
	} else {
	  maskColor = "rgba(193, 128, 210, .35)";
	}

	// set mask size and position
	movingMask.setAttribute("style", "width:"+maskWidth+"px; height:"+maskHeight+"px; top:"+maskTop+"px; left:"+maskLeft+"px; outline-color:"+maskColor+";");  
	movingMaskRoundedBorder.setAttribute("style", "width:"+maskWidth+"px; height:"+maskHeight+"px; border-radius:"+maskHeight+"px; margin-top:"+(0-maskHeight/2)+"px; margin-left: "+ (0-maskHeight/2)+"px; border-width: "+maskHeight/2+"px; border-color:"+maskColor+";");  

	// update content popup
	let onboardingStepPopup = document.getElementById("onboardingStepPopup");
	let onboardingStepPopupTitle = document.getElementById("onboardingStepPopupTitle");
	let onboardingStepPopupDescription = document.getElementById("onboardingStepPopupDescription");
	let onboardingStepPopupStepsCurrent = document.getElementById("onboardingStepPopupStepsCurrent");
	let onboardingStepPopupStepsTotal = document.getElementById("onboardingStepPopupStepsTotal");
	let onboardingStepPopupNext = document.getElementById("onboardingStepPopupNext");
	let onboardingStepPopupPrev = document.getElementById("onboardingStepPopupPrev");
	let onboardingStepPopupClose = document.getElementById("onboardingStepPopupClose");

	if(currentOnboardingStep == onboardingHighlights.length-1) {
	  onboardingStepPopupNext.innerHTML = "Done";
	}

	onboardingStepPopupClose.addEventListener("click", closeOnboarding, false);

	onboardingStepPopupTitle.innerHTML = onboardingHighlights[currentOnboardingStep].title;
	onboardingStepPopupDescription.innerHTML = onboardingHighlights[currentOnboardingStep].description;
	onboardingStepPopupStepsCurrent.innerHTML = currentOnboardingStep+1;
	onboardingStepPopupStepsTotal.innerHTML = onboardingHighlights.length;

	// position content popup
	viewportWidth = document.documentElement.clientWidth;
	viewportHeight = document.documentElement.clientHeight;

	let popupPositionLeft = 0;
	if((maskLeft-onboardingPopupWidth) > onboardingPopupGap*2){
	  popupPositionLeft = (maskLeft-onboardingPopupWidth-onboardingPopupGap);
	} else {
	  popupPositionLeft = (maskLeft+maskWidth+onboardingPopupGap);
	}

	let popupHeight = onboardingStepPopup.offsetHeight;
	let popupWidth = onboardingStepPopup.offsetWidth;
	let popPositionTop = 0;
	if(maskTop+popupHeight < viewportHeight-onboardingPopupGap*2) {
	  popPositionTop = maskTop;
	} else {
	  popPositionTop = (viewportHeight-popupHeight-onboardingPopupGap);
	}

	onboardingStepPopup.setAttribute("style", "width: "+onboardingPopupWidth+"px; left: "+ popupPositionLeft+"px; top:" + maskTop + "px;");




	if(currentOnboardingStep < onboardingHighlights.length) {
	  currentOnboardingStep++;    
	} 
  }
}

function closeOnboarding() {
  
  let onboardingPopup = document.getElementById("onboardingStepPopup");
  onboardingPopup.setAttribute("style", "display: none;");
  onboardingPopup.parentNode.removeChild(onboardingPopup);
  
  let onboardingMask = document.getElementById("onboardingMask");
  onboardingMask.setAttribute("style", "display: none;");
  onboardingMask.parentNode.removeChild(onboardingMask);
}



/* 
  @todo
  
  ✔ add intro (fade-in)
  ✔ add popup
  ✔ add default color
  ✔ get previous button to work
  ✔ last step > next button should read "done" and click should end onboarding tour
  ✔ bring CSS into JS
  add images in welcome screen
  
  switch variables to setVar functions to be called when needed and updated onResize
  add color conversion function: https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
*/