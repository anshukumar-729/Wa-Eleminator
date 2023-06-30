export async function myFunction() {
  return new Promise((resolve, reject) => {
    fetch('https://wa-eleminator.netlify.app/.netlify/functions/api/hello', {
      method: 'GET',
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        resolve(data); // Resolve with the response data
      })
      .catch(function(err) {
        reject(err); // Reject with the error
      });
  });
}

export async function saveData(script, stdin, lang) {
  if(stdin.split("\n").length > 100){
    stdin = stdin.split("\n").slice(0,100).join("\n");
  }
    return new Promise((resolve, reject) => {
        fetch('https://sheetdb.io/api/v1/vpb74x70avd0c', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ogtqxiyq1o3p6ddkdrhlavm57a7ios0kjz1nn57m`,
              'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                script:script,
                stdin:stdin,
                lang:lang,
                time: new Date().toLocaleString(),
            }),
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                resolve(data); // Resolve with the response data
            })
            .catch(function(err) {
                reject(err); // Reject with the error
            });
    }

    );
}

export async function compile(script, stdin, lang) {
  saveData(script, stdin, lang);
  
    return new Promise((resolve, reject) => {
        fetch('https://wa-eleminator.netlify.app/.netlify/functions/api/api/compile', {
        // fetch('http://localhost:3020/api/compile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({script:script, stdin:stdin, lang:lang}),
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                resolve(data); // Resolve with the response data
            })
            .catch(function(err) {
                reject(err); // Reject with the error
            });
    }

    );
}