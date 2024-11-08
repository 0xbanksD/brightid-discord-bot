// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Caml_obj from "rescript/lib/es6/caml_obj.js";
import NodeFetch from "node-fetch";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Core__Option from "@rescript/core/src/Core__Option.mjs";
import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";

var NoRes = /* @__PURE__ */Caml_exceptions.create("FetchTools.NoRes");

async function fetchWithFallback(relativeUrl, nodeIndexOpt, defaultNode, fallbackNodes) {
  var nodeIndex = nodeIndexOpt !== undefined ? nodeIndexOpt : 0;
  var sortedNodes = nodeIndex > 0 ? fallbackNodes.toSorted(function (a, b) {
          if (Caml_obj.greaterthan(a.priority, b.priority)) {
            return 1;
          } else {
            return -1;
          }
        }) : [];
  try {
    var node = Core__Option.mapOr(sortedNodes[nodeIndex], defaultNode, (function (node) {
            return node;
          }));
    if (node === undefined) {
      return ;
    }
    var timeout = Core__Option.getOr(node.timeout, 1000);
    var response = await NodeFetch(node.url + relativeUrl, {
          timeout: timeout,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
    if (response.status === 404) {
      throw {
            RE_EXN_ID: NoRes,
            Error: new Error()
          };
    }
    return Caml_option.some(response);
  }
  catch (exn){
    return await fetchWithFallback(relativeUrl, nodeIndex + 1 | 0, defaultNode, fallbackNodes);
  }
}

export {
  NoRes ,
  fetchWithFallback ,
}
/* node-fetch Not a pure module */
