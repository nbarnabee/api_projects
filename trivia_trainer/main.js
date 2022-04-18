


fetch(url)
.then(result => result.json())
.then(data => {
 //put the code to make it do the thing
})
.catch(error => {
  console.log(`Error: ${error}`);
  // any additional error messages here
})