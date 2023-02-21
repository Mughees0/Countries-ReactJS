import { useState, useEffect, React } from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Link } from "react-router-dom";
import "./details.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Detail = () => {
  const [data, setData] = useState([]);

  async function fetchData() {
    const saveName = localStorage.getItem("name");
    // method body
    await fetch(`https://restcountries.com/v3.1/name/${saveName}`)
      .then((response) => response.json())
      .then((json) => {
        // body
        setData(json);
      });
    console.log("Completed");
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {data.map(
        ({
          flags,
          name,
          capital,
          region,
          subregion,
          population,
          maps,
          latlng,
        }) => (
          <Card sx={{ maxWidth: 350 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="name">
                  {name.official.charAt(0).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={name.official.toUpperCase()}
              subheader={capital}
            />
            <CardMedia
              component="img"
              height="194"
              image={flags.png}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                The country belongs to {region} region and {subregion}{" "}
                sub-region. Located at the {latlng[0]} ^N and {latlng[1]} ^W,
                this country has population of {population} and it gained the
                independence according to the CIA World Factbook.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="go back">
                <Link to="/">
                  <ArrowBackIosIcon />
                </Link>
              </IconButton>
              <IconButton aria-label="share">
                <a href={maps.googleMaps}>
                  <FmdGoodIcon />
                </a>
              </IconButton>
              <ExpandMore>
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Card>
        )
      )}
    </Grid>
  );
};

export default Detail;
