this.onmessage = function(event) {
    
};

//Implementation of web worker thread code
setInterval(function() { runEveryXSeconds() }, 60000);

function runEveryXSeconds() {
    postMessage("");
}