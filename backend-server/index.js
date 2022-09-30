import fetch from "node-fetch";
import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();
const appId = '{{APP_ID}}';
const secretKey = '{{SECRET_KEY}}';
let credentials = {
    access_token: '',
    signedIn: false
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.listen(PORT, () =>{
    console.log(`Application is running on the port ${PORT}`)
});

const callApiAndSendResponseToClient = async(url, options, res) => {
    try {
      const response = await fetch(url, options);
      const content = await response.json();
      console.log(content)
      res.send(content);
    } catch (error) {
      res.send(error)
    }
}

const getAccessToken = async(url, options, res, cred) => {
    try {
      const response = await fetch(url, options);
      const content = await response.json();
      cred.access_token = content.access_token;
      cred.signedIn = true;
      res.send("Success");
    } catch (error) {
      res.send(error)
    }
}

app.get("/top-tracks", (req, res) => {
    const url = new URL("https://api.deezer.com/chart/132/tracks");
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/top-albums", (req, res) => {
    const url = new URL("https://api.deezer.com/chart/0/albums");
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/top-artists", (req, res) => {
    const url = new URL("https://api.deezer.com/chart/0/artists");
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/top-playlists", (req, res) => {
    const url = new URL("https://api.deezer.com/chart/0/playlists");
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/top-podcasts", (req, res) => {
    const url = new URL("https://api.deezer.com/chart/0/podcasts");
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/song", (req, res) => {
    const id = req.query.id;
    let url = new URL(`https://api.deezer.com/track/${id}`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/album", (req, res) => {
    const id = req.query.id;
    let url = new URL(`https://api.deezer.com/album/${id}`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/artist", (req, res) => {
    const id = req.query.id;
    let url = new URL(`https://api.deezer.com/artist/${id}`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/artist-top-songs", (req, res) => {
    const id = req.query.id;
    let url = new URL(`https://api.deezer.com/artist/${id}/top`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/playlist", (req, res) => {
    const id = req.query.id;
    let url = new URL(`https://api.deezer.com/playlist/${id}`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/podcast", (req, res) => {
    const id = req.query.id;
    let url = new URL(`https://api.deezer.com/podcast/${id}`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/user-playlist", (req, res) => {
    let url = new URL(`https://api.deezer.com/user/me/playlists`);
    const queryParameters = new URLSearchParams({
        access_token: credentials.access_token
    });
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    url.search = queryParameters; 
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/delete-playlist", (req, res) => {
    const id = req.query.id;
    let url = new URL(`https://api.deezer.com/user/me/playlists`);
    const queryParameters = new URLSearchParams({
        access_token: credentials.access_token,
        request_method: 'DELETE',
        playlist_id: id
    });
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    url.search = queryParameters; 
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/favorite", (req, res) => {
    let url = new URL(`https://api.deezer.com/user/me/tracks`);
    const queryParameters = new URLSearchParams({
        access_token: credentials.access_token
    });
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    };
    url.search = queryParameters; 
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/search", (req, res) => {
    const q = req.query.q;
    let url = new URL(`https://api.deezer.com/search?q=${q}`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    }; 
    callApiAndSendResponseToClient(url, options, res);
});

app.get("/sign-in", (req, res) => {
    const code = req.query.code;
    let url = new URL(`https://connect.deezer.com/oauth/access_token.php?app_id=${appId}&secret=${secretKey}&code=${code}&output=json`);
    const headerParameters = {
        contentType: "application/json",
    };
    const options = {
        method: "GET",
        headers: headerParameters,
    }; 
    getAccessToken(url, options, res, credentials);
});

app.get("/sign-out", (req, res)=>{
    credentials.signedIn=false;
    credentials.access_token='';
    console.log("Logout")
})

app.get("/signedIn", (req, res)=>{
    let response = credentials.signedIn;
    res.send(response)
})