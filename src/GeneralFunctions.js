export function getUnique(arr) {

    const unique = arr.filter((obj, index) => {
        return index === arr.findLastIndex(o => obj.type === o.type);
      });  
        console.log(unique);
     return unique;
  }