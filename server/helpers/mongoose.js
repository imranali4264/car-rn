//mongoose errors:show mongoose message to client
module.exports = {
  mongoErrors: errors => {
    let mongoErrors = [];
    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        mongoErrors.push({ title: property, detail: errors[property].message });
      }
    }
    return mongoErrors;
  }
};
