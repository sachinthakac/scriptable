// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: globe-americas;
/* Widget for viewing SLT data usage
   ---Require---
       ->ErrorWidget Module

   Setup Procedure
      1. Run in app first and login to your account
      2. Close the web view to complete

*/

const fileLog = importModule("FileLog");
await fileLog.clear();

const URLDASHBOARD = "https://internetvas.slt.lk/dashboard";
const URLHISTORY = "https://internetvas.slt.lk/reports/usage-history";

const JSDATAEVAL = String.raw`
function extract() {
  dataElements = document.getElementsByClassName("sc-dnqmqq diLolh")
  let usage = Array.from(
      dataElements,
      e => e.innerText
  ).filter((item, index) => index%2 === 0).map((ele, index) => {
      let data = dataElements[index*2+1].innerText.match(/\d+\.?\d+/gm)
      return {
          name: ele,
          data: (data) ? data.map(e => parseFloat(e)) : null
      }
  })
  let speed = document.getElementsByClassName("sc-iwsKbI gCYJuz")[0].innerText.trim()
  let data = {
      speed: speed,
      usage: usage
  }
  return data
}

// let completion = (data) => console.log(data)

if(/login/.test(document.location.href)) {
    completion(null)
} else {
  let itr = 0
  let checkLoaded = setInterval(function() {
      itr++
      if(document.querySelector("div.sc-cJSrbW.dKiukF")) {
          clearInterval(checkLoaded)
          let data = extract()
          console.log("Extracted from Dashboard")
          completion(data)
      } else if(itr > 10) {
          console.log("Evaluation exited after timeout")
          clearInterval(checkLoaded)
          completion(null)
      }
  }, 200)
}
`;

const JSHISTORYEVAL = String.raw`
function extract() {
  dataElements = document.getElementsByTagName("tbody")[0].children
  let usage = Array.from(
      dataElements,
      e => parseFloat(e.children[1].innerText)
  )
  return usage
}

// let completion = (data) => console.log(data)

if(/login/.test(document.location.href)) {
    completion(null)
} else {
  let itr = 0
  let checkLoaded2 = setInterval(function() {
      itr++
      if(document.querySelector("tbody") && document.querySelector("tbody").children.length) {
          clearInterval(checkLoaded2)
          let data = extract()
          console.log("Extracted from History")
          completion(data)
      } else if(itr > 10) {
          console.log("Evaluation exited after timeout")
          clearInterval(checkLoaded)
          completion(null)
      }
  }, 200)
}
`;

let data = await load();
if (data.dashboard === null || data.history === null) {
  console.log("Error getting data. Setup required")
  if(config.runsInApp)
    data = await load(true);
}
if(data.dashboard === null || data.history === null) {
  console.error("Error getting data")
}

if(config.runsInApp)
  QuickLook.present(data, false)

let ew = importModule("ErrorWidget")
let widget = ew.new({
  title: "Usage",
  desc: data.dashboard.usage[0].data[0].toString()
})
widget.presentLarge()
Script.setWidget(widget)

// returns data from SLT
async function load(present = false) {
  let webViewDashboard = new WebView();
  let requestDashboard = new Request(URLDASHBOARD);
  await webViewDashboard.loadRequest(requestDashboard);

  // present if login required
  if (present) {
    await webViewDashboard.present();
  }

  let dashboard = await webViewDashboard.evaluateJavaScript(JSDATAEVAL, true);

  let webViewHistory = new WebView();
  let requestHystory = new Request(URLHISTORY);
  await webViewHistory.loadRequest(requestHystory);
  let history = await webViewHistory.evaluateJavaScript(JSHISTORYEVAL, true);

  return {
    dashboard: dashboard,
    history: history
  }
}
