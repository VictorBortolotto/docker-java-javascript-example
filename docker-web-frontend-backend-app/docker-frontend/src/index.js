const express = require('express');
const app = express();

app.use(
    express.static(__dirname + '/public')
)

app.get('/docker', (req, res) => {
    res.sendFile(__dirname + "/public/pages/index.html");
});

app.listen(3000, () =>{
    console.log("App running on port 3000...");
})
