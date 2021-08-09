import { Pagination, PaginationItem } from "@material-ui/lab";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";
import useStyles from "./styles";
const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.posts);
  const classes = useStyles();
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page, dispatch]);
  console.log(totalPages);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
