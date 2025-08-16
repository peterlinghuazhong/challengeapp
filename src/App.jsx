import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";

const movies = [
  { id: 1, title: "Zorro", genre: "Action" },
  { id: 2, title: "Alien", genre: "Sci-Fi" },
  { id: 3, title: "Matrix", genre: "Sci-Fi" },
  { id: 4, title: "Coco", genre: "Animation" },
  { id: 5, title: "Batman", genre: "Action" },
  { id: 6, title: "spiderman", genre: "Action" },
];

export default function MovieWatchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const Watchlist = (id) => watchlist.some((movie) => movie.id === id);

  const addToWatchlist = (movie) => {
    if (!Watchlist(movie.id)) {
      setWatchlist((watch) => [...watch, { ...movie, watched: false }]);
    }
  };

  const toggleWatched = (id) => {
    setWatchlist((watch) =>
      watch.map((movie) =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight="800" align="center" gutterBottom>
        Movie Watchlist Manager
      </Typography>

      {/* Available Movies */}
      <Typography variant="h5" fontWeight={700} sx={{ mt: 2, mb: 2 }}>
        Available Movies
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => {
          const alreadyAdded = Watchlist(movie.id);
          return (
            <Grid item xs={12} md={6} lg={6} key={movie.id}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.genre}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      disabled={alreadyAdded}
                      onClick={() => addToWatchlist(movie)}
                      sx={{
                        minWidth: 190,
                        ...(alreadyAdded && {
                          bgcolor: "grey.300",
                          color: "text.primary",
                          "&:hover": { bgcolor: "grey.300" },
                        }),
                      }}
                    >
                      alreadyAdded
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Watchlist */}
      <Typography variant="h5" fontWeight={700} sx={{ mt: 5, mb: 2 }}>
        My Watchlist
      </Typography>

      {watchlist.length === 0 ? (
        <Typography color="text.secondary">
          Your watchlist is empty. Add some movies!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {watchlist.map((movie) => (
            <Grid sx={12} md={6} lg={6} key={movie.id}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {movie.genre}
                      </Typography>
                    </Box>

                    <Chip
                      label={movie.watched ? "Watched" : "Unwatched"}
                      color={movie.watched ? "success" : "warning"}
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>

                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    variant={movie.watched ? "outlined" : "contained"}
                    color={movie.watched ? "inherit" : "success"}
                    onClick={() => toggleWatched(movie.id)}
                  >
                    movie watch
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
