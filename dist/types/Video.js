"use strict";
var Status;
(function (Status) {
    Status[Status["reviewPending"] = 0] = "reviewPending";
    Status[Status["uploadPending"] = 1] = "uploadPending";
    Status[Status["rejected"] = 2] = "rejected";
    Status[Status["uploaded"] = 3] = "uploaded";
})(Status || (Status = {}));
