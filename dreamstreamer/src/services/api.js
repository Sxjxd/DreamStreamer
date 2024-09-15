import axios from 'axios';

// API Gateway Base URL
const api = axios.create({
    baseURL: 'https://ua264hs47d.execute-api.ap-southeast-1.amazonaws.com/dev',
});

// Fetch all albums
export const getAlbums = async () => {
    try {
        const response = await api.get('/albums');
        return response.data;
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
    }
};

// Fetch an album by ID
export const getAlbumById = async (albumId) => {
    try {
        const response = await api.get(`/albums/${albumId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching album with id ${albumId}:`, error);
        throw error;
    }
};


// Create a new album
export const createAlbum = async (album) => {
    try {
        const response = await api.post('/albums', album, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating album:', error);
        throw error;
    }
};

// Update an album by ID using query string parameters
export const updateAlbum = async (albumId, updatedAlbum) => {
    try {
        const response = await api.put(`/albums`, updatedAlbum, {
            params: { albumId },  // Pass albumId as query string
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating album with id ${albumId}:`, error);
        throw error;
    }
};

// Delete an album by ID using query string parameters
export const deleteAlbum = async (albumId) => {
    try {
        const response = await api.delete(`/albums`, {
            params: { albumId },  // Pass albumId as query string
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting album with id ${albumId}:`, error);
        throw error;
    }
};

// Fetch all artists
export const getArtists = async () => {
    try {
        const response = await api.get('/artists');
        return response.data;
    } catch (error) {
        console.error('Error fetching artists:', error);
        throw error;
    }
};

// Fetch an artist by ID
export const getArtistById = async (artistId) => {
    try {
        const response = await api.get(`/artists/${artistId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching artist with id ${artistId}:`, error);
        throw error;
    }
};

// Create a new artist
export const createArtist = async (artist) => {
    try {
        const response = await api.post('/artists', artist, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating artist:', error);
        throw error;
    }
};

// Update an artist by ID
export const updateArtist = async (artistId, updatedArtist) => {
    try {
        const response = await api.put(`/artists`, { artistId, ...updatedArtist }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating artist with id ${artistId}:`, error);
        throw error;
    }
};

// Delete an artist by ID using query string parameters
export const deleteArtist = async (artistId) => {
    try {
        const response = await api.delete(`/artists`, {
            params: { artistId },  // Pass artistId as query string
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting artist with id ${artistId}:`, error);
        throw error;
    }
};

// Fetch all genres
export const getGenres = async () => {
    try {
        const response = await api.get('/genres');
        return response.data;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};

// Fetch genre by ID
export const getGenreById = async (genreId) => {
    try {
        const response = await api.get(`/genres/${genreId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching genre with id ${genreId}:`, error);
        throw error;
    }
};

// Create Genre
export const createGenre = async (genre) => {
    try {
        const response = await api.post('/genres', genre, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating genre:', error);
        throw error;
    }
};

// Update Genre
export const updateGenre = async (genreId, updatedGenre) => {
    try {
        const response = await api.put('/genres', updatedGenre, {
            params: { genreId },  // Pass genreId as query string
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating genre with id ${genreId}:`, error);
        throw error;
    }
};

// Delete Genre
export const deleteGenre = async (genreId) => {
    try {
        const response = await api.delete(`/genres`, {
            params: { genreId },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting genre with id ${genreId}:`, error);
        throw error;
    }
};

export const getPresignedUrl = async (fileName, fileType, fileCategory) => {
    try {
        const response = await axios.post(
            'https://ua264hs47d.execute-api.ap-southeast-1.amazonaws.com/dev/tracks/presigned-url',
            {
                fileName,       // Name of the file being uploaded
                fileType,       // MIME type of the file (e.g., 'audio/mp3')
                fileCategory,   // 'song' or 'cover' (pass this correctly)
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error getting presigned URL:', error);
        throw error;
    }
};


// Create a new track
export const createTrack = async (trackData) => {
    try {
        const response = await api.post('/tracks', trackData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating track:', error);
        throw error;
    }
};

// Delete a track by ID
export const deleteTrack = async (trackId) => {
    try {
        const response = await api.delete(`/tracks`, {
            params: { trackId }, // Pass trackId as query string parameter
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting track with id ${trackId}:`, error);
        throw error;
    }
};

// Fetch all tracks
export const getTracks = async () => {
    try {
        const response = await api.get('/tracks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tracks:', error);
        throw error;
    }
};

// Fetch a track by ID
export const getTrackById = async (trackId) => {
    try {
        const response = await api.get(`/tracks/${trackId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching track with id ${trackId}:`, error);
        throw error;
    }
};

// Update a track
export const updateTrack = async (trackId, updatedTrack) => {
    try {
        const response = await api.put(`/tracks`, updatedTrack, {
            params: { trackId },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating track with id ${trackId}:`, error);
        throw error;
    }
};

// Export the axios instance as default
export default api;
