// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: exclamation-circle;
/* Simple widget for presenting an error message
   
   Pass argument options with custom defined widget properties as a dictionary object
   ---options---
      *title - string
      *desc - string
      *titleColor - hex string
      *descColor - hex string
      *titleColorLight - hex string
      *descColorLight - hex string
      *titleColorDark - hex string
      *descColorDark - hex string
      *titleSize - number
      *descSize - number
      *font - string
      *bg - hex string
      *bgLight - hex string
      *bgDark - hex string
      *autoTheme - boolean
*/

// Global variables
var TITLE = "TITLE"
var DESC = "ADD A DESCRIPTION"

var TITLECOLORDARK = "#FFFFFF"
var DESCCOLORDARK = "#BBBBBB"

var TITLECOLOR = "#000000"
var DESCCOLOR = "#555555"

var FONT = "AlNile-Bold"
var TITLESIZE = 18
var DESCSIZE = 12

var BGDARK = "#222222"
var BG = "#FFFFFF"

var AUTOTHEME = true

// Export module
module.exports.new = (options = null) => {
  return newWidget(options)
}

// Returns generated widget
function newWidget(options = null) {
  
  setUserDefinitions(options)
  
  let widget
  if(AUTOTHEME) {
    widget = new Date().getHours() >= 18 ? getDarkTheme() : getLightTheme()
  } else
    widget = getLightTheme()
    
  return widget
}

// Assertions
function assertText(obj){
  if(typeof(obj) === "string")
    return obj
  else
    return "ERROR: ARGUMENT IS NOT A STRING"
}

function assertColor(obj){
  try {
    new Color(obj, 1)
    return obj
  } catch (e) {
    return "#FF0000"
  }
}

function assertBool(obj){
  if(typeof(obj) === "boolean")
    return obj
  else
    return true
}

function assertNumber(obj){
  if(typeof(obj) === "number")
    return obj
  else
    return false
}

// get light theme widget
function getLightTheme() {
  let widget = new ListWidget()
  
  let title = widget.addText(TITLE)
  title.font = new Font(FONT, TITLESIZE)
  title.textColor = new Color(TITLECOLOR, 1)
  title.minimumScaleFactor = 0.5
  title.centerAlignText()
  
  widget.addSpacer(5)
  
  let desc = widget.addText(DESC)
  desc.font = new Font(FONT, DESCSIZE)
  desc.textColor = new Color(DESCCOLOR, 1)
  desc.minimumScaleFactor = 0.5
  desc.centerAlignText()
  
  widget.backgroundColor = new Color(BG, 1)
  
  return widget
}

// get light theme widget
function getDarkTheme() {
  let widget = new ListWidget()
  
  let title = widget.addText(TITLE)
  title.font = new Font(FONT, TITLESIZE)
  title.minimumScaleFactor = 0.5
  title.textColor = new Color(TITLECOLORDARK, 1)
  title.centerAlignText()
  
  widget.addSpacer(5)
  
  let desc = widget.addText(DESC)
  desc.font = new Font(FONT, DESCSIZE)
  desc.textColor = new Color(DESCCOLORDARK, 1)
  desc.minimumScaleFactor = 0.5
  desc.centerAlignText()
  
  widget.backgroundColor = new Color(BGDARK, 1)
  
  return widget
}

// assigns user definitions to globals
function setUserDefinitions(options) {
  if(options !== null) {
    if(options.title)
      TITLE = assertText(options.title)
    if(options.desc)
      DESC = assertText(options.desc)
    if(options.titleColor)
      TITLECOLOR = assertColor(options.titleColor)  
    if(options.descColor)
      DESCCOLOR = assertColor(options.descColor)  
    if(options.titleColorLight)
      TITLECOLOR = assertColor(options.titleColorLight)  
    if(options.descColorLight)
      DESCCOLOR = assertColor(options.descColorLight)  
    if(options.titleColorDark)
      TITLECOLORDARK = assertColor(options.titleColorDark)  
    if(options.descColorDark)
      DESCCOLORDARK = assertColor(options.descColorDark)  
    if(options.titleSize)
      TITLESIZE = assertNumber(options.titleSize)
    if(options.descSize)
      DESCSIZE = assertNumber(options.descSize)  
    if(options.font)
      FONT = assertText(options.font)
    if(options.bg)
      BG = assertColor(options.bh)  
    if(options.bgLight)
      BG = assertColor(options.bgLight)  
    if(options.bgDark)
      BGDARK = assertColor(options.bgDark)
    if(options.autoTheme)
      AUTOTHEME = assertBool(options.autoTheme)  
  }
}