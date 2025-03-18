import express from 'express';
import axios from 'axios';
import ejs from 'ejs';
import bodyParser from 'body-parser';

const API_URL = 'https://cleanuri.com/api/v1/shorten';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.viewEngine = ejs;
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/submit', (req, res) => {
    const url = req.body.url;
    async function getShortenedUrl() {
        try {
            const result = await axios.post(API_URL, { url });
            res.render('index', { url: result.data.result_url });
            // console.log(result.data.result_url);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while shortening the URL.');
        }
    }
    getShortenedUrl();
});
    
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});