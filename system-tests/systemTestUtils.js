"use strict"

const _ = require("lodash")
const path = require("path")
const stripAnsi = require("strip-ansi")

function caseFilePath(caseNumber, fileName) {
  return path.join(__dirname, caseNumber, fileName)
}

function caseStylesheetGlob(caseNumber) {
  return caseFilePath(caseNumber, "stylesheet.*")
}

function caseConfig(caseNumber, ext = "json") {
  return caseFilePath(caseNumber, `config.${ext}`)
}

function prepResults(results) {
  return results.map((result) => {
    // The _postcssResult object is not part of our API and is huge
    const preppedResult = _.omit(result, "_postcssResult")

    // The `source` of each file will not be the same on different machines
    preppedResult.source = path.relative(__dirname, result.source)

    return preppedResult
  })
}

function stripColors(input) {
  return stripAnsi(input)
}

module.exports = {
  caseFilePath,
  caseStylesheetGlob,
  caseConfig,
  prepResults,
  stripColors,
}
