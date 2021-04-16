import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { getPost } from "../../actions/posts";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  console.log(currentId);
  const dispatch = useDispatch();
  //   const classes = useStyles();
  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
