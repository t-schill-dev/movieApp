const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    path = require('path');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

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
        "title": "Taxi Driver",
        "year": "1976",
        "runtime": "113",
        "genres": [
            "Crime",
            "Drama"
        ],
        "director": "Martin Scorsese",
        "actors": "Diahnne Abbott, Frank Adu, Victor Argo, Gino Ardito",
        "plot": "A mentally unstable Vietnam War veteran works as a night-time taxi driver in New York City where the perceived decadence and sleaze feeds his urge for violent action, attempting to save a preadolescent prostitute in the process.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNGQxNDgzZWQtZTNjNi00M2RkLWExZmEtNmE1NjEyZDEwMzA5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },
    {
        "title": "The Beach",
        "year": "2000",
        "runtime": "119",
        "genres": [
            "Adventure",
            "Drama",
            "Romance"
        ],
        "director": "Danny Boyle",
        "actors": "Leonardo DiCaprio, Daniel York, Patcharawan Patarakijjanon, Virginie Ledoyen",
        "plot": "Twenty-something Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss - excited and intrigued, he sets out to find it.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BN2ViYTFiZmUtOTIxZi00YzIxLWEyMzUtYjQwZGNjMjNhY2IwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {
        "title": "The Grand Budapest Hotel",
        "year": "2014",
        "runtime": "99",
        "genres": [
            "Adventure",
            "Comedy",
            "Crime"
        ],
        "director": "Wes Anderson",
        "actors": "Ralph Fiennes, F. Murray Abraham, Mathieu Amalric, Adrien Brody",
        "plot": "The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg"
    },
    {
        "title": "Interstellar",
        "year": "2014",
        "runtime": "169",
        "genres": [
            "Adventure",
            "Drama",
            "Sci-Fi"
        ],
        "director": "Christopher Nolan",
        "actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
        "plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg"
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
            'name': 'Danny Boyle',
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
            'name': 'Pierre Coffin'
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
            'name': 'Eric Darnell',
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
//UPDATE movie from favorites list
app.put('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to favorites`)
    } else {
        res.status(400).send('user not found')
    }

});

//DELETE movie from favorites list
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from favorites`)
    } else {
        res.status(400).send('user not found')
    }

});

//DELETE User
app.delete('/users/:id/', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User with ID ${id} has been removed`)
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

//READ
app.get('/movies/genres/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genreMovies = movies.filter((movie) => movie.genres.includes(genreName));

    if (genreMovies) {
        res.status(200).send(genreMovies);
    } else {
        res.status(400).send('no genre found');
    }
});

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