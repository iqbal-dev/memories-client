import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getPostBySearch } from "../../actions/posts";
import Form from "../Form/Form";
import Paginate from "../Pagination";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("search");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      //post method
    }
  };

  const handleAddChip = (addTags) => {
    return setSearchTags([...searchTags, addTags]);
  };
  const handleDeleteChip = (removeTags) => {
    return setSearchTags(searchTags.filter((tag) => tag !== removeTags));
  };
  const searchPost = () => {
    if (search.trim() || searchTags) {
      dispatch(getPostBySearch({ search, tags: searchTags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${searchTags.join(
          ","
        )}`
      );
    } else {
      history.push("/");
    }
  };
  // useEffect(() => {
  //   dispatch(getPost());
  // }, [dispatch]);
  console.log(search);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              className={classes.appBarSearch}
              color="inherit"
            >
              <TextField
                name="search"
                value={search}
                label="Search Memories"
                variant="outlined"
                fullWidth
                onKeyPress={handleKeyPress}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (!e.target.value) {
                    // dispatch(getPost(page));
                    history.push("/");
                  }
                }}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={searchTags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !searchTags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={Number(page)} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
