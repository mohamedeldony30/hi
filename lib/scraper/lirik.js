const axios = require("axios")
const cheerio = require("cheerio")

async function Lirik(judul) { 
    return new Promise(async (resolve, reject) => { 
        try { 
            const { data } = await axios.get('https://www.musixmatch.com/search/' + judul); 
            const $ = cheerio.load(data); 
            const hasil = {}; 
            const limk = 'https://www.musixmatch.com'; 
            const link = limk + $('div.media-card-body > div > h2').find('a').attr('href'); 
            await axios.get(link).then(({ data }) => { 
                const $$ = cheerio.load(data);
                hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src');
                $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function (a, b) { 
                    hasil.lirik = $$(b).find('span > p > span').text() + '\n' + $$(b).find('span > div > p > span').text();
                });
            });
            resolve(hasil);
        } catch (err) { 
            console.error(err);
        } 
    });
}

module.exports = { Lirik };