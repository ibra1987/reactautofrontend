function sumOfPropertyOfArrayOfObjects(arr, property) {
  const sum = arr.reduce((a, b) => {
    if (b[property] > 0) {
      return parseInt(a) + parseInt(b[property]);
    }
    return 0;
  }, 0);

  return sum;
}

function isEmpty(field) {
  if (field === " " || !field) {
    return true;
  }
}

const helpers = {
  sumOfPropertyOfArrayOfObjects,
  isEmpty,
};

export default helpers;
