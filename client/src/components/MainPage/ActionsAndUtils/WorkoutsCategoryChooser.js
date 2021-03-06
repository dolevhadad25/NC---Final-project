//============ Imports start ============
import React, { useEffect, useState } from "react";
import { useUsersContext, Actions } from "../../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
//============ Imports end ============

//============ Component start ============
function WorkoutsCategoryChooser() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { userContextState, userContextDispatch } = useUsersContext();
  let categoryLinkHandler = useNavigate();

  useEffect(() => {
    fetch("/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategoriesList(["All", ...data]));
  }, []);

  function categoryButtonHandler(event) {
    switch (event.target.value) {
      case "All":
        setSelectedCategory(event.target.value);
        categoryLinkHandler(`/main-page/`);
        break;
      default:
        setSelectedCategory(event.target.value);
        categoryLinkHandler(`/main-page/${event.target.value}`);
        break;
    }
  }

  return (
    <>
      <div className="WorkoutsCategoryChooser">
        <Container maxWidth="xl">
          <Grid container spacing={2} direction="row" alignItems="center">
            {categoriesList.map((category) => {
              return (
                <Grid item sm={2.4} key={uuid()}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ width: 90 }}
                    value={
                      category.title === undefined ? "All" : category.title
                    }
                    onClick={categoryButtonHandler}
                  >
                    {category.title === undefined ? "All" : category.title}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <div className="category-description-container">
          {categoriesList
            .filter((category) => category.title === selectedCategory)
            .map((category) => {
              return (
                <Card key={uuid()} sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 16 }}
                      color="text.primary"
                      gutterBottom
                      align="left"
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
}
//============ Component end ============

export default WorkoutsCategoryChooser;
