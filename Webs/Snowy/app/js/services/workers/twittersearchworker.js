this.onmessage = function(event) {
    
};

//Implementation of web worker thread code
setInterval(function() { runEveryXSeconds() }, 30000);

function runEveryXSeconds() {
    postMessage("");
}