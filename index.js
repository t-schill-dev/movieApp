const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let users = [{
        "id": 1,
        "name": "Mary",
        "favoriteMovies": []
    },

    {
        "id": 2,
        "name": "Tom",
        "favoriteMovies": []
    }

];

let movies = [{
        'title': 'Inception',
        'year': '2010',
        'runtime': '148',
        'genres': [
            'Action',
            'Adventure',
            'Sci-Fi'
        ],
        'director': {
            'name': 'Christopher Nolan',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy',
        'plot': 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
    },
    {

        'title': 'Django Unchained',
        'year': '2012',
        'runtime': '165',
        'genres': [
            'Drama',
            'Western'
        ],
        'director': {
            'name': 'Quentin Tarantino',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Jamie Foxx, Christoph Waltz, Leonardo DiCaprio, Kerry Washington',
        'plot': 'With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.',
        'imageUrl': 'http://ia.media-imdb.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg'
    },
    {

        'title': 'Pulp Fiction',
        'year': '1994',
        'runtime': '154',
        'genres': [
            'Crime',
            'Drama'
        ],
        'director': {
            'name': 'Quentin Tarantino',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta',
        'plot': 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg'
    },
    {

        'title': 'Lucky Number Slevin',
        'year': '2006',
        'runtime': '110',
        'genres': [
            'Crime',
            'Drama',
            'Mystery'
        ],
        'director': {
            'name': 'Paul McGuigan',
            // 'bio': ,
            // 'birth': ,
        },

        'actors': 'Josh Hartnett, Bruce Willis, Lucy Liu, Morgan Freeman',
        'plot': 'A case of mistaken identity lands Slevin into the middle of a war being plotted by two of the city\'s most rival crime bosses: The Rabbi and The Boss.Slevin is under constant surveillance by relentless Detective Brikowski as well as the infamous assassin Goodkat and finds himself having to hatch his own ingenious plot to get them before they get him.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzc1OTEwMTk4OF5BMl5BanBnXkFtZTcwMTEzMDQzMQ@@._V1_SX300.jpg'
    },
    {

        'title': 'The Hangover',
        'year': '2009',
        'runtime': '100',
        'genres': [
            'Comedy'
        ],
        'director': {
            'name': 'Todd Phillips',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Bradley Cooper, Ed Helms, Zach Galifianakis, Justin Bartha',
        'plot': 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA1Mg@@._V1_SX300.jpg'
    },
    {

        'title': 'The Truman Show',
        'year': '1998',
        'runtime': '103',
        'genres': [
            'Comedy',
            'Drama',
            'Sci-Fi'
        ],
        'director': {
            'name': 'Peter Weir',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Jim Carrey, Laura Linney, Noah Emmerich, Natascha McElhone',
        'plot': 'An insurance salesman/adjuster discovers his entire life is actually a television show.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'
    },
    {

        'title': 'Slumdog Millionaire',
        'year': '2008',
        'runtime': '120',
        'genres': [
            'Drama',
            'Romance'
        ],
        'director': {
            'name': 'Danny Boyle, Loveleen Tandan',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Dev Patel, Saurabh Shukla, Anil Kapoor, Rajendranath Zutshi',
        'plot': 'A Mumbai teen reflects on his upbringing in the slums when he is accused of cheating on the Indian Version of "Who Wants to be a Millionaire?"',
        'imageUrl': 'http://ia.media-imdb.com/images/M/MV5BMTU2NTA5NzI0N15BMl5BanBnXkFtZTcwMjUxMjYxMg@@._V1_SX300.jpg'
    },
    {

        'title': 'Despicable Me 2',
        'year': '2013',
        'runtime': '98',
        'genres': [
            'Animation',
            'Adventure',
            'Comedy'
        ],
        'director': {
            'name': 'Pierre Coffin, Chris Renaud',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Steve Carell, Kristen Wiig, Benjamin Bratt, Miranda Cosgrove',
        'plot': 'When Gru, the world\'s most super - bad turned super - dad has been recruited by a team of officials to stop lethal muscle and a host of Gru\'s own, He has to fight back with new gadgetry, cars, and more minion madness.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjExNjAyNTcyMF5BMl5BanBnXkFtZTgwODQzMjQ3MDE@._V1_SX300.jpg'
    },
    {

        'title': 'Madagascar',
        'year': '2005',
        'runtime': '86',
        'genres': [
            'Animation',
            'Adventure',
            'Comedy'
        ],
        'director': {
            'name': 'Eric Darnell, Tom McGrath',
            // 'bio': ,
            // 'birth': ,
        },
        'actors': 'Ben Stiller, Chris Rock, David Schwimmer, Jada Pinkett Smith',
        'plot': 'Spoiled by their upbringing with no idea what wild life is really like, four animals from New York Central Zoo escape, unwittingly assisted by four absconding penguins, and find themselves in Madagascar, among a bunch of merry lemurs',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY4NDUwMzQxMF5BMl5BanBnXkFtZTcwMDgwNjgyMQ@@._V1_SX300.jpg'
    },
    {

        'title': 'Pirates of the Caribbean: The Curse of the Black Pearl',
        'year': '2003',
        'runtime': '143',
        'genres': [
            'Action',
            'Adventure',
            'Fantasy'
        ],
        'director': 'Gore Verbinski',
        'actors': 'Johnny Depp, Geoffrey Rush, Orlando Bloom, Keira Knightley',
        'plot': 'Blacksmith Will Turner teams up with eccentric pirate \'Captain\' Jack Sparrow to save his love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjAyNDM4MTc2N15BMl5BanBnXkFtZTYwNDk0Mjc3._V1_SX300.jpg'
    },
    {
        'id': 80,
        'title': 'Casino Royale',
        'year': '2006',
        'runtime': '144',
        'genres': [
            'Action',
            'Adventure',
            'Thriller'
        ],
        'director': 'Martin Campbell',
        'actors': 'Daniel Craig, Eva Green, Mads Mikkelsen, Judi Dench',
        'plot': 'Armed with a licence to kill, Secret Agent James Bond sets out on his first mission as 007 and must defeat a weapons dealer in a high stakes game of poker at Casino Royale, but things are not what they seem.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_SX300.jpg'
    },
    {
        'id': 82,
        'title': 'The Wolf of Wall Street',
        'year': '2013',
        'runtime': '180',
        'genres': [
            'Biography',
            'Comedy',
            'Crime'
        ],
        'director': 'Martin Scorsese',
        'actors': 'Leonardo DiCaprio, Jonah Hill, Margot Robbie, Matthew McConaughey',
        'plot': 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
        'imageUrl': 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg'
    }
];

// CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users need names');
    }
});

//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user)
    } else {
        res.status(400).send('user not found')
    }

});

// READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params; // syntax object destructuring === const title = req.params.title;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no movie found');
    }
});

// need work!!!!!!!!!!
// READ
// app.get('/movies/genres/:genreName', (req, res) => {
//     const { genreName } = req.params;
//     const genreArray = movies.find((movie) => movie.genres);

//     const genre = genreArray.forEach(name => name === genreName);

//     if (genre) {
//         res.status(200).send(genre);
//     } else {
//         res.status(400).send('no genre found');
//     }
// });

// READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params; // syntax object destructuring === const title = req.params.title;
    const director = movies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no director found');
    }
});








app.listen(8080, () => {
    console.log('Your app ist listening on port 8080');

});