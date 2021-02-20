const express = require("express")
const axios = require("axios");
const cache = require("memory-cache");

const app = express()

const port = 3000
const apiKey = "XerFVHr9bhmYZkQcl9RdcV8vhhezbEEVfkwlsPP9";


const cors = require("cors");
app.use(cors());

// Serve the static files
app.use(express.static("dist"));

const cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        let cacheContent = cache.get(key);
        if(cacheContent){
            res.send( cacheContent );
            return
        }else{
            res.sendResponse = res.send
            res.send = (body) => {
                cache.put(key,body,duration*1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

app.get("/api/getNeos", cacheMiddleware(120), (req, res) => {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-12-19&end_date=2015-12-26&api_key=${apiKey}`;
    axios.get(url)
        .then(response => res.json(response.data))
        .catch(e => {
            res.status(404).json({ message: e.message })
        });
});

app.listen(port, () => {
  console.log(`NEOs app listening at http://localhost:${port}`)
})