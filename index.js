const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    path = require('path'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const Movies = Models.Movie,
    Users = Models.User;

mongoose.connect('mongodb://localhost:27017/movieApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

let users = [{
        "name": "Mary Jones",
        "password": "1234test",
        "email": "maryjones@web.com",
        "birthday": new Date("1987-07-23"),
        "favoriteMovies": []
    },
    {
        "name": "Partick Persuasy",
        "password": "prettywoman12",
        "email": "patrickp@gmail.com",
        "birthday": new Date("1977-11-13"),
        "favoriteMovies": []
    },
    {
        "name": "Kevin King",
        "password": "kevki333",
        "email": "kingkev@gmail.com",
        "birthday": new Date("1990-01-07"),
        "favoriteMovies": []
    },
    {
        "name": "Norah Jones",
        "password": "lanorah45",
        "email": "norahjones2@gmail.com",
        "birthday": new Date("1987-07-23"),
        "favoriteMovies": []
    },
    {
        "name": "Stanislav Wasinsky",
        "password": "pakistanisky",
        "email": "staniwasi@gmail.com",
        "birthday": new Date("1995-05-12"),
        "favoriteMovies": []
    }
];

let movies = [{
        "title": "Inception",
        "year": "2010",
        "runtime": "148",
        "genres": [
            "Action",
            "Adventure",
            "Sci-Fi"
        ],
        "director": {
            "name": "Christopher Nolan",
            "bio": "born in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
            "birth": new Date("1970-07-30")
        },
        "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
        "plot": "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
    },
    {
        "title": "Taxi Driver",
        "year": "1976",
        "runtime": "113",
        "genres": [
            "Crime",
            "Drama"
        ],
        "director": {
            "name": "Martin Scorsese",
            "bio": "born in Queens, New York, U.S., American filmmaker known for his harsh, often violent depictions of American culture.",
            "birth": new Date("1942-11-17")
        },
        "actors": ["Diahnne Abbott", "Frank Adu", "Victor Argo", "Gino Ardito"],
        "plot": "A mentally unstable Vietnam War veteran works as a night-time taxi driver in New York City where the perceived decadence and sleaze feeds his urge for violent action, attempting to save a preadolescent prostitute in the process.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNGQxNDgzZWQtZTNjNi00M2RkLWExZmEtNmE1NjEyZDEwMzA5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
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
        "director": {
            "name": "Danny Boyle",
            "bio": "Boyle is a British filmmaker, producer and writer from Radcliffe, Greater Manchester. He is known for directing 28 Days Later, Slumdog Millionaire, Millions, The Beach, Yesterday and Steve Jobs. He won many awards for Slumdog Milliomaire. He was in a relationship with Gail Stevens and had three children.",
            "birth": new Date("1956-10-20")
        },
        "actors": ["Leonardo DiCaprio", "Daniel York", "Patcharawan Patarakijjanon", "Virginie Ledoyen"],
        "plot": "Twenty-something Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss - excited and intrigued, he sets out to find it.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BN2ViYTFiZmUtOTIxZi00YzIxLWEyMzUtYjQwZGNjMjNhY2IwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
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
        "director": {
            "name": "Wes Anderson",
            "bio": "Wesley Wales Anderson was born in Houston, Texas. His mother, Texas Ann (Burroughs), is an archaeologist turned real estate agent, and his father, Melver Leonard Anderson, worked in advertising and PR. He has two brothers, Eric and Mel. Anderson\'s parents divorced when he was a young child, an event that he described as the most crucial event of his brothers and his growing up. During childhood, Anderson also began writing plays and making super-8 movies. He was educated at Westchester High School and then St. John's, a private prep school in Houston, Texas, which was later to prove an inspiration for the film Rushmore (1998).",
            "birth": new Date("1969-05-01")
        },
        "actors": ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric", "Adrien Brody"],
        "plot": "The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg"
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
        "director": {
            "name": "Christopher Nolan",
            "bio": "born in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
            "birth": new Date("1970-07-30")
        },
        "actors": ["Ellen Burstyn", "Matthew McConaughey", "Mackenzie Foy", "John Lithgow"],
        "plot": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg"
    },
    {

        "title": "Django Unchained",
        "year": "2012",
        "runtime": "165",
        "genres": [
            "Drama",
            "Western"
        ],
        "director": {
            "name": "Quentin Tarantino",
            "bio": "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.",
            "birth": new Date("1963-03-27"),
        },
        "actors": ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio", "Kerry Washington"],
        "plot": "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
        "imageUrl": "http://ia.media-imdb.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg"
    },
    {

        "title": "Pulp Fiction",
        "year": "1994",
        "runtime": "154",
        "genres": [
            "Crime",
            "Drama"
        ],
        "director": {
            "name": "Quentin Tarantino",
            "bio": "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.",
            "birth": new Date("1963-03-27"),
        },
        "actors": ["Tim Roth", "Amanda Plummer", "Laura Lovelace", "John Travolta"],
        "plot": "The lives of two mob hit men, a boxer, a gangster\"s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg"
    },
    {

        "title": "Lucky Number Slevin",
        "year": "2006",
        "runtime": "110",
        "genres": [
            "Crime",
            "Drama",

        ],
        "director": {
            "name": "Paul McGuigan",
            "bio": "born in Bellshill, Scotland. He is a director and producer, known for Lucky Number Slevin (2006), Sehnsüchtig (2004) and Victor Frankenstein - Genie und Wahnsinn (2015). He is married to Natasha Noramly. They have one child. He was previously married to Elisabeth McGuigan.",
            "birth": new Date("1963-09-19"),
        },

        "actors": ["Josh Hartnett", "Bruce Willis", "Lucy Liu", "Morgan Freeman"],
        "plot": "A case of mistaken identity lands Slevin into the middle of a war being plotted by two of the city\"s most rival crime bosses: The Rabbi and The Boss.Slevin is under constant surveillance by relentless Detective Brikowski as well as the infamous assassin Goodkat and finds himself having to hatch his own ingenious plot to get them before they get him.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMzc1OTEwMTk4OF5BMl5BanBnXkFtZTcwMTEzMDQzMQ@@._V1_SX300.jpg"
    },
    {

        "title": "The Hangover",
        "year": "2009",
        "runtime": "100",
        "genres": [
            "Comedy"
        ],
        "director": {
            "name": "Todd Phillips",
            "bio": "is an American filmmaker and actor who got his start by directing the comedy films Road Trip and Old School, the earlier inspired EuroTrip. He also directed Starsky & Hutch, The Hangover trilogy, Due Date, War Dogs and School for Scoundrels. Phillips directed Joker, a Taxi Driver style film set in the universe of Batman and starring Joaquin Phoenix. Joker is the highest grossing R-rated film of all time.",
            "birth": new Date("1970-12-20"),
        },
        "actors": ["Bradley Cooper", "Ed Helms", "Zach Galifianakis", "Justin Bartha"],
        "plot": "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA1Mg@@._V1_SX300.jpg"
    },
    {

        "title": "The Truman Show",
        "year": "1998",
        "runtime": "103",
        "genres": [
            "Comedy",
            "Drama",
            "Sci-Fi"
        ],
        "director": {
            "name": "Peter Weir",
            "bio": "Peter Weir was born on August 21, 1944 in Sydney, New South Wales, Australia. He is a director and writer, has been married to Wendy Stites since 1966. They have two children.",
            "birth": new Date("1944-08-21"),
        },
        "actors": ["Jim Carrey", "Laura Linney", "Noah Emmerich", "Natascha McElhone"],
        "plot": "An insurance salesman/adjuster discovers his entire life is actually a television show.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"
    },
    {

        "title": "Slumdog Millionaire",
        "year": "2008",
        "runtime": "120",
        "genres": [
            "Drama",
            "Romance"
        ],
        "director": {
            "name": "Danny Boyle",
            "bio": "is a British filmmaker, producer and writer from Radcliffe, Greater Manchester. He is known for directing 28 Days Later, 127 Hours, Trainspotting, T2 Trainspotting, Slumdog Millionaire, Millions, Shallow Grave, The Beach, Yesterday and Steve Jobs. He won many awards for Slumdog Milliomaire. He was in a relationship with Gail Stevens and had three children.",
            "birth": new Date("1956-10-20")
        },
        "actors": ["Dev Patel", "Saurabh Shukla", "Anil Kapoor", "Rajendranath Zutshi"],
        "plot": "A Mumbai teen reflects on his upbringing in the slums when he is accused of cheating on the Indian Version of \"Who Wants to be a Millionaire ?\" ",
        "imageUrl": "http://ia.media-imdb.com/images/M/MV5BMTU2NTA5NzI0N15BMl5BanBnXkFtZTcwMjUxMjYxMg@@._V1_SX300.jpg"
    },
    {

        "title": "Despicable Me 2",
        "year": "2013",
        "runtime": "98",
        "genres": [
            "Animation",
            "Adventure",
            "Comedy"
        ],
        "director": {
            "name": "Pierre Coffin",
            "bio": "is a French animator, film director, and voice actor best known for co-directing all four films in the Despicable Me franchise and as the voice of the Minions, which won him the Kids Family Award at the 10th Seiyu Awards.",
            "birth": new Date("1967-11-01"),
        },
        "actors": ["Steve Carell", "Kristen Wiig", "Benjamin Bratt", "Miranda Cosgrove"],
        "plot": "When Gru, the world\"s most super - bad turned super - dad has been recruited by a team of officials to stop lethal muscle and a host of Gru\"s own, He has to fight back with new gadgetry, cars, and more minion madness.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExNjAyNTcyMF5BMl5BanBnXkFtZTgwODQzMjQ3MDE@._V1_SX300.jpg"
    },
    {

        "title": "Madagascar",
        "year": "2005",
        "runtime": "86",
        "genres": [
            "Animation",
            "Adventure",
            "Comedy"
        ],
        "director": {
            "name": "Eric Darnell",
            "bio": " is an American animator, film director, screenwriter, songwriter and occasional voice actor. He\'s most famous for co-creating the Madagascar series along with partner, Tom McGrath. He also directed Antz with Tim Johnson.",
            "birth": new Date("1961-08-21"),
        },
        "actors": ["Ben Stiller", "Chris Rock", "David Schwimmer", "Jada Pinkett Smith"],
        "plot": "Spoiled by their upbringing with no idea what wild life is really like, four animals from New York Central Zoo escape, unwittingly assisted by four absconding penguins, and find themselves in Madagascar, among a bunch of merry lemurs",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY4NDUwMzQxMF5BMl5BanBnXkFtZTcwMDgwNjgyMQ@@._V1_SX300.jpg"
    },
    {

        "title": "Pirates of the Caribbean: The Curse of the Black Pearl",
        "year": "2003",
        "runtime": "143",
        "genres": [
            "Action",
            "Adventure",
            "Fantasy"
        ],
        "director": {
            "name": "Gore Verbinski",
            "bio": " is an American film director, screenwriter, producer, and musician. He is best known for directing The Ring, the Pirates of the Caribbean films, and Rango. He won the Academy Award, the BAFTA, and was nominated for the Golden Globe Award for Best Animated Feature Film for his work on Rango.",
            "birth": new Date("1964-03-16"),
        },
        "actors": ["Johnny Depp", "Geoffrey Rush", "Orlando Bloom", "Keira Knightley"],
        "plot": "Blacksmith Will Turner teams up with eccentric pirate Captain Jack Sparrow to save his love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAyNDM4MTc2N15BMl5BanBnXkFtZTYwNDk0Mjc3._V1_SX300.jpg"
    },
    {
        "title": "Casino Royale",
        "year": "2006",
        "runtime": "144",
        "genres": [
            "Action",
            "Adventure",
            "Thriller"
        ],
        "director": {
            "name": "Martin Campbell",
            "bio": " is a New Zealand film and television director based in the United Kingdom.",
            "birth": new Date("1943-10-24"),
        },
        "actors": ["Daniel Craig", "Eva Green", "Mads Mikkelsen", "Judi Dench"],
        "plot": "Armed with a licence to kill, Secret Agent James Bond sets out on his first mission as 007 and must defeat a weapons dealer in a high stakes game of poker at Casino Royale, but things are not what they seem.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTM5MjI4NDExNF5BMl5BanBnXkFtZTcwMDM1MjMzMQ@@._V1_SX300.jpg"
    },
    {
        "title": "The Wolf of Wall Street",
        "year": "2013",
        "runtime": "180",
        "genres": [

            "Comedy",
            "Crime"
        ],
        "director": {
            "name": "Martin Scorsese",
            "bio": "(born in Queens, New York, U.S.), American filmmaker known for his harsh, often violent depictions of American culture.",
            "birth": new Date("1942-11-17")
        },
        "actors": ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie", "Matthew McConaughey"],
        "plot": "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
        "imageUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX300.jpg"
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
app.get('/movies/director/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no director found');
    }
});
//READ actors of certain movie
app.get('/movies/:movieTitle/actors', (req, res) => {
    const { movieTitle } = req.params;
    const title = movies.find(movie => movie.title === movieTitle);

    if (title) {
        res.status(200).json(title.actors)
    } else {
        res.status(400).send('title not found')
    }
});
//READ all movies in list of actor
app.get('/movies/actors/:actorName', (req, res) => {
    const { actorName } = req.params;
    const movieName = movies.filter(movie => movie.actors.includes(actorName));

    if (movieName) {
        res.status(200).send(movieName)
            //Code below supposed to return array of movies with same actor
            // movieName.forEach(movie => {
            //     let list = [];
            //     list.push(movie.title);
            // });
            // res.status(200).send(list);
    } else {
        res.status(400).send('no match found')
    }
});

app.listen(8080, () => {
    console.log('Your app ist listening on port 8080');

});