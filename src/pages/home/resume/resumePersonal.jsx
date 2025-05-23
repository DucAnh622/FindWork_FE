import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import "../../../assets/styles/dashBoard.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getListResumePersonalRedux,
  changePage,
} from "../../../redux/slices/resumeSlice";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { CardTemplate1 } from "../../../components/home/cardTemplate/cardTemplate1";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { EmptyData } from "../../../components/shared/emptyData";

export const ResumePersonal = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.resume?.listResume);
  const page = useSelector((state) => state.resume?.page);
  const totalPage = useSelector((state) => state.resume?.totalPage);
  const order = useSelector((state) => state.resume?.order);
  const orderBy = useSelector((state) => state.resume?.orderBy);
  const isLoading = useSelector((state) => state.resume?.isLoading);

  const getList = async () => {
    dispatch(
      await getListResumePersonalRedux({
        page: page + 1,
        limit: 25,
        order: orderBy,
        sort: order,
      })
    );
  };

  useEffect(() => {
    getList();
  }, [page, order, orderBy]);

  return (
    <div className="ResumePersonal">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "2rem", mt: 1, fontWeight: "bold" }}
          >
            My Resume
          </Typography>
        </Grid>
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          sx={{ ml: 1, mr: 1 }}
        >
          {isLoading === false ? (
            <>
              {list && list.length > 0 ? (
                <>
                  <>
                    {list.map((item, index) => {
                      return (
                        <Grid item xs={12} md={3} lg={2} key={index} mt={1}>
                          <CardTemplate1 data={item} />
                        </Grid>
                      );
                    })}
                  </>
                  {totalPage > 1 && (
                    <Grid item xs={12}>
                      <Stack spacing={2} alignItems="center">
                        <Pagination
                          count={totalPage}
                          page={page + 1}
                          onChange={(event, value) =>
                            dispatch(changePage(value - 1))
                          }
                          variant="outlined"
                          shape="rounded"
                        />
                      </Stack>
                    </Grid>
                  )}
                </>
              ) : (
                <Grid item xs={12} textAlign={"center"}>
                  <EmptyData />
                </Grid>
              )}
            </>
          ) : (
            <CircularWithValueLabel />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
