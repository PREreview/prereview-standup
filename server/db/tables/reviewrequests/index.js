module.exports = {
  addReviewRequest,
  getReviewRequests
};

var db = require("../..");

function addReviewRequest(reviewRequest) {
  return db("reviewrequests").insert(reviewRequest);
}

function getReviewRequests(reviewrequest) {
  if (reviewrequest && reviewrequest.reviewrequest_id) {
    return db("reviewrequests")
      .where({ _id: reviewrequest.reviewrequest_id })
      .then(reviewrequests => {
        reviewrequest.reviewrequests = reviewrequests;
        return Promise.resolve(reviewrequest);
      });
  } else {
    return Promise.resolve(null);
  }
}
