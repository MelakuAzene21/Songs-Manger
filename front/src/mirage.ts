import { createServer, Model, Factory, Response } from 'miragejs';
import { Song } from '@types/index';

const genres = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Country', 'R&B'];

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
     environment:environment === 'production' ? 'production' : 'development',

    models: {
      song: Model.extend<Partial<Song>>({}),
    },

    factories: {
      song: Factory.extend({
        title(i: number) {
          const titles = [
            'Bohemian Rhapsody', 'Stairway to Heaven', 'Hotel California', 'Imagine',
            'Sweet Child O\' Mine', 'Billie Jean', 'Like a Rolling Stone', 'Smells Like Teen Spirit',
            'Purple Haze', 'Good Vibrations', 'Respect', 'Hey Jude', 'What\'s Going On',
            'Superstition', 'Born to Run', 'Thunder Road', 'The Sound of Silence',
            'Bridge Over Troubled Water', 'Yesterday', 'Let It Be'
          ];
          return titles[i % titles.length] || `Song ${i + 1}`;
        },
        artist(i: number) {
          const artists = [
            'Queen', 'Led Zeppelin', 'Eagles', 'John Lennon', 'Guns N\' Roses',
            'Michael Jackson', 'Bob Dylan', 'Nirvana', 'Jimi Hendrix', 'The Beach Boys',
            'Aretha Franklin', 'The Beatles', 'Marvin Gaye', 'Stevie Wonder', 'Bruce Springsteen',
            'Simon & Garfunkel', 'Pink Floyd', 'The Rolling Stones'
          ];
          return artists[i % artists.length] || `Artist ${i + 1}`;
        },
        album(i: number) {
          const albums = [
            'A Night at the Opera', 'Led Zeppelin IV', 'Hotel California', 'Imagine',
            'Appetite for Destruction', 'Thriller', 'Highway 61 Revisited', 'Nevermind',
            'Are You Experienced', 'Pet Sounds', 'I Never Loved a Man the Way I Love You',
            'Abbey Road', 'What\'s Going On', 'Songs in the Key of Life', 'Born to Run'
          ];
          return albums[i % albums.length] || `Album ${i + 1}`;
        },
        year() {
          return Math.floor(Math.random() * (2023 - 1960) + 1960);
        },
        duration() {
          return Math.floor(Math.random() * (300 - 120) + 120); // 2-5 minutes in seconds
        },
        genre() {
          return genres[Math.floor(Math.random() * genres.length)];
        },
        createdAt() {
          return new Date().toISOString();
        },
        updatedAt() {
          return new Date().toISOString();
        },
      }),
    },

    seeds(server) {
      server.createList('song', 50);
    },

    routes() {
      this.namespace = 'api';

      // Get paginated songs with filtering and sorting
      this.get('/songs', (schema, request) => {
        const { queryParams } = request;
        const page = parseInt(queryParams.page || '1');
        const limit = parseInt(queryParams.limit || '10');
        const sortBy = queryParams.sortBy || 'title';
        const sortOrder = queryParams.sortOrder || 'asc';
        const search = queryParams.search || '';
        const genre = queryParams.genre || '';

        let songs = schema.all('song').models;

        // Apply search filter
        if (search) {
          songs = songs.filter(song => 
            song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.artist.toLowerCase().includes(search.toLowerCase()) ||
            song.album.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Apply genre filter
        if (genre) {
          songs = songs.filter(song => song.genre === genre);
        }

        // Apply sorting
        songs.sort((a, b) => {
          const aVal = a[sortBy];
          const bVal = b[sortBy];
          
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortOrder === 'asc' 
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          }
          
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        });

        // Apply pagination
        const total = songs.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedSongs = songs.slice(startIndex, endIndex);

        return {
          data: paginatedSongs,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      });

      // Get single song
      this.get('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const song = schema.find('song', id);
        
        if (!song) {
          return new Response(404, {}, { message: 'Song not found' });
        }
        
        return song;
      });

      // Create song
      this.post('/songs', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const song = schema.create('song', {
          ...attrs,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        
        return song;
      });

      // Update song
      this.put('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const song = schema.find('song', id);
        
        if (!song) {
          return new Response(404, {}, { message: 'Song not found' });
        }
        
        song.update({
          ...attrs,
          updatedAt: new Date().toISOString(),
        });
        
        return song;
      });

      // Delete song
      this.delete('/songs/:id', (schema, request) => {
        const id = request.params.id;
        const song = schema.find('song', id);
        
        if (!song) {
          return new Response(404, {}, { message: 'Song not found' });
        }
        
        song.destroy();
        return new Response(204);
      });

      // Get available genres
      this.get('/genres', () => {
        return { genres };
      });
    },
  });
}